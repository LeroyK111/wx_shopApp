<template>
	<view class="">
		<view class="cart-shops" v-if="carts.length !== 0">
			<!-- 收获地址地址 -->
			<my-address></my-address>
			<!-- 标题区域 -->
			<view class="cart-title">
				<!-- 左侧图标 -->
				<uni-icons type="cart-filled" size="30"></uni-icons>
				<!-- 右侧文本 -->
				<text class="cart-title-text">购物车</text>
			</view>
			<!-- 渲染商品数据 -->
			<view>
				<uni-swipe-action>
					<block v-for="(goods, i) in carts" :key="i">
						<!-- 基础滑动用法 -->
						<uni-swipe-action-item autoClose :right-options="options" @click="onClick(goods)">
							<!-- 商品渲染组件 -->
							<my-goods @numChangeHandler="numChangeHandler" @radio-change="radioChangeHandler"
								:showRadio="true" :showNum="true" :goods="goods"></my-goods>
						</uni-swipe-action-item>
					</block>
				</uni-swipe-action>
			</view>
			<!-- 自定义结算组件 -->
			<my-settle></my-settle>
		</view>
		<!-- 空白购物车选项 -->
		<view class="empty-cart" :style="{height:emptyHight + 'px'}" v-else>
			<image src="/static/kong.png" mode="widthFix"></image>
			<text>你的购物车空空如也...</text>
		</view>
	</view>
</template>

<script>
	// 导入状态插件
	import {
		useCartStore
	} from "@/store/cart.js"
	// 实例化一个对象
	const useCart = useCartStore()

	// 导入需要的mixin文件
	import tabbar_badge from "@/mixins/tabbar-badge.js"
	export default {
		// 直接生效
		mixins: [tabbar_badge],
		// 我们使用vue3的语法
		data() {
			return {
				// 配置滑动选项
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000',
						color: "#fff"
					}
				}],
				// 获取可视范围高度
				emptyHight: uni.getWindowInfo().windowHeight
			}
		},
		computed: {
			// 到出本地存储的数据
			carts() {
				return useCart.carts
			},
		},
		methods: {
			radioChangeHandler(e) {
				// 子组件的选项触发传参
				useCart.updateGoodsState(e)
			},
			numChangeHandler(e) {
				// 修改goods_count
				useCart.updateGoodsCount(e)
			},
			onClick(goods) {
				// 滑动删除，传入了单个商品数据
				useCart.removeGoodsBid(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-title {
		display: flex;
		height: 40px;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}

	.cart-shops {
		padding-bottom: 50px;
	}
	
	.empty-cart{
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #efefef;
		image {
			width: 64px;
		}
		text {
			font-size: 16px;
			font-weight: bold;
		}
	}
</style>
