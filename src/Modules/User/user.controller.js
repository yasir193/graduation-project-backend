// user controller
import { Router } from 'express'

import  * as profileService  from './Services/profile.service.js';

const userController = Router();

userController.get('/profile' , profileService.getProfile)


export default userController;