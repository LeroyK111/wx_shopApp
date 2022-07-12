<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<my-search @myclick="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动效果 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in CateList" :key="i">
					<view @click="activeChanged(i)" :class="['left-scroll-view-item', i==active? 'active':'']">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动效果 -->
			<scroll-view :scroll-top="scrollTop" class="right-scroll" scroll-y="true" :style="{height: wh + 'px'}">
				<view class="cate-lv2" v-for="(item2, i2) in CateLevel2" :key="i2">
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<view class="cate-lv3-list">
						<!-- 三级分类 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!-- 三级图片 -->
							<image :src="item3.cat_icon" mode=""></image>
							<!-- 三级文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用
				wh: 0,
				// 获取分类信息
				CateList: [],
				// 二级分类信息
				CateLevel2: [],
				// 申明滚动条的位置
				scrollTop: 0,
				active: 0
			};
		},
		// 这个生命周期，是uni-app框架定义的
		onLoad() {
			// 获取客户端信息
			const sysInfo = uni.getWindowInfo()
			// console.log(sysInfo);
			this.wh = sysInfo.windowHeight - 60
			// 获取分类数据
			this.getCateList()
		},
		methods: {
			// 获取分类数据		
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.CateList = res.message

				// 为二级分类赋值
				this.CateLevel2 = res.message[0].children

			},
			// 点击事件
			activeChanged(i) {
				this.active = i

				// 重新为二级分类
				this.CateLevel2 = this.CateList[i].children

				// 滚动范围
				this.scrollTop = this.scrollTop == 0 ? 1 : 0
			},
			gotoGoodsList(item3){
				// 三级分类跳转
				uni.navigateTo({
					// 跳转到分包
					url:"/subpkg/goods_list/goods_list?/cid=" + item3.cat_id
				})
				
			},
			gotoSearch(){
				// 搜索框跳转
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll {
			width: 120px;
		}
	}


	.left-scroll-view-item {
		background-color: #F7F7F7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
	}


	// 设置自定义标签
	.active {
		background-color: #FFF;
		position: relative;

		&::before {
			content: "";
			display: block;
			width: 3px;
			height: 30px;
			background-color: #C00000;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			display: flex;
			width: 33.33%;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 10px;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
