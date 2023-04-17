<template>
	<view @click="searchBoxHandler" class="my-search-container"
		:style="{'background-color': bgcolor}">
		<!-- 模拟输入框，其实是页面跳转 -->
		<view class="my-search-box" :style="{borderRadius: radius + 5 + 'rpx'}">
			<!-- 使用uni-icons插件 -->
			<uni-icons type="search" size="20"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		// 接收参数
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 30
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchBoxHandler() {
				// 手动触发自定义事件
				this.$emit("myclick")
			}
		}

	}
</script>

<style lang="scss">
	.my-search-container {
		height: 60px;
		background-color: #c00000;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0 0 10rpx 10rpx;

		.my-search-box {
			width: 80%;
			height: 40px;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 30rpx;
		}
	}
</style>
