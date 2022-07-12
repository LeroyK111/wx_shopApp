<template>
	<view>
		<!-- 直接focus自动聚焦 -->
		<view class="search-box">
			<uni-search-bar focus id="searchBar" :placeholder="searchMsg" cancelButton="none" :radius="100"
				@confirm="search" @input="input"></uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-if="kw.length == 0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="clearSearchHistory" type="trash-filled" size="16"></uni-icons>
			</view>
			<view class="histor-list">
				<uni-tag @click="gotoGoodsList(item)" class="histor-list-item" type="error" :text="item" v-for="(item, i) in historyList" :key="i">
				</uni-tag>
			</view>
		</view>

		<!-- 搜索列表 -->
		<view class="goods-search-list" v-if="searchResults.length !== 0">
			<view @click="gotoDetail(item)" class="goods-search-item" v-for="(item,index) in searchResults"
				:key="index">
				<view class="goods-name">{{item.goods_name}}</view>
				<!-- 再出入一个箭头 -->
				<uni-icons type="arrow-right" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定义延时器
				timer: null,
				searchMsg: "搜索商品",
				// 定义一个数组用以存储数据
				searchResults: [],
				// keyword
				kw: "",
				// 定义历史假数据
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("kw") || '[]')
		},
		methods: {
			input(e) {
				// 定义一个输入事件
				// console.log(e);

				// 清除定时器
				clearTimeout("timer")
				// 防抖
				this.timer = setTimeout(() => {
					this.kw = e
					console.log(e);
					this.getResults()
				}, 500);
			},
			async getResults() {
				if (this.kw.length == 0) {
					this.searchResults = []
					return null
				}
				// 当我们搜索过页面后，需要调用客户端存储
				this.savaSearchHistory()


				// 不为空，则get
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/goods/qsearch", {
					query: this.kw
				})
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.searchResults = res.message
			},
			// 存储搜索历史
			savaSearchHistory() {
				if (this.historyList.includes(this.kw)) return null
				this.historyList.unshift(this.kw)
				// 转存到客户端中
				uni.setStorageSync("kw", JSON.stringify(this.historyList))
			},

			// 清空搜索历史
			clearSearchHistory() {
				this.historyList = []
				uni.removeStorageSync("kw")
			},

			gotoDetail(item) {
				// 带参数去跳转
				uni.navigateTo({
					url: "//subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			},
			// 点击历史事件，跳转
			gotoGoodsList(item){
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?query=" + item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		background-color: #C00000;
		position: static;
		top: 0;
		z-index: 999;
	}

	.goods-search-item {
		height: 20px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		padding: 5px;
		z-index: 1;
		line-height: 20px;

		.goods-name {
			font-size: 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.history-title {
		height: 20px;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		line-height: 20px;
		margin-bottom: 10px;
		border-bottom: 1px solid #ccc;
	}

	.histor-list {
		display: flex;
		padding-left: 10px;
		flex-wrap: wrap;

		.histor-list-item {
			margin: 10px;
		}
	}
</style>
