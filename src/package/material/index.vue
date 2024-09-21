<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { request } from '@/service/request/index';

const currentTab = ref(0);
const params = Taro.getCurrentInstance().router?.params;
function response() {
  request.post('/red/chrome', params, {});
}
// 切换标签的函数
const switchTab = (index: number) => {
  currentTab.value = index;
};
onMounted(() => {
  response();
});
</script>

<template>
  <div class="h-full">
    <custom-navbar left-show title="素材详情" />

    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">图片</view>
      <view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">视频</view>
      <view class="tab-item" :class="{ active: currentTab === 2 }" @click="switchTab(2)">动图</view>
    </view>

    <!-- 内容展示 -->
    <view class="tab-content">
      <view v-if="currentTab === 0">
        <!-- 图片内容 -->
        <view>图片内容</view>
      </view>
      <view v-if="currentTab === 1">
        <!-- 视频内容 -->
        <view>视频内容</view>
      </view>
      <view v-if="currentTab === 2">
        <!-- 动图内容 -->
        <view>动图内容</view>
      </view>
    </view>
  </div>
</template>

<style lang="scss">
.h-full {
  background: rgb(255, 36, 66);
  height: 40vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.tab-nav {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
}

.tab-item.active {
  color: #ff2424;
  border-bottom: 2px solid #ff2424;
}

.tab-content {
  padding: 20px;
  background-color: #fff;
}
</style>
