import axios from 'axios';
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = Router();

routes.post('/images', multer(multerConfig).single('images'), (request, response) => {
  
  console.log(request.file)
  return response.json({ message: 'Server running in port 3333' })
});

export default routes;