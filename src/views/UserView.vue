<script setup>
import request from '@/utils/request'
import { onMounted, reactive, getCurrentInstance } from 'vue'
import { usernameStore } from '@/stores/username'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const { proxy } = getCurrentInstance()

const userInfo = reactive({
    username: '',
    email: '',
    image: ''
})

onMounted(() => {
    request.get('/user/getInfo')
        .then(res => {
            userInfo.username = res.data.result.username
            userInfo.email = res.data.result.email
            userInfo.image = res.data.result.image
        })
        
})

const exit = () => {
    localStorage.removeItem('user')
    proxy.$message({
        type: 'success',
        message: '成功退出'
    })
    proxy.$router.push('/')
}
</script>
<template>
    <component :is="Navbar"/>
    <div class="box">
        <component :is="Sidebar"/>
        <div class="userInfo">
            <img src="https://s11.ax1x.com/2024/02/02/pFQsec8.jpg" alt="暂无头像">
            <div class="information">
                <h1>个人资料：</h1>
                <h2>用户名: {{ userInfo.username }}</h2>
                <h2>邮箱：{{ userInfo.email }}</h2>
                <h2>简介： 这人是个懒比，什么也没写</h2>
            </div>
            <div class="button_group">
                <el-upload
                action="http://localhost:8080/user/update/image"
                :on-success="y"
                :before-upload="y">
                    <el-button class="up_bt" type="success">修改头像</el-button>
                </el-upload>
                <el-button class="ex_bt" @click="exit" type="danger">退出登录</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    position: absolute;
    left: 0;
    margin-left: -60px;
    margin-top: -50px;
    font-size: 25px;
}

h2 {
    margin: 20px;
    font-size: 20px;
}

div.button_group{
    display: flex;
    padding-left: 70px;
    position: relative;
    bottom: 50px;
    left: 180px;
}

.el-button.ex_bt{
    position: relative;
    left: 120px;
}

div.information {
    position: relative;
    border-style: dashed;
    border-radius: 20px;
    width: 500px;
    height: 200px;
    margin: 90px auto;
    background-color: rgb(219, 240, 239, 0.6);
}

img {
    width: 170px;
    position: relative;
    left: 315px;
    border-radius: 100px;
    margin-top: 30px;
}

div.userInfo {
    margin: 0 auto;
    width: 800px;
    height: 630px;
    background-color: rgb(202, 203, 227);
    margin-top: 40px;
    border-radius: 50px;
    opacity: 0.9;
}

div.box {
    position: relative;
    display: flex;
    background: -webkit-linear-gradient(90deg, #7588f0,#c45f9a,#e17a60);
    background: linear-gradient(90deg, #7588f0,#c45f9a,#e17a60);
}
</style>