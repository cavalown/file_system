<template>
  <div class="search">
    <form action="" class="search-file">
      <input type="text" class="keyword" placeholder="請輸入檔案關鍵字" />
      <select name="types" id="file-type">
        <option disabled selected>請選擇檔案類型</option>
        <option>.txt</option>
        <option>.html</option>
        <option>.xml</option>
        <option>.mp3</option>
        <option>.mp4</option>
        <option>.json</option>
        <option>.csv</option>
        <option>.md</option>
        <option value="all-type">All types</option>
      </select>
      <button type="submit" class="btn-search-file">搜尋</button>
    </form>
    <form class="upload-file">
      <div class="upload-group">
        <label for="file-for-upload" class="file-for-upload">上傳檔案</label>
        <input type="file" class="file-for-upload" id="file-for-upload" />
      </div>
      <button type="submit" class="btn-upload-file">上傳</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Search'
}
</script>
<style>
.search {
  text-align: center;
}
.search-file {
  width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  padding-bottom: 10px;
}
.keyword {
  line-height: 20px;
  font-size: 20px;
  font-family: LiHei Pro Medium;
}

select {
  font-size: 16px;
  line-height: 20px;
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
.upload-file{
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn-upload-file{
    width: 300px;
    text-align: center;
    border-radius: 10px;
    border: 1px gray solid;
    font-family: LiHei Pro Medium;
}
</style>
