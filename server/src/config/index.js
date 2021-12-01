'use strict'
import dotenv from 'dotenv'
import path from 'path'
// import _ from 'lodash'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({path: path.resolve(__dirname, '.env')})
// dotenv.config({path: '../../.env'})


const config = {
    koaApi: {
        app: {
            name: process.env.KOA_APP_NAME,
            host: process.env.KOA_APP_HOST,
            port: process.env.KOA_APP_PORT
        },
        log:{
            directory: process.env.LOG_DIRECTORY,
            fileName: process.env.KOA_APP_NAME+process.env.LOG_FILENAME,
            level: process.env.LOG_LEVEL
        },
        storage: {
            filespace: '../public',
            recordpath: '../config/files_record.txt'
        }
    }
}

export default config;