<template>
	<view>
		<view class="goods-list">
			<!-- 绑定商品点击 -->
			<view @click="gotoDetail(goods)" v-for="(goods, i) in goodsList" :key="i">
				<!-- 已封装成为组件 -->
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品信息
				goodsList: [],
				// 商品总数
				total: 0,
				queryObj: {
					// 查询关键词
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 15
				},
				// 定义节流阀
				isLoading: false
			}
		},
		// 监听加载事件
		onLoad(options) {
			// 收受路径传参
			this.queryObj.cid = options.cid || ""
			this.queryObj.query = options.query || ""
			this.getGoodsList()
		},
		// 监听上拉事件
		onReachBottom() {
			if (this.isLoading) return null
			// uni的上拉触底函数
			this.queryObj.pagenum += 1
			// 重新获取商品列表
			this.getGoodsList()
		},

		// 监听下拉刷新事件
		onPullDownRefresh() {
			this.queryObj = {
				...this.queryObj,
				pagenum: 1,
				pagesize: 15
			}
			this.goodsList = []
			// 重置完毕后，重新请求页面，关闭下拉动画
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods: {
			async getGoodsList(cb) {
				// 判断数据是否加载完毕
				// if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("数据加载完毕")

				// 开启节流阀
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				cb && cb()
				// 赋值
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				// 关闭节流阀
				this.isLoading = false
			},
			gotoDetail(goods) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods.goods_id
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
