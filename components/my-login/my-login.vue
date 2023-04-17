<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!-- 登录专用接口 -->
		<button open-type="getUserInfo" @getuserinfo="getuserInfo" type="primary" class="btn-login">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
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
		name: "my-login",
		data() {
			return {

			};
		},

		computed: {
			redirectInfo: () => (useUser.redirectInfo)
		},
		methods: {
			getuserInfo(e) {
				// 这里就是直接拿到基本信息
				// console.log(e);
				if (e.detail.errMsg === "getUserInfo fail auth deny") return uni.$showMsg("您取消了授权")
				// 传入对象
				useUser.updateUserInfo(e.detail.userInfo)
				// 使用uni登录(这里我们实现一个伪登录，不发送请求
				this.getToken(e.detail)
			},
			// 获取code对应的值
			async getToken(info) {
				const res = await uni.login()
				if (res.errMsg !== "login:ok") return uni.$showMsg("登录失败")

				// 获取code
				// console.log(res.code);

				// 准备参数对象，这里的对象是上传到服务器上的，可以自定义，但是我不用
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}

				// 这里就是自己的接口了
				// const {data: loginResult} = uni.$http.post("url", query)
				// if (loginResult.meta.status !==200) return uni.$showMsg("登录失败")

				uni.showModal({
					title: "登录成功",
				})
				// 存储到状态中间件上,当然是自定义token
				useUser.updateToken("aklsdjfklsdjlkfsjdf")
				// 调用判断跳转
				this.navigateBack()
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete() {
							// 记得重置跳转数值
							useUser.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 40px;
			background-color: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
