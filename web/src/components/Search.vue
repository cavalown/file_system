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
        <label for="file-for-upload" class="file-for-upload">上傳檔案</label>
        <input type="file" class="file-for-upload" id="file-for-upload" />
      </div>
      <button @click="uploadFile" class="btn-upload-file">上傳</button>
    </form>
  </div>
  <hr />
  <div class="information">
    <div class="forUpload" :disabled="isUpload"></div>
    <div class="forSearch" :disabled="isSearch">
      <tbody>
        <tr v-for="(item, key) in fileResult" :key="key">
          <td>{{ item.key }}</td>
          <td>{{ item.split('||').slice(1, 2).join() }}</td>
          <td>{{ item.split('||').slice(2, 3).join() }}</td>
          <td>{{ item.split('||').slice(3, 4).join() }}</td>
          <td>
            <button
              @click="downloadFile(item.split('||').slice(0, 1).join())"
              type="button"
              class="btn-download-file"
            >
              下載檔案
            </button>
          </td>
          <td>
            <a @click="downloadFile(item.split('||').slice(0, 1).join()) download></a>
          </td>
        </tr>
      </tbody>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import config from '../router/config.js'

export default {
  name: 'Search',
  data () {
    return {
      fileKeyword: '',
      fileResult: ['aaa.txt||AAA||2021-03-11||txt', 'bbb.md||BBB||2020-11-09||md'],
      fileName: [],
      isSearch: 0,
      isUpload: 0
    }
  },
  methods: {
    async searchFile () {
      try {
        this.isSearch = 1
        this.isUpload = 0
        const res = await axios.get(
          config.fileSystem.api.searchFile + this.fileKeyword
        )
        this.fileResult = res.data
        console.log('Find Result:', this.fileResult)
      } catch (err) {
        console.log(err)
      }
    },
    async uploadFile () {
      try {
        axios.post(config.fileSystem.api.uploadFile)
        console.log('Upload success')
      } catch (err) {
        console.log(err)
      }
    },
    async downloadFile (fileName) {
      try {
        axios.get(config.fileSystem.api.downloadFile + fileName)
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

table, th, td {
  border: 2px solid white;
  border-collapse: collapse;
}
th, td {
  background-color: #96D4D4;
}
</style>
