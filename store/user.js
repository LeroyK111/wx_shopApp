// cart购物车专用
import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		// state定义数据对象
		return {
			address: JSON.parse(uni.getStorageSync("address") || "{}"),
			// 这里要请求服务器登录才能,我们先模拟登录
			token: JSON.parse(uni.getStorageSync("token") || null),
			// 存储用户用户信息
			userInfo: JSON.parse(uni.getStorageSync("userInfo") || '{}'),
			// 记录来时的页面
			redirectInfo:null
		};
	},
	getters: {
		// 对收获地址进行拼接
		addstr() {
			if (!this.address.provinceName) return ""
			return this.address.provinceName + this.address.cityName + this.address.countyName + this.address
				.detailInfo
		},
	},
	actions: {
		// 添加更新地址
		updateAddress(address) {
			this.address = address
			this.saveAddressToStore()
		},
		// 定义本地存储
		saveAddressToStore(key = "address", value = this.address) {
			uni.setStorageSync(key, JSON.stringify(value))
		},
		// 存储用户的数据
		updateUserInfo(userInfo) {
			this.userInfo = userInfo
			this.saveAddressToStore("userInfo", JSON.stringify(this.userInfo))
		},
		// 持久化token
		updateToken(newToken) {
			this.token = newToken
			this.saveAddressToStore("token", JSON.stringify(this.token))
		},
		// 删除本地存储
		clearStorage(key) {
			uni.removeStorageSync(key)
		},
		// 退出登录，清空信息
		logoutClearAll() {
			let arr = ["userInfo", "token", "address"]
			for (let key of arr) {
				this.clearStorage(key)
			}
			// 跳转到首页
			uni.switchTab({
				url:"/pages/home/home"
			})
		},
		updateRedirectInfo(info){
			// 记录来时的页面
			this.redirectInfo = info
		}
	}
});
