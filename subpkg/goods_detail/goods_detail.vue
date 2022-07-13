<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图 -->
		<swiper circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image @click="preview(i)" :src="item.pics_big" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 商品主题信息 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏图标 -->
				<view class="favi">
					<uni-icons type="star-filled" size="30"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递，免运费</view>
		</view>
		<!-- 商品信息详情 -->
		<!-- 渲染字符串 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品购物按钮 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
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

	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'headphones',
					text: '客服',
					info: null
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red",
					info: null
				}, {
					icon: 'cart',
					text: '购物车',
					info: null
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			// 获取商品详情数据
			this.getGoodsDetail(goods_id)
		},
		computed: {
			// 直接传入计算结果
			total() {
				return useCart.total
			}
		},

		watch: {
			// 监听计算属性
			total: {
				// total必须开启初次监听
				handler(newval) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						// 重新赋值
						findResult.info = newval
					}
				},
				// 开启初次加载即监听
				immediate: true
			}
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 数据修改
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					'<img style="display: block" ')
				// 赋值
				this.goods_info = res.message

			},
			preview(i) {
				// 大图预览api
				uni.previewImage({
					current: i,
					// map构建数组
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},

			onClick(e) {
				if (e.content.text == "购物车") {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			buttonClick(e) {
				// 判断是什么操作，
				if (e.content.text == "加入购物车") {
					// 创建商品信息简化对象，方便取用
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						// 默认商品数量为1
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}

					// 直接调用
					useCart.addToCart(goods)
				}
			},
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10xp 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	// 导航
	.goods_nav {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>
