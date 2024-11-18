<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { usernameStore } from '@/stores/username'
import { ref, provide, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const { username } = usernameStore()

let city_order = []

let cityOrders = {
    '上海': 0,
    '广州': 0,
    '深圳': 0,
    '香港': 0,
    '其他': 0
}

onMounted(() => {
    request.get(`/order/findOrderByPurchaser/${username}`)
        .then(res => {
            tableData.value = res.data.result
        })
    request.get('/order/findAllCount')
        .then(res => {
            city_order = res.data.result
            city_order.forEach(item => {
                if (cityOrders.hasOwnProperty(item.city_name)) {
                    cityOrders[item.city_name] = item.order_count
                } else {
                    cityOrders['其他'] += item.order_count
                }
            })
            option.value.series[0].data = [
                { value: cityOrders['上海'], name: '上海' },
                { value: cityOrders['广州'], name: '广州' },
                { value: cityOrders['深圳'], name: '深圳' },
                { value: cityOrders['香港'], name: '香港' },
                { value: cityOrders['其他'], name: '其他' },
            ]
        })
})

use([
    CanvasRenderer,
    PieChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent
])

provide(THEME_KEY, 'light')

const option = ref({
    title: {
        text: '购买过的演出所在地(所有用户)',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
        {
            name: '所在地',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ]
})
const tableData = ref([])

const delete_order = (row, rowIndex) => {
    request.post('/order/deleteOrder', {
        orderDate: row.order_date,
        orderName: row.order_name
    })
        .then(res => {
            if (res) {
                ElMessage({
                    type: 'success',
                    message: '删除成功'
                })
                tableData.value.splice(rowIndex, 1)
            }

        })
}

const dialogVisible = ref(false)


const payInfo = ref({})
const startpay = (item) => {
    dialogVisible.value = true
    payInfo.value = item
}
const pay = async (item) => {
    await request.post(`/order/pay?orderName=${item.orderName}&orderNumber=${item.orderNumber}&orderPrice=${item.orderPrice}`)
        .then(res => {
            const divForm = document.getElementsByTagName('div')
            if (divForm.length) {
                document.body.removeChild(divForm[0])
            }
            const div = document.createElement('div')
            div.innerHTML = res.data
            document.body.appendChild(div)
            document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
            document.forms[0].submit()
        })
}

</script>
<template>
    <component :is="Navbar" />
    <div class="box">
        <component :is="Sidebar" />
        <div class="data_box">
            <div class="echart">
                <v-chart class="chart" :option="option" autoresize />
            </div>
            <hr>
            <span>个人订单列表：</span>
            <el-table :data="tableData" border style="width: 100%" height="438" size="large">
                <el-table-column type="selection" width="55" />
                <el-table-column fixed prop="orderDate" label="Date" width="150" />
                <el-table-column prop="orderName" label="Name" width="250" />
                <el-table-column prop="orderCity" label="City" width="120" />
                <el-table-column prop="orderAddress" label="Address" width="450" />
                <el-table-column prop="orderPrice" label="Price" width="120">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row.orderPrice }}元</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNumber" label="Number" width="200">
                    <template #default="scope">
                        <h3 style="font-size: bold">{{ scope.row.orderNumber }}</h3>
                    </template>
                </el-table-column>
                <el-table-column prop="orderPurchaser" label="Purchaser" width="130" />
                <el-table-column prop="orderState" label="State" width="140">
                    <template #default="scope">
                        <el-tag v-if="scope.row.orderState === '未支付'" type="danger">{{
                    scope.row.orderState }}</el-tag>
                        <el-tag v-else type="success">{{ scope.row.orderState }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default="scope">
                        <el-button link type="success" @click="startpay(scope.row)">支付</el-button>
                        <el-button link type="primary" @click="delete_order(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog v-model="dialogVisible" title="订单支付" width="500">
                <span>您要支付的金额为：</span>
                {{ payInfo.orderPrice }}元
                <template #footer>
                    <el-button type="primary" @click="pay(payInfo)">准备剁手!</el-button>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
.box {
    display: flex;
    position: relative;
}

.echart {
    display: flex;
    position: relative;
}

.chart {
    width: 450px;
    height: 410px;
    position: relative;
    left: 600px;
}

hr {
    opacity: 0.4;
    margin-bottom: 20px;
}

span {
    margin-left: 8px;
    font-size: 20px;
    font-weight: bold;
}

.el-table {
    margin-top: 10px;
}
</style>