<template>
  <div class="home">
    <Header/>
    <Search/>
    <hr>
    <Information/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Information from '@/components/Information.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Information,
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
