// auth controller
import { Router } from 'express'
import * as authServices from '../Auth/services/authentication.service.js'
const authController = Router();

authController.post('/signup' , authServices.signUpService)
authController.post('/signin' , authServices.signInServices)
authController.get('/verify/:token' , authServices.VerifyEmailService)

export default authController;