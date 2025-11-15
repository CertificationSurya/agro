import mongoose from 'mongoose';
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from "gridfs-stream"
import multer from 'multer';
import crypto from 'crypto'
import path from 'path';
import { mongoConnection } from '../config/dbConfig.js';

import { config } from 'dotenv';
config();

let gfs;
export const BUCKET_NAME = "ProfilePic";

mongoConnection.once('open', ()=> {
    gfs = Grid(mongoConnection.db, mongoose.mongo);
    gfs.collection(BUCKET_NAME);
})

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject)=> {
            crypto.randomBytes(16, (err, buf)=> { // mongo bucket's chunk st from 256 kb, thus 16 byte i.e. 2^16
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                
                const filename = buf.toString('hex')+ path.extname(file.originalname)
                const fileInfo = {
                    filename,
                    bucketName:  BUCKET_NAME
                };
                resolve(fileInfo);
            })  
        })
    }
})


const fileUpload = multer({ storage })
export default fileUpload;