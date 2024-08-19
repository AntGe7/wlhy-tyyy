<template>
	<view>
		<uv-navbar title="首页" placeholder border leftIcon=" "></uv-navbar>
		<uv-transition :show="show" mode="slide-left" :custom-style="{ 'width': '100%', 'height': '100%' }" :duration="500"
			:delay="300" @change="change">
			<view>
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
						<uv-grid-item v-for="(item, index) in baseList1" :key="index">
							 <img :src="item.name" style="width: 50rpx;height: 50rpx; margin: 20rpx;" alt="">
							 <text class="grid-text" style="margin-bottom: 20rpx;">{{ item.title }}</text>
						</uv-grid-item>
					</uv-grid>
				</view>
				<view class="grid-margine">
					<uv-cell-group :border="false">
						<uv-cell>
							<template v-slot:icon>
								<view class="custom-icon custom-red"></view>
							</template>
							<template v-slot:title>
								<text>运力中心</text>
							</template>
						</uv-cell>
					</uv-cell-group>
					<uv-grid :border="true">
						<uv-grid-item v-for="(item, index) in baseList2" :key="index">
							<img :src="item.name" style="width: 50rpx;height: 50rpx; margin: 20rpx;" alt="">
							<text class="grid-text" style="margin-bottom: 20rpx;">{{ item.title }}</text>
						</uv-grid-item>
					</uv-grid>
				</view>
				<view class="grid-margine">
					<uv-cell-group :border="false">
						<uv-cell>
							<template v-slot:icon>
								<view class="custom-icon custom-yellow"></view>
							</template>
							<template v-slot:title>
								<text>车辆监控</text>
							</template>
						</uv-cell>
					</uv-cell-group>
					<uv-grid :border="true">
						<uv-grid-item v-for="(item, index) in baseList3" :key="index">
							<img :src="item.name" style="width: 50rpx;height: 50rpx; margin: 20rpx;" alt="">
							<text class="grid-text" style="margin-bottom: 20rpx;">{{ item.title }}</text>
						</uv-grid-item>
					</uv-grid>
				</view>
			</view>
		</uv-transition>
		<uv-tabbar :value="value" :fixed="true" @change="goPage">
			<uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
			<uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
		</uv-tabbar>
	</view>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from '@/stores/modules/userStore.js';
import { getTokenMenu } from '@/api/user/user.js';
let value = ref(0);
let token = ref('');
const useStore = useUserStore();
const goPage = (index) => {
	console.log(index, 'index');
	if (index == 1) {
		uni.redirectTo({
			url: '/pages/home/index'
		})
	}
}
let show = ref(false);
let isFirstLaunch = ref(true);  // 控制首次启动的变量

// 使用 onMounted 替代 onLaunch 和 onShow
onMounted(() => {
	if (isFirstLaunch.value) {
		show.value = true;
		isFirstLaunch.value = false;  // 确保动画只播放一次
	}
});

const toggleShow = () => {
	show.value = !show.value;
};
const getMenu = async () => {
	token.value = useStore.getToken(); // 正确修改 token 的响应式值
	let params = { token: token.value };
	try {
		const res = await getTokenMenu(params); // 确保这个函数返回一个 Promise
	} catch (error) {
		console.error('Failed to fetch menu:', error);
	}
};



const baseList1 = ref([{
	name: '../../static/home/driver2.png',
	title: '承运人管理'
}, {
	name: '../../static/home/driver.png',
	title: '司机管理'
},])
const baseList2 = ref([{
	name: '../../static/home/car.png',
	title: '车辆管理'
}, {
	name: '../../static/home/car2.png',
	title: '挂车管理'
},])
const baseList3 = ref([{
	name: '../../static/home/driver2.png',
	title: '运单监控'
},])
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

.custom-blue {
	background-color: royalblue; // 默认颜色，可根据需求自定义
}

.custom-red {
	background-color: #FA8072; // 默认颜色，可根据需求自定义
}

.custom-yellow {
	background-color: #008080; // 默认颜色，可根据需求自定义
}
</style>