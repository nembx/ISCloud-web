<script setup>
import axios from 'axios';
import { onMounted , reactive} from 'vue'

const text = reactive({
    source: '',
    hitokoto: ''
})

onMounted(() => {
    axios.post('https://tenapi.cn/v2/yiyan?format=json')
        .then(res => {
            text.source = res.data.data.source
            text.hitokoto = res.data.data.hitokoto
        })
})

</script>


<template>
    <div>
        {{ text.source }}：{{ text.hitokoto }}
    </div>
</template>



<style scoped>

</style>