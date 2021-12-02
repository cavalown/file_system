<template>
  <div class="search">
    <form action="" class="search-file">
      <input
        v-model.trim="fileKeyword"
        type="text"
        class="keyword"
        placeholder="請輸入檔案關鍵字"
      />
      <button @click="searchFile" class="btn-search-file">搜尋</button>
    </form>
    <form class="upload-file">
      <div class="upload-group">
        <label for="file-upload" class="file-for-upload"
          >上傳檔案
          <input type="file" class="file-for-upload" id="file-upload" />
        </label>
      </div>
      <button @click="uploadFile" class="btn-upload-file">上傳</button>
    </form>
  </div>
  <hr />
  <div class="information">
    <div class="forUpload">
      {{ uploadInformation }}
    </div>
    <div class="forSearch" :disabled="isSearch">
      {{ fileResult }}
      <thead :disabled="isSearch">
        <tr>
          <th scope="col" class="col1">#</th>
          <th scope="col" class="col2">檔名</th>
          <th scope="col" class="col3">上傳時間</th>
          <th scope="col" class="col4">下載</th>
          <th scope="col" class="col5">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in fileResult" :key="key">
          <td>{{ key + 1 }}</td>
          <td>{{ item.split('||').slice(1,2).join() }}</td>
          <td>{{ item.split('||').slice(3).join() }}</td>
          <td>
            <button
              @click="downloadFile(item.split('||').slice(1,2).join())"
              type="button"
              class="btn-download-file"
            >
              下載
            </button>
          </td>
          <td>
            <button
              @click="deleteFile(item.split('||').slice(1,2).join())"
              type="button"
              class="btn-delete-file"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import config from '../router/config.js'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default {
  name: 'Search',
  data () {
    return {
      fileKeyword: '',
      fileResult: [],
      fileName: [],
      isSearch: 0,
      fileInformation: ''
    }
  },
  methods: {
    async searchFile () {
      try {
        this.isSearch = 1
        const searchRes = await axios.get(
          'http://localhost:3000/api/files/Search/fileKeyword=' +
            this.fileKeyword
        )
        this.fileResult = searchRes.data
        console.log(searchRes)
      } catch (err) {
        console.log(err)
      }
    },
    async uploadFile () {
      try {
        this.isUpload = 1
        // this.uploadInformation = 'Try to upload...'
        const formData = new FormData()
        const uploadfile = document.querySelector('#file-for-upload')
        formData.append('file', uploadfile.files[0])
        axios.post('http://localhost:3000/api/files/Upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('Upload success')
      } catch (err) {
        console.log(err)
      }
    },
    async downloadFile (fileName) {
      try {
        const downloadRes = await axios.get('http://localhost:3000/api/files/Download/fileName=' + fileName, { responseType: 'blob' })
        console.log(downloadRes)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteFile (fileName) {
      try {
        this.fileResult.forEach(item => {
          if (item.includes(fileName)) {
            const fileIndex = this.fileResult.indexOf(item)
            axios.delete('http://localhost:3000/api/files/Delete/fileName=' + fileName)
            this.fileResult.splice(fileIndex, 1)
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.search {
  text-align: center;
  height: 120px;
}
.search-file {
  width: 350px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding-bottom: 10px;
}
.keyword {
  line-height: 20px;
  font-size: 20px;
  font-family: LiHei Pro Medium;
}

button {
  font-size: 16px;
  width: 80px;
  border-radius: 10px;
  font-family: LiHei Pro Medium;
  border: 1px gray solid;
}

.upload-group {
  width: 500px;
  padding-bottom: 5px;
  text-align: left;
  padding-left: 210px;
}
.file-for-upload {
  font-size: 18px;
  color: rgb(7, 54, 7);
  font-family: LiHei Pro Medium;
}
.upload-file {
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-upload-file {
  width: 300px;
  text-align: center;
  border-radius: 10px;
  border: 1px gray solid;
  font-family: LiHei Pro Medium;
}

button:hover {
  border: 2px rgba(29, 88, 55, 0.664) solid;
}

.information {
  min-height: 400px;
}

table {
  table-layout: fixed;
  width: 100%;
}
th,
td {
  font-family: LiHei Pro Medium;
  border: 2px solid white;
  border-collapse: collapse;
  background-color: rgb(236, 232, 232);
}

.col1 {
  width: 50px;
}
.col2 {
  width: 400px;
}
.col3 {
  width: 250px;
}
.col4, .col5 {
  width: 150px;
}
</style>
