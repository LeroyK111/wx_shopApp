<template>
	<view>
		<!-- 添加收获地址 -->
		<view v-if="JSON.stringify(address) === '{}'" class="address-choose-box">
			<button @click="btnChooseAddress" type="primary" size="mini">请选择收货地址+</button>
		</view>
		<!-- 渲染收获信息 -->
		<view class="address-info-box" v-else @click="btnChooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人: {{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话: {{address.telNumber}}</view>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收获地址: </view>
				<view class="row2-right">{{addstr}}</view>
			</view>
		</view>



		<!-- 底部边框线 -->
		<view class="adderss-bottom"></view>
	</view>
</template>

<script>
	import { useUserStore } from "@/store/user.js"
	const userAddress = useUserStore()
	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		computed: {
			addstr(){
				return userAddress.addstr
			},
			address(){
				return userAddress.address
			}
		},
		methods: {
			async btnChooseAddress() {
				// 调用原生api，构造地址
				const succ = await uni.chooseAddress({
					fail(err) {
						// 如果调用失败
						if (err && (err.errMsg === "chooseAddress:fail auth deny" ||err.errMsg === "chooseAddress:fail authorize no response"  )){
							this.reAuth()
						}
					}
				})
				if (succ.errMsg == 'chooseAddress:ok') {
					// this.address = succ
					userAddress.updateAddress(succ)
				}
			},
			// 授权实现
			async reAuth(){
				const [err, confirmResult] = await uni.showModal({
					content:"监测到您还没有打开地址权限，是否设置打开？",
				})
				
				if (err) return
				
				if (confirmResult.cancel) return uni.$showMsg("您取消了授权")
				if (confirmResult.cancel) return uni.openSetting({
					success(settingResult) {
						if (!settingResult.authSetting['scope.address']) return uni.$showMsg("您取消了授权")
						return uni.$showMsg("授权成功,请选择收获地址")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// 写一个边框线
	.adderss-bottom {
		margin-top: 5px;
		width: 100%;
		height: 5px;
		background: linear-gradient(to bottom right, red, orange, yellow, green, greenyellow, blue, purple)
	}

	.address-choose-box {
		display: flex;
		height: 90px;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;
			.row1-left {
				.username {}
			}

			.row1-right {
				display: flex;
				
				.phone {}
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
