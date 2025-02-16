// speed controller
import { Router } from 'express'
import { getSpeed, setSpeed } from './Services/speed.service.js';

const speedController = Router();

speedController.post('/set-speed' , setSpeed)
speedController.get('/get-speed' , getSpeed)


export default speedController;