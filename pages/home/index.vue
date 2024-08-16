<template>
  <view>
    <uv-navbar title="我的" placeholder border leftIcon=" "></uv-navbar>
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
    <uv-tabbar :value="value" :fixed="true" @change="goPage">
      <uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
      <uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
    </uv-tabbar>
  </view>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from '@/stores/modules/userStore.js';
import { getTokenMenu } from '@/api/user/user.js';

const value = ref(1);
const token = ref('');
const useStore = useUserStore(); 

const getMenu = async () => {
  token.value = useStore.getToken(); // 正确修改 token 的响应式值
  let params = { token: token.value };
  try {
    const res = await getTokenMenu(params); // 确保这个函数返回一个 Promise
    console.log(res, 'res');
  } catch (error) {
    console.error('Failed to fetch menu:', error);
  }
};

onBeforeMount(() => {
  getMenu();
});

const goQuit = () => {
  useStore.clearToken();
  uni.showToast({
    title: '退出成功', icon: 'none'
  });
  uni.navigateTo({
    url: "/pages/login/index",
  });
};

const goPage = (index) => {
  if (index == 0) {
    uni.navigateTo({
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
