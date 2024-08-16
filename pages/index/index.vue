<template>
	<view>
		<uv-navbar title="首页" placeholder border leftIcon=" "></uv-navbar>
		<view class="grid-margine">
			<uv-cell-group :border="false">
				<uv-cell>
					<template v-slot:icon>
					  <view class="custom-icon custom-blue"></view>
					</template>
					<template v-slot:title>
						<text>会员中心</text>
					</template>
				</uv-cell>
			</uv-cell-group>
			<uv-grid :border="true">
				<uv-grid-item v-for="(item,index) in baseList1" :key="index">
					<uv-icon :customStyle="{paddingTop:40+'rpx'}" :name="item.name" :size="30"></uv-icon>
					<text class="grid-text">{{item.title}}</text>
				</uv-grid-item>
			</uv-grid>
		</view>
		<view class="grid-margine">
			<uv-cell-group :border="false">
				<uv-cell >
					  <template v-slot:icon>
					    <view class="custom-icon custom-red"></view>
					  </template>
					<template v-slot:title>
						<text>运力中心</text>
					</template>
				</uv-cell>
			</uv-cell-group>
			<uv-grid :border="true">
				<uv-grid-item v-for="(item,index) in baseList2" :key="index">
					<uv-icon :customStyle="{paddingTop:40+'rpx'}" :name="item.name" :size="30"></uv-icon>
					<text class="grid-text">{{item.title}}</text>
				</uv-grid-item>
			</uv-grid>
		</view>
		<view class="grid-margine">
			<uv-cell-group :border="false">
				<uv-cell >
					  <template v-slot:icon>
					    <view class="custom-icon custom-yellow"></view>
					  </template>
					<template v-slot:title>
						<text>车辆监控</text>
					</template>
				</uv-cell>
			</uv-cell-group>
			<uv-grid :border="true">
				<uv-grid-item v-for="(item,index) in baseList3" :key="index">
					<uv-icon :customStyle="{paddingTop:40+'rpx'}" :name="item.name" :size="30"></uv-icon>
					<text class="grid-text">{{item.title}}</text>
				</uv-grid-item>
			</uv-grid>
		</view>
		<uv-tabbar :value="value" :fixed="true" @change="goPage">
			<uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
			<uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
		</uv-tabbar>
	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	const value = ref(0);
	const goPage = (index) => {
		console.log(index, 'index');
		if (index == 1) {
			uni.navigateTo({
				url: '/pages/home/index'
			})
		}
	}
	const baseList1 = ref([{
		name: 'photo',
		title: '承运人管理'
	}, {
		name: 'lock',
		title: '司机管理'
	}, ])
	const baseList2 = ref([{
		name: 'photo',
		title: '车辆管理'
	}, {
		name: 'lock',
		title: '挂车管理'
	}, ])
	const baseList3 = ref([{
		name: 'photo',
		title: '运单监控'
	}, ])
</script>
<style lang="scss">
	.grid-margine {
		margin-top: 40rpx;
	}
	.custom-icon {
	  width: 10px;
	  height: 10px;
	  border-radius: 50%; // 使其呈圆形
	  margin-right: 10px; // 在标题前添加一些间距
	}
	.custom-blue{
	  background-color:royalblue; // 默认颜色，可根据需求自定义
	}
	.custom-red{
	  background-color: red; // 默认颜色，可根据需求自定义
	}
	.custom-yellow{
	  background-color: yellow; // 默认颜色，可根据需求自定义
	}
</style>