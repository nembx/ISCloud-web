<script setup>
import { onMounted, ref ,getCurrentInstance } from 'vue'
import request from '@/utils/request'
import { usernameStore } from '@/stores/username'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const { proxy } = getCurrentInstance()

const { username } = usernameStore()
const date = ref('')

const ticketData = ref([])

const purchaseVisible = ref(false)

onMounted(() => {
    getList(proxy.$route.params.searchContent)
})

const dialog_item = ref([])

const pageNum = ref()

const pageTotal = ref()

const pageCurrent = ref()

const getList = (item_name) => {
    request.get(`/item/searchItem/${item_name}`)
        .then(res => {
            ticketData.value = res.data.result
            console.log(res.data)
            // pageNum.value = res.data.pageNum
            // pageTotal.value = res.data.pageTotal
            // pageCurrent.value = res.data.pageCurrent
        })
}

// const changePage = (pageCurrent) => {
//     getList(pageCurrent)
// }

const open = (item) => {
    dialog_item.value = item
    purchaseVisible.value = true
}


const purchase = (item) => {
    purchaseVisible.value = false
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const yy = String(now.getFullYear()).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    date.value = `${yy}-${MM}-${dd} ${hours}:${minutes}:${seconds}`

    request.post('/order/addOrder', {
        orderDate: date.value,
        orderCity: item.item_city,
        orderName: item.item_name,
        orderAddress: item.item_address,
        orderState: item.item_state,
        orderPurchaser: username,
        orderNumber: '',
        orderPrice: item.item_price
    })
        .then(res => {
            if (!res.data || res.data.code == 400) {
                ElMessage({
                    type: 'error',
                    message: '购买失败'
                })
            } else {
                ElMessage({
                    type: 'success',
                    message: '购买成功'
                })
            }
        })
}

</script>

<template>
    <component :is="Navbar" />
    <div class="box">
        <component :is="Sidebar" />
        <div class="ticket_box">
            <h2>搜索内容为：<span>{{ proxy.$route.params.searchContent }}</span></h2>
            <el-card v-for="item in ticketData" :key="item">
                <img :src="item.item_image">
                <div class="content">
                    <div class="card_header">
                        <el-tooltip effect="light" :content="item.item_name" placement="bottom-start">
                            <span class="card_span" style="font-weight: bold;">{{ item.item_name }}</span>
                        </el-tooltip>
                    </div>
                    <hr>
                    <span class="price" style="color: red;font-size: large;">价格￥：{{ item.item_price }}元起</span>
                </div>
                <el-button class="card_bt" @click="open(item)" type="primary">购买</el-button>
            </el-card>
        </div>
        <!-- <el-pagination background layout="prev, pager, next"
        :total="pageTotal"
        :current-page="pageCurrent"
        :page-count="pageNum"
        @current-change="changePage"/> -->
    </div>
    <el-dialog width="500" title="购买窗口" v-model="purchaseVisible">
        <span>哥们，确定购买吗？</span>
        <template #footer>
            <div class="bt-footer">
                <el-button @click="purchaseVisible = false">取消</el-button>
                <el-button type="primary" @click="purchase(dialog_item)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.box {
    display: flex;
}

.ticket_box {
    width: 100%;
    position: relative;
    padding: 10px 0 0 58px;
    /* display: flex;
    flex-wrap: wrap; */
    overflow-x: auto;
}

.ticket_box::after {
    content: '';
    clear: both;
}

hr {
    opacity: 0.3;
    position: relative;
    top: 7px;
}

.card_span {
    font-size: 15.8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-height: 1.5em;
}

span.price {
    position: absolute;
    bottom: 7px;
    left: 10px
}

.el-card {
    position: relative;
    width: 240px;
    height: 350px;
    margin-right: 40px;
    float: left;
    margin-top: 30px;
    border-radius: 14px;
}

:deep(.el-card__body) {
    padding: 0px;
}

img {
    width: 240px;
    height: 250px;
}

.el-button.card_bt{
    position: absolute;
    right: 7px;
    bottom: 4px;
}

.card_header{
    padding: 0px 5px 0px 5px;
}

h2 {
    text-align: center;
}

h2 span{
    color: #409EFF;
    text-decoration: underline;
}

/* .el-pagination {
    position: absolute;
    bottom: 20px;
    left: 800px;
} */
</style>