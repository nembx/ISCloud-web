<script setup>
import axios from 'axios'
import { reactive, getCurrentInstance,ref } from 'vue'
import { particles } from '@/components/particles.js'
const loading = ref(false)
const { proxy } = getCurrentInstance()

const form = reactive({
    username: '',
    password: '',
    email: '',
    phone: ''
})

const register = () => {
    loading.value = true
    axios.post('http://localhost:8080/user/register', {
        username: form.username,
        password: form.password,
        email: form.email,
        phone: form.phone
    })
        .then(res => {
            loading.value = false
            if (!res.data) {
                proxy.$message({
                    type: 'error',
                    message: '错误'
                })
            } else {
                proxy.$message({
                    type: 'success',
                    message: '成功'
                })
                proxy.$router.push('/home')
            }
        })
}
</script>
<template>
    <Particles id="tsparticles" class="login__particles" :options="particles" />
    <div class="registerbox" v-loading.fullscreen.lock="loading">
        <h1>REGISTER</h1>
        <div class="box">
            <el-form :model="form">
                <el-form-item>
                    <el-icon :size="20"><User /></el-icon>
                    <el-input type="text" placeholder="请输入用户名" v-model="form.username" style="width: 300px"/>
                </el-form-item>
                <el-form-item>
                    <el-icon :size="20"><Edit /></el-icon>
                    <el-input type="password" placeholder="请输入密码" v-model="form.password" style="width: 300px"/>
                </el-form-item>
                <el-form-item>
                    <el-icon :size="20"><Message /></el-icon>
                    <el-input placeholder="请输入邮箱" v-model="form.email" style="width: 300px"/>
                </el-form-item>
                <el-form-item>
                    <el-icon :size="20"><Iphone /></el-icon>
                    <el-input placeholder="请输入手机号" v-model="form.phone" style="width: 300px"/>
                </el-form-item>
                <el-form-item>
                    <el-button @click="register">REGISTER</el-button>
                </el-form-item>
                <el-link @click="$router.push('/')">已有账号？去登录</el-link>
            </el-form>
        </div>
    </div>
</template>



<style scoped>
div.box {
    display: flex;
    width: 100%;
    justify-content: center;
}

.el-button {
    margin: auto;
    width: 120px;
    height: 40px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

div.registerbox {
    box-shadow: 3px 3px 3px #888888;
    padding: 30px;
    background-color: rgb(240, 248, 255, 0.5);
    margin: 0 auto;
    position: relative;
    width: 500px;
    height: 360px;
    margin-top: 150px;
    border-radius: 20px;
}

.el-link {
    float: right;
    color: blue;
}

.el-icon{
    margin-right: 10px;
}
</style>