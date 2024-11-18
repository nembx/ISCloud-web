<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/footer.vue'
import Sidebar from './components/Sidebar.vue'
import { particles } from '@/components/particles.js'

</script>

<template>
  <!-- <Particles id="tsparticles" class="login__particles" :options="particles" /> -->
  <!-- <component :is="Navbar" />
  <div class="box">
    <component id="sidebar" :is="Sidebar" /> -->
    <RouterView />
  <!-- </div> -->
  <!-- <component id="footer" :is="Footer" /> -->
</template>

<style>

#tsparticles {
  width: 100%;
  height: 100%;
  position: fixed;
}

div.box{
  display: flex;
  position: relative;
}

* {
  margin: 0;
  padding: 0;
}


/* #footer {
  position: absolute;
  bottom: 0;
  right: 0;
} */
</style>
