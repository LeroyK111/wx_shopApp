// 导入状态插件
import {
	useCartStore
} from "@/store/cart.js"
// 实例化一个对象
const useCart = useCartStore()


// 创建混合对象
export default {
	// 使用uni生命周期
	onShow() {
		// 调用方法
		this.setBadge()
	},
	computed: {
		total() {
			return useCart.total
		}
	},
	watch:{
		// 必须监听total数量的变化
		total(){
			this.setBadge()
		}
	},
	methods: {
		setBadge() {
			// 直接调用api，为uni组件设置徽标
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ""
			})
		}
	}
}
