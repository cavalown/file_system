'use strict'
import dotenv from 'dotenv'
import _ from 'lodash'

dotenv.config()


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
            filespace: '/public',
            recordpath: '/src/config/files_record.txt'
        }
    }
}

export default config;