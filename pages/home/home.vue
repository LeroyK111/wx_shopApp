<template>
	<view class="">
		<!-- 搜索框-->
		<!-- 构建吸顶效果 -->
		<view class="search-box">
			<my-search @myclick="gotoSearch"></my-search>
		</view>

		<!-- 轮播图 -->
		<swiper :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, i) in switperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<!-- 分类导航区 -->
			<view @click="navClickHandler(item)" class="nav-list-item" v-for="(item, i) in navList" :key="i">
				<image :src="item.image_src" mode="widthFix" class="nav-img"></image>
			</view>
		</view>
		<!-- 首页楼层 -->
		<view class="floor-list">
			<!-- 楼层 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" mode="widthFix" class="floot-title"></image>
				<!-- 楼层内容 -->
				<view class="floor-img-box">
					<!-- 左侧大盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width: item.product_list[0].image_width + 'rpx'} "></image>
					</navigator>
					<!-- 右侧小盒子 -->
					<view class="right-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2, i2) in item.product_list"
							:key="i2" v-show="i2!==0">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Home",
		data() {
			return {
				switperList: [],
				// 分类导航数据列表
				navList: [],
				// 首页楼层数据
				floorList: []
			}
		},
		onLoad() {
			// 调用方法获取轮播图
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},

		methods: {
			async getSwiperList() {
				// 解构赋值
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/swiperdata")
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 赋值
				this.switperList = res.message
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}

				this.navList = res.message
			},
			navClickHandler(item) {
				console.log(item);
				if (item.name === "分类") {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			// 获取首页楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}

				// 双层循环，修改路径
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split('?')[1]
					})
				})

				this.floorList = res.message
			},
			gotoSearch() {
				// 搜索框跳转
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 330rpx;
	}

	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.search-box {
		// 粘性定位
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
