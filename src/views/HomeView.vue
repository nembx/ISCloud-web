<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const img_data = [
  {
    img: 'https://img0.tking.cn/mtl/default/img/ByQpSKmHNS_.png'
  },
  {
    img: 'https://img0.tking.cn/mtl/default/img/RZ75yB7BPc_.jpg'
  },
  {
    img: 'https://img0.tking.cn/mtl/default/img/iNA8ENQj2M_.png'
  },
  {
    img: 'https://img0.tking.cn/mtl/default/img/MG4Kwf3CAn_.png'
  }
]

</script>

<template>
  <component :is="Navbar" />
  <div class="box">
    <component :is="Sidebar" />
    <div class="block text-center">
      <el-carousel :interval="3000" type="card" height="350px">
        <el-carousel-item v-for="item in img_data" :key="item">
          <img :src="item.img">
        </el-carousel-item>
      </el-carousel>
    </div>
    
  </div>

</template>

<style scoped>
.block.text-center {
  width: 1400px;
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
}

img {
  width: 100%;
  height: 100%;
}

/* .demonstration {
  color: var(--el-text-color-secondary);
} */

/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
} */

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
