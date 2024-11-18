<script setup>
import request from "@/utils/request"
import Navbar from '@/components/Navbar.vue'
import { usernameStore } from '@/stores/username'
import Sidebar from '@/components/Sidebar.vue'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const { username } = usernameStore()

const CardData = ref()

onMounted(() => {
    request.get(`/item/getShopCard/${username}`).then(res => {
        if(res.data.code === 404){
            return '暂无'
        }else {
            CardData.value = res.data.result
        }
    })
})

const deleteCard = (itemName) => {
    request.post(`/item/deleteShopCard/${username}`, {itemName}).then(res => {
        if(res.data.code === 200){
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
        }
    })
}

</script>


<template>
    <component :is="Navbar" />
    <div class="box">
        <component :is="Sidebar" />
        <div class="Card_box">
            <el-card v-for="item in CardData" style="width: 240px">
                <template #header>
                    <img :src="item.itemImage"
                    style="width: 100%" />
                </template>
                <span style="font-weight: bolder;">{{item.itemName}}</span>
                <template #footer>
                    <span style="color:red">￥{{item.itemPrice}}元</span>
                    <el-button type="danger" @click="deleteCard(item.itemName)">删除</el-button>
                </template>
         </el-card>
        </div>
    </div>
</template>

<style scoped>

.box {
    display: flex;
}

.Card_box {
    width: 100%;
    position: relative;
    padding: 10px 0 0 58px;
    overflow-x: auto;
}

.el-button{
    float: right;
}


</style>