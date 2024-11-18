<script setup>
import { onMounted, reactive, ref } from 'vue'
import request from '@/utils/request'
import { usernameStore } from '@/stores/username'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const { username } = usernameStore()

const date = ref('')

const ticketData = ref([])

const purchaseVisible = ref(false)

onMounted(() => {
    getList(1)
})

const dialog_item = ref([])

const pageNum = ref()

const pageTotal = ref()

const pageCurrent = ref()

const getList = (Current) => {
    request.get(`/item/findPage/${Current}`)
        .then(res => {
            ticketData.value = res.data.result
            pageNum.value = res.data.pageNum
            pageTotal.value = res.data.pageTotal
            pageCurrent.value = res.data.pageCurrent
        })
}

const changePage = (pageCurrent) => {
    getList(pageCurrent)
}

const open = (item) => {
    dialog_item.value = item
    purchaseVisible.value = true
}

const addShopCard = () => {
    request.post(`/item/addShopCard/${username}`, {
        itemId: dialog_item.value.itemId,
        itemName: dialog_item.value.itemName,
        itemPrice: dialog_item.value.itemPrice,
        itemImage: dialog_item.value.itemImage,
        itemCity: dialog_item.value.itemCity,
        itemAddress: dialog_item.value.itemAddress,
        itemNumber: 1
    }).then(res => {
        if (!res.data || res.data.code == 409) {
            ElMessage({
                type: 'error',
                message: '添加失败'
            })
        } else {
            ElMessage({
                type: 'success',
                message: '添加成功'
            })
        }
    })
}

const purchase = async (item) => {
    purchaseVisible.value = false
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const yy = String(now.getFullYear()).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    date.value = `${yy}-${MM}-${dd} ${hours}:${minutes}:${seconds}`

    await request.post('/order/addOrder', {
        orderDate: date.value,
        orderCity: item.itemCity,
        orderName: item.itemName,
        orderAddress: item.itemAddress,
        orderState: '未支付',
        orderPurchaser: username,
        orderNumber: '',
        orderPrice: item.itemPrice
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
            <el-card v-for="item in ticketData" :key="item">
                <img :src="item.itemImage">
                <div class="content">
                    <div class="card_header">
                        <el-tooltip effect="light" :content="item.itemName" placement="bottom-start">
                            <span class="card_span" style="font-weight: bold;">{{ item.itemName }}</span>
                        </el-tooltip>
                    </div>
                    <hr>
                    <span class="price" style="color: red;font-size: large;">价格￥：{{ item.itemPrice }}元起</span>
                </div>
                <el-button class="card_bt" @click="open(item)" type="primary">购买</el-button>
            </el-card>
            <el-pagination background layout="prev, pager, next" :total="pageTotal" :current-page="pageCurrent"
                :page-count="pageNum" @current-change="changePage" />
        </div>

    </div>
    <el-dialog width="500" title="购买窗口" v-model="purchaseVisible">
        <span>哥们，确定购买吗？</span>
        <template #footer>
            <div class="bt-footer">
                <el-button @click="purchaseVisible = false">取消</el-button>
                <el-button type="primary" @click="purchase(dialog_item)">确定</el-button>
                <el-button @click="addShopCard">加入购物车</el-button>
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
    /* width: 1750px;
    height: 896px; */
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

.el-button.card_bt {
    position: absolute;
    right: 7px;
    bottom: 4px;
}

.card_header {
    padding: 0px 5px 0px 5px;
}

.el-pagination {
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>