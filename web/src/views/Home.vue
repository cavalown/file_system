<template>
  <div class="home">
    <Header/>
    <Search/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Search
  }
}
</script>
<style>
  .home{
    width: 1024px;
    margin: 0 auto;
    /* border: 2px solid black; */
  }
</style>
