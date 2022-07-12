<template>

	<view class="goods-item">
		<!-- 左侧格子 -->
		<view class="goods-item-left">
			<image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<view class="info-top">{{goods.goods_name}}</view>
			<view class="price">￥{{goods.goods_price + '.00'}}</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "my-goods",
		props:{
			goods:{
				type:Object,
				default: {}
			}
		},
		data() {
			return {
				// 避免图片加载不成功，给一个默认图片
				defaultPic: "../../static/shopMiss.jpg"
			};
		},
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 1px 5px;
		border-bottom: 1px solid #ccc;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.info-top {
				font-size: 13px;
			}

			.price {
				color: #c00000;
				font-size: 16px;
			}
		}
	}
</style>
