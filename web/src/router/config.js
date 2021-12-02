'use strict'

const config = {
  fileSystem: {
    app: {
      name: process.env.VUE_NAME,
      host: process.env.VUE_HOST,
      port: Number.parseInt(process.env.VUE_PORT)
    },
    // backEndS:{},
    // protocol:{},
    api: {
      getAllFile: `${process.env.API_HOST}:${process.env.API_PORT}/api/files`,
      searchFile: `${process.env.API_HOST}:${process.env.API_PORT}/api/files/Search/fileKeyword=`,
      downloadFile: `${process.env.API_HOST}:${process.env.API_PORT}/api/files/Download/fileName=`,
      uploadFile: `${process.env.API_HOST}:${process.env.API_PORT}/api/files/upload`,
      deleteFile: `${process.env.API_HOST}:${process.env.API_PORT}/api/files/Delete/fileName=`

    }
  }
}

console.log(config)

export default config
