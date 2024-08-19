<template>
  <view>
    <uv-navbar title="我的" placeholder border leftIcon=" "></uv-navbar>
    <uv-transition :show="show" mode="slide-left" :custom-style="{ 'width': '100%', 'height': '100%' }" :duration="500"
			:delay="300" @change="change">
      <uv-cell-group>
      <uv-cell>
        <template v-slot:title>
          <text>退出</text>
        </template>
        <template v-slot:right-icon>
          <uv-icon size="30rpx" name="arrow-right"></uv-icon>
        </template>
      </uv-cell>
    </uv-cell-group>
    <uv-cell-group>
      <uv-cell>
        <template v-slot:title>
          <text>退出</text>
        </template>
        <template v-slot:right-icon>
          <uv-icon size="30rpx" name="arrow-right"></uv-icon>
        </template>
      </uv-cell>
    </uv-cell-group>
    <uv-cell-group>
      <uv-cell>
        <template v-slot:title>
          <text>退出</text>
        </template>
        <template v-slot:right-icon>
          <uv-icon size="30rpx" name="arrow-right"></uv-icon>
        </template>
      </uv-cell>
    </uv-cell-group>
    <uv-cell-group>
      <uv-cell>
        <template v-slot:title>
          <text>退出</text>
        </template>
        <template v-slot:right-icon>
          <uv-icon size="30rpx" name="arrow-right"></uv-icon>
        </template>
      </uv-cell>
    </uv-cell-group>
    <uv-cell-group>
      <uv-cell>
        <template v-slot:title>
          <text>退出</text>
        </template>
        <template v-slot:right-icon>
          <uv-icon size="30rpx" name="arrow-right"></uv-icon>
        </template>
      </uv-cell>
    </uv-cell-group>
    <uv-cell-group>
      <uv-cell @click="goQuit">
        <template v-slot:title>
          <text>退出</text>
        </template>
        <template v-slot:right-icon>
          <uv-icon size="30rpx" name="arrow-right"></uv-icon>
        </template>
      </uv-cell>
    </uv-cell-group>
		</uv-transition>
    <uv-tabbar :value="value" :fixed="true" @change="goPage">
      <uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
      <uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
    </uv-tabbar>
  </view>
</template>

<script setup>
import { ref, onBeforeMount,onMounted } from "vue";
import { useUserStore } from '@/stores/modules/userStore.js';
import { getTokenMenu } from '@/api/user/user.js';
let  value = ref(1);
let  token = ref('');
const useStore = useUserStore(); 

const getMenu = async () => {
  token.value = useStore.getToken(); // 正确修改 token 的响应式值
  let params = { token: token.value };
  try {
    const res = await getTokenMenu(params); // 确保这个函数返回一个 Promise
  } catch (error) {
    console.error('Failed to fetch menu:', error);
  }
};
let show = ref(false);
let isFirstLaunch = ref(true);  // 控制首次启动的变量

// 使用 onMounted 替代 onLaunch 和 onShow
onMounted(() => {
	if (isFirstLaunch.value) {
		show.value = true;
		isFirstLaunch.value = false;  // 确保动画只播放一次
	}
});

onBeforeMount(() => {
  getMenu();
});

const goQuit = () => {
  useStore.clearToken();
  uni.showToast({
    title: '退出成功', icon: 'none'
  });
  uni.redirectTo({
    url: "/pages/login/index",
  });
};

const goPage = (index) => {
  if (index == 0) {
    uni.redirectTo({
      url: "/pages/index/index",
    });
  }
};
</script>

<style scoped>
.custom-cell-height {
  height: 120rpx;
  /* 根据需要调整高度 */
}
</style>
