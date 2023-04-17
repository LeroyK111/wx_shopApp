<template>
	<view class="my-container">
		<!-- 登录组件 -->
		<my-login v-if="token == null" ></my-login>
		<!-- 登录后用户展示 -->
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import tabbar_badge from "@/mixins/tabbar-badge.js"
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
		mixins: [tabbar_badge],
		data() {
			return {

			};
		},
		computed:{
			token(){
				return useUser.token
			}
		}
	}
</script>

<style lang="scss">
page .my-container{
	height: 100%;
}
</style>
