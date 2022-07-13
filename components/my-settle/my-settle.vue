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
		<view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	// 导入状态插件
	import {
		useCartStore
	} from "@/store/cart.js"
	// 实例化一个对象
	const useCart = useCartStore()

	export default {
		name: "my-settle",
		data() {
			return {

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
		methods: {
			clickCheckAll() {
				// 给中间件出入参数
				useCart.updateGoodsAllState(!this.checkAll)
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
