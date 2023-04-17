<template>

	<view class="goods-item">
		<!-- 左侧格子 -->
		<view class="goods-item-left">
			<!-- 封装一个勾选状态 -->
			<label @click="radioClickHandler" v-if="showRadio" class="radio">
				<radio value="" :checked="goods.goods_state" color="#C00000" /><text></text>
			</label>
			<image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<view class="info-top">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="price">￥{{goods.goods_price.toFixed(2)}}</view>
				<!-- 数量计算 -->
				<uni-number-box v-if="showNum" :min="1" :max="999" @change="numChange" v-model="goods.goods_count" ></uni-number-box>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				// 默认情况下不展示radio组件
				type: Boolean,
				default: false
			},
			showNum:{
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				// 避免图片加载不成功，给一个默认图片
				defaultPic: "../../static/shopMiss.jpg"
			};
		},
		methods: {
			// 去给父组件传参
			radioClickHandler() {
				this.$emit("radio-change", {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numChange(val){
				// 监听数量变化
				this.$emit("numChangeHandler", {
					// 传入需要修改的数量
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 1px 5px;
		border-bottom: 1px solid #ccc;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

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
			flex: 1;

			.info-top {
				font-size: 13px;
			}
			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.price {
					color: #c00000;
					font-size: 16px;
				}
			}
			
		}
	}
</style>
