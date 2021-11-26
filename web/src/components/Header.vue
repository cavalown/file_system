<template>
  <div class="header">
    <img src="@/assets/logo.png" alt="logo" class="logo" />
    <h1>Fresh Files</h1>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
<style>
  .header{
    background-color: rgb(111, 189, 192);
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .header img{
    width: 100px;
    margin: 10px;
  }
  h1{
    line-height: 50px;
    font-size: 50px;
    margin-left: 280px;
  }
</style>
