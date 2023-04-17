import App from './App'
import {
	$http
} from "@escook/request-miniprogram"


import * as Pinia from 'pinia';

// 使用状态中间件
import {
	useUserStore
} from "@/store/user.js"


// 挂载uni对象上
uni.$http = $http
// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中"
	})

	const useUser = useUserStore()

	if (options.url.indexOf("/my/") !== -1) {
		// 再请求头上添加token字段
		options.header = {
			Authorization: useUser.token
		}
	}
}


// 响应拦截器
$http.afterRequest = function(options) {
	uni.hideLoading()
}


// 请求根路径
$http.baseUrl = "https://www.uinav.com"



// 封装弹窗的方法
uni.$showMsg = function(title = "数据请求失败") {
	uni.showToast({
		title: title,
		icon: 'error'
	})
}

// #//ifndef 这种语法是，uni-app专用判断语法，决定导入哪个包
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()


// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// 挂载插件
	app.use(Pinia.createPinia())
	return {
		app,
		Pinia,
	}
}


// #endif
