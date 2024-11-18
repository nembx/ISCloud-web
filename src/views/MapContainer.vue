<script setup>
import { onMounted, onUnmounted, ref } from "vue"
import AMapLoader from "@amap/amap-jsapi-loader"
import request from '@/utils/request'
import Navbar from "@/components/Navbar.vue"
import Sidebar from "@/components/Sidebar.vue"

let map = null

let markersData = []

onMounted(async () => {
    request.get('/item/getAllItem')
        .then(res => {
            markersData = res.data.result
        })
    await AMapLoader.load({
        key: "87e5def1e5ab1dbade26d899fcd05234", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 5, // 初始化地图级别
                center: [113.778584, 34.759197] // 初始化地图中心点位置
            })
            markersData.forEach((markerData) => {
                // 创建Marker
                let marker = new AMap.Marker({
                    position: [markerData.itemLongitude, markerData.itemLatitude],
                    title: markerData.itemName
                })
                // 创建InfoWindow
                let infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -30) // 可选，偏移量
                })
                marker.on('click', function (e) {
                    infoWindow.setContent('<div>' + markerData.itemName + '</div>')// 动态设置内容
                    infoWindow.open(map, e.target.getPosition())// 打开信息窗体，传入地图实例和Marker的位置
                }).setMap(map)
            })
        })
        .catch((e) => {
            console.log(e)
        })
})

onUnmounted(() => {
    map?.destroy()
})


</script>
<template>
    <component :is="Navbar" />
    <div class="box">
        <component :is="Sidebar" />
        <div id="container"></div>
    </div>
</template>

<style scoped>
.box{
    display: flex;
}

#container {
    width: 100%;
    /* height: 880px; */
    position: relative;
}
</style>