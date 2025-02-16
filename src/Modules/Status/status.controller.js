// status controller
import { Router } from 'express'
import { getStatus, setStatus } from './Services/status.service.js';
const statusController = Router();

statusController.post('/set-status' , setStatus)
statusController.get('/get-status' , getStatus)

export default statusController;