'use strict'
import config from '../../../config/index.js'
import fse from 'fs-extra'


export default class FileTool {
    async readFileRecords(){
        recordFile = config.koaApi.storage.recordpath;
        data = await fse.readFile(recordFile, 'utf-8');
        return data
    }
}

