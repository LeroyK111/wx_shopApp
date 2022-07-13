// cart购物车专用
import {
	defineStore
} from 'pinia';

export const useCartStore = defineStore('cart', {
	state: () => {
		// state定义数据对象
		return {
			// 存放加入购物车的商品数据
			carts: JSON.parse(uni.getStorageSync('carts') || '[]'),
			// 定义全选项目
			checkAll: true
		};
	},
	getters: {
		// 定义计算属性
		total(state) {
			let c = 0
			state.carts.forEach(x => c += x.goods_count)
			if (c == 0) {
				c = ""
			}
			return c
		},
		checkedCount(state) {
			// 返回已勾选的值的商品数量
			return state.carts.filter(x => x.goods_state).reduce((total, item) => {
				return total += item.goods_count
			}, 0)
		},
		// 计算选中商品数量和对应价格的全部和
		countCheckPrice(state) {
			return state.carts.filter(x => x.goods_state).reduce((total, item) => {
				return total += item.goods_count * +item.goods_price
			}, 0)
		}
	},
	actions: {
		// 定义方法
		addToCart(goods) {
			// 判断商品有无重复
			const findResult = this.carts.find(x => x.goods_id === goods.goods_id)
			if (!findResult) {
				this.carts.push(goods)
			} else {
				// 存在商品，则加一
				findResult.goods_count++
			}
			// 存储数据
			this.savaToStorage(this.carts)
		},
		// 持久化存储的方法
		savaToStorage(carts) {
			uni.setStorageSync("carts", JSON.stringify(carts))
		},
		// 一个更新商品状态的方法
		updateGoodsState(e) {
			const findResult = this.carts.find(x => x.goods_id === e.goods_id)
			if (findResult) {
				findResult.goods_state = e.goods_state

				// 调用持久化存储
				this.savaToStorage(this.carts)

				// 判断勾选动作，购物车是不是已经全部勾选，
				this.checkGoodsAll()
			}
		},
		checkGoodsAll() {
			const findResult = this.carts.find(x => !x.goods_state)
			if (findResult) {
				this.checkAll = false
			} else {
				this.checkAll = true
			}
		},
		// 更新全部商品状态的方法
		updateGoodsAllState(newCheckAll) {
			this.checkAll = newCheckAll
			// 循环改变内部数值
			this.carts.forEach(x => x.goods_state = newCheckAll)
			// 调用持久化存储
			this.savaToStorage(this.carts)
		},
		// 更新商品数量
		updateGoodsCount(e) {
			const findResult = this.carts.find(x => x.goods_id === e.goods_id)
			if (findResult) {
				findResult.goods_count = e.goods_count

				// 调用持久化存储
				this.savaToStorage(this.carts)
			}
		},
		// 删除某个商品
		removeGoodsBid(goods_id) {
			// 直接过滤
			this.carts = this.carts.filter(x => x.goods_id !== goods_id)

			// 调用持久化存储
			this.savaToStorage(this.carts)

		}
	},
});
