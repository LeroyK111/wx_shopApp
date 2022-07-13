// cart购物车专用
import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		// state定义数据对象
		return {
			address: JSON.parse(uni.getStorageSync("address") || "{}")
		};
	},
	getters: {
		// 对收获地址进行拼接
		addstr(){
			if (!this.address.provinceName) return ""
			return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
		},
	},
	actions: {
		// 添加更新地址
		updateAddress(address){
			this.address = address
			this.saveAddressToStore()
		},
		// 定义本地存储
		saveAddressToStore(){
			uni.setStorageSync("address", JSON.stringify(this.address))
		}
	}
});
