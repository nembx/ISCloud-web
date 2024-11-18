<script setup>
import { ElMessage } from 'element-plus';

const clickMe = () => {
    ElMessage({
        type: 'info',
        message: '点我干嘛？'
    })
}
</script>

<template>
    <div>
        <el-menu class="el-menu-vertical-demo" background-color="aliceblue" router :default-active="$route.path">
            <el-menu-item index="/ticketshop">
                <el-icon :size="40">
                    <ShoppingCart />
                </el-icon>
                <span>购票</span>
            </el-menu-item>
            <el-menu-item index='/shopCard'>
                <el-icon :size="40">
                    <ShoppingCartFull />
                </el-icon>
                <span>购物车</span>
            </el-menu-item>
            <el-menu-item index="/map">
                <el-icon :size="40">
                    <LocationFilled />
                </el-icon>
                <span>地图</span>
            </el-menu-item>
            <el-menu-item index="/data">
                <el-icon :size="40">
                    <PieChart />
                </el-icon>
                <span>数据</span>
            </el-menu-item>
            <el-menu-item index="/user">
                <el-icon :size="40">
                    <UserFilled />
                </el-icon>
                <span>用户</span>
            </el-menu-item>
            <el-menu-item index="/about">
                <el-icon :size="40">
                    <Tools />
                </el-icon>
                <span>设置</span>
            </el-menu-item>
            <el-menu-item id="share" @click="clickMe">
                <el-icon :size="40">
                    <Monitor />
                </el-icon>
                <span>@lian</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>



<style scoped>
.el-menu {
    height: 905px;
    width: 147px;
}

#share {
    position: absolute;
    bottom: 0;
    width: 146px;
    height: 56px;
}

span {
    font-size: 16px;
    position: relative;
    left: 20px;
}
</style>