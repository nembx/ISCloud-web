<script setup>
import { ref, getCurrentInstance } from 'vue'
import axios from 'axios'
const { proxy } = getCurrentInstance()

const visible = ref(false)

const searchContent = ref('')

const backhome = () => {
    proxy.$router.push('/home')
}

const open = () => {
    visible.value = true
}

const search = (searchContent) => {
    axios.get(`http://localhost:8080/item/searchItem/${searchContent}`)
        .then(res => {
            if (res.data.code === 404) {
                proxy.$message({
                    type: 'error',
                    message: '搜索内容不存在'
                })
            }else{
                proxy.$message({
                    type: 'success',
                    message: '搜索成功'
                })
                visible.value = false
                proxy.$router.push(`/search/${searchContent}`)
            }
        })
}
</script>

<template>
    <el-menu mode="horizontal" router :default-active="$route.path" text-color="#fff" active-text-color="gray">
        <div class="home">
            <el-icon :size="25" color="#fff">
                <HomeFilled @click="backhome" />
            </el-icon>
        </div>
        <div class="namespace">
            <span style="color: #fff; font-style: oblique;">会起名的</span>
        </div>
        <el-icon class="search" :size="25" color="#fff" @click="open">
            <Search />
        </el-icon>
    </el-menu>
    <el-dialog v-model="visible" width="500" title="输入搜索内容：">
        <el-input v-model="searchContent" style="height: 40px;" />
        <template #footer>
            <el-button type="primary" @click="search(searchContent)">搜索</el-button>
        </template>
    </el-dialog>

</template>

<style scoped>
.search {
    position: absolute;
    right: 14px;
    top: 19px;
    cursor: pointer;
}


.el-menu-item {
    font-size: larger;
}

.el-menu {
    background-color: rgb(8, 133, 241);
}

div.home {
    position: relative;
    top: 19px;
    margin-left: 20px;
}

div.namespace {
    position: relative;
    top: 20px;
    font-size: large;
    margin-left: 15px;
}
</style>