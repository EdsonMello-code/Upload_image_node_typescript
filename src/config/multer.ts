import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    } ,

    filename: (request: Request, file: Express.Multer.File, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {
          callback(err, '');
        }

        const filename = `${hash.toString('hex')}-${file.originalname}`
        callback(null, filename)
      });
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },

  fileFilter: (request: Request, file: Express.Multer.File, callback: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ]

    if(allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'))
    }
  }
}