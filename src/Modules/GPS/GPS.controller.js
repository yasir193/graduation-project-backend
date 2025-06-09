// speed controller
import { Router } from 'express'
import { getGPS , setGPS } from './Services/GPS.service.js';

const gpsController = Router();

gpsController.post('/set-gps' , setGPS)
gpsController.get('/get-gps' , getGPS)


export default gpsController;