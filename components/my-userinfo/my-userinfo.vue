<template>
	<view class="my-userinfo-container" :style="{height:emptyHight + 'px'}">
		<!-- 头像和昵称 -->
		<view class="top-box">
			<image :src="userInfo.avatarUrl" mode="" class="avatar"></image>
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>

		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>18</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>182</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>1</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<uni-icons type="wallet" size="30" color="#c00000"></uni-icons>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<uni-icons type="paperplane-filled" size="30" color="#c00000"></uni-icons>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<uni-icons type="spinner-cycle" size="30" color="#c00000"></uni-icons>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<uni-icons type="wallet-filled" size="30" color="#c00000"></uni-icons>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三面板 -->
			<view class="panel">
				<view class="panel-item-s">
					<view class="text-s">收货地址</view>
					<uni-icons type="forward" color="#c00"></uni-icons>
				</view>
				<view class="panel-item-s">
					<view class="text-s">联系客服</view>
					<uni-icons type="forward" color="#c00"></uni-icons>
				</view>
				<view @click="logout" class="panel-item-s">
					<view class="text-s">退出登录</view>
					<uni-icons type="forward" color="#c00"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入全局状态插件
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
		name: "my-userinfo",
		data() {
			return {
				// 获取可视范围高度
				emptyHight: uni.getWindowInfo().windowHeight
			};
		},
		computed: {
			userInfo() {
				return useUser.userInfo
			}
		},
		methods:{
			async logout(){
				// 推出登录
				const succ = await uni.showModal({
					title:"提示",
					content:"确认退出登录吗?"
				})
				
				if (succ && succ.confirm) {
					// 清空userinfo，token， address
					useUser.logoutClearAll()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-userinfo-container {
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.avatar {
			width: 90px;
			height: 90px;
			border-radius: 50%;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}

		.nickname {
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}

	.panel-list {
		position: relative;
		padding: 0 10px;
		top: -10px;
		.panel {
			background-color: #fff;
			border-radius: 3px;
			margin-bottom: 8px;
			margin-bottom: 15px;
			
			.panel-title {
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #ccc;
				padding: 0 20px;
			}
			
			.panel-item-s {
				display: flex;
				flex-direction: row;
				height: 40px;
				padding: 0 20px;
				justify-content: space-between;
				align-items: center;
			}
			.panel-body {
				display: flex;
				justify-content: space-around;
				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;
				}
			}
		}
	}
</style>
