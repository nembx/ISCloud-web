<script setup>
import axios from 'axios'
import { reactive, getCurrentInstance,ref } from 'vue'
import { userStore} from '@/stores/user'
import { usernameStore } from '@/stores/username'
import { particles } from '@/components/particles.js'
const { set } = userStore()
const { setName} = usernameStore()
const loading = ref(false)
const { proxy } = getCurrentInstance()

const form = reactive({
    username: '',
    password: ''
})

const login = () => {
    loading.value = true
    axios.post('http://localhost:8080/user/login', {
        username: form.username,
        password: form.password
    })
        .then(res => {
            loading.value = false
            if (!res.data.result.accessToken && !res.data.result.refreshToken) {
                proxy.$message({
                    type: 'error',
                    message: '错误'
                })
            } else {
                proxy.$message({
                    type: 'success',
                    message: '成功'
                })
                set(res)
                setName(form.username)
                proxy.$router.push('/home')
            }
        })
}
</script>
<template>
    <Particles id="tsparticles" class="login__particles" :options="particles" />
    <div class="loginbox" v-loading.fullscreen.lock="loading">
        <h1>LOGIN</h1>
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
                    <el-button @click="login">LOGIN</el-button>
                </el-form-item>
                <el-link @click="$router.push('/register')">还没有账号？去注册</el-link>
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

div.loginbox {
    box-shadow: 3px 3px 3px #888888;
    padding: 30px;
    margin: 0 auto;
    position: relative;
    background-color: rgb(240, 248, 255, 0.5);
    width: 500px;
    height: 320px;
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