import { compareSync, hashSync } from "bcrypt";
import { User } from "../../../DB/models/user.model.js";
import { emitter } from "../../../Services/send-email.service.js";
import  jwt  from 'jsonwebtoken';
export const signUpService = async (req, res) => {
  try {
    const { userName, password, confirmPassword, phone, email } = req.body;
    const isEmailExists = await User.findOne({ email });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "password and confirm password does not match" });
    if (isEmailExists)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = hashSync(password, +process.env.SALT);
    const token = jwt.sign({email} , process.env.JWT_SECRET , {expiresIn:'1h'})
    const confirmEmailLink = `${req.protocol}://${req.headers.host}/auth/verify/${token}`

    

    emitter.emit('sendEmail' , {
      
        to:email,
        subject:'verify your email',
        html:`<h1>Verify your email</h1>
        <a href = '${confirmEmailLink}'>Click here to verify</a>
        `,
        
      
    })
    

    






    const user = await User.create({
      userName: userName,
      password: hashedPassword,
      phone: phone,
      email: email,
    });
    if (!user)
      return res
        .status(500)
        .json({ message: "Creation failed, please try again later" });
    res.status(201).json({ message: "Creation success!", user });
  } catch (error) {
    console.log("catch error from signUpService", error);
    res.status(500).json({ message: "internal server error", error });
  }
};
export const VerifyEmailService = async (req, res) =>{
  try {
    const {token} = req.params;
    const decodedData = jwt.verify(token , process.env.JWT_SECRET)
    const user = await User.findOneAndUpdate({email:decodedData.email} , {isEmailVerified:true},{new:true})
    if(!user) return res.status(404).json({message:'user not found'})
    res.status(200).json({message:'Email verifyed' , user})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'internal server error' , error})
  }
}
export const signInServices = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });
    const isPasswordMatch = compareSync(password, user.password);
    if (!isPasswordMatch)
      return res.status(404).json({ message: "Invalid email or password" });
    const accessToken = jwt.sign({_id:user._id , email: user.email} , process.env.JWT_SECRET_LOGIN , {expiresIn:'1h'})
    const refreshToken = jwt.sign({_id:user._id , email: user.email} , process.env.JWT_SECRET_REFRESH , {expiresIn:'1d'})
    return res.status(200).json({ message: "Login success" , accessToken , refreshToken} );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};



export const RefreshAccessTokenService = (req , res) =>{
  try {
    const {refreshToken} = req.headers;
    const decodedData = jwt.verify(refreshToken , process.env.JWT_SECRET_REFRESH)
    const accessToken = jwt.sign({_id:decodedData._id , email: decodedData.email} , process.env.JWT_SECRET_LOGIN , {expiresIn:40})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
} 