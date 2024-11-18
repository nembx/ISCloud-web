import { default as axios } from "axios"
import { userStore } from '@/stores/user'
import router from "@/router"
import { ElMessage } from "element-plus"

const { accessToken, refreshToken, set } = userStore()

const axiosInatance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

// const requestIntercaptor = 
axiosInatance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = accessToken
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// const responseInterceptor = 
axiosInatance.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        try {
            if (error.response.status === 401 && refreshToken) {
                    const res = await axios.get(
                        'http://localhost:8080/user/refreshToken', {
                        headers: {
                            Authorization: `${refreshToken}`
                        }
                    })
                    set(res)
                    return axios.request(error.config)
                } else {
                    localStorage.removeItem('user')
                    localStorage.removeItem('username')
                    router.push('/')
                }
            } catch (error) {
            ElMessage({
                type: 'error',
                message: '信息已过期'
            })
            localStorage.removeItem('user')
            router.push('/')
        }
        return Promise.reject(error)
    }
)

// axiosInatance.interceptors.request.eject(requestIntercaptor)

// axiosInatance.interceptors.response.eject(responseInterceptor)

export default axiosInatance