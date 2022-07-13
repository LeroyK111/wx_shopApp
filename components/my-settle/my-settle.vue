<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label @click="clickCheckAll" class="radio">
			<radio value="" color="#c00000" :checked="checkAll" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{countCheckPrice}}</text>
		</view>
		<!-- 结算 -->
		<view @click="settlement" class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	// 导入状态插件
	import {
		useCartStore
	} from "@/store/cart.js"
	import {
		useUserStore
	} from "@/store/user.js"
	// 实例化一个对象
	const useCart = useCartStore()
	const useUser = useUserStore()
	export default {
		name: "my-settle",
		data() {
			return {
				// 倒计时
				seconds: 3,
				timer: null
			};
		},
		computed: {
			checkedCount() {
				// 商品数量
				return useCart.checkedCount
			},
			checkAll() {
				// 默认全选
				return useCart.checkAll
			},
			countCheckPrice() {
				// 商品总价
				return useCart.countCheckPrice.toFixed(2)
			}
		},
		onLoad() {
			useCart.checkGoodsAll()
		},
		methods: {
			clickCheckAll() {
				// 给中间件出入参数
				useCart.updateGoodsAllState(!this.checkAll)
			},
			// 用户点击结算
			settlement() {
				if (!useCart.checkedCount) return uni.$showMsg("请选择商品")
				if (JSON.stringify(useUser.address) === '{}') return uni.$showMsg("请选择收货地址")
				if (!useUser.token) return this.delayNavigate()

				// 调用支付接口
				this.payOrder()
			},
			payOrder() {
				// 创建订单,也是模拟了
				const orderInfo = {
					order_price: useCart.countCheckPrice,
					consignee_addr: useUser.address,
					goods: useCart.carts.filter(x=> x.goods_state).map(x=>({
						goods_id: x.goods_id,
						goods_count: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				// 发给服务器请求，创建订单
				// const {data: res} = await uni.$http.post("url", orderInfo)
				
				// if (res.meta.status !== 200) return uni.$showMsg("创建订单出错")
				
				
				// 模拟服务响应
				const orderNumber = "aklsdjkleriukldjfl"
				
				

				// 订单预支付
				// const {data: res2} = uni.$http.post("url", {orderNumber})
				
				// if (res2.meta.status !== 200) return uni.$showMsg("创建预支付订单出错")
				
				const payInfo = "eioruowejksdafasdkiewruoiwo"
				
				// 发起微信支付(需要查看两份文档)
				// https://pay.weixin.qq.com/static/applyment_guide/applyment_detail_miniapp.shtml
				// https://uniapp.dcloud.net.cn/tutorial/app-payment-weixin.html
				// const succ = await uni.requestPayment(payInfo)
				
				
				
				// 模拟订单支付完成
				uni.showToast({
					title:"模拟支付ok",
					icon:"success",
					duration: 2000
				})
				
			},

			delayNavigate() {
				// 重置时间
				this.seconds = 3
				// 延时导航到my页面
				this.showTips(this.seconds)

				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: "/pages/my/my",
							success() {
								useUser.updateRedirectInfo({
									openType: "switchTab",
									from: "/pages/cart/cart"
								})
							}
						})

						return
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			// 展示倒计时跳转登录
			showTips(n) {
				uni.showToast({
					icon: "none",
					title: `请登陆后再进行结算，${n}秒后跳转登录页面`,
					mask: true,
					duration: 1500
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		border-top: 1px solid #ccc;
		background-color: #fff;
		z-index: 999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
				font-weight: bold;
			}
		}

		.btn-settle {
			min-width: 100px;
			text-align: center;
			height: 50px;
			color: #fff;
			line-height: 50px;
			padding: 0 10px;
			background-color: #c00000;
		}

	}
</style>
