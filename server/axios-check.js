import axios from 'axios'

const host = 'http://localhost';
const port = '3000'

export default class FileSystemApiTest {
    // Check Service
    async serverService() {
        try{
            let res = await axios.get(`${host}:${port}/api/`)
            console.log(res.data)
            return res.data
        }catch(err){
            console.log(err)
        }
    }
    // Get all files
    async allFiles(){
        try{
            let res = await axios.get(`${host}:${port}/api/files`)
            console.log(res.data)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    // Search files
    async searchFiles(fileKeyword){
        try{
            let res = await axios.get(`${host}:${port}/api/files/Search/fileKeyword=${fileKeyword}`)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    // Upload file

    // Doenload file

    // Delete file

}


console.log(new FileSystemApiTest().serverService())
console.log(new FileSystemApiTest().allFiles())
// console.log(new FileSystemApiTest().allFiles())
// console.log(new FileSystemApiTest().allFiles())