// speed controller
import { Router } from 'express'
import { getSpeed, setSpeed } from './Services/speed.service.js';

const speedController = Router();

speedController.post('/speed' , setSpeed)
speedController.get('/speed' , getSpeed)


export default speedController;