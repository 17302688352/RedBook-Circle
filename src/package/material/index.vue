<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { getInfo } from '@/service/api/aiCreate';
// 当前选中的标签页，默认是图片（0）
const currentTab = ref(0);
// 存放接口返回的数据
const data = ref<InfoData>({
  title: '',
  masterImgList: [],
  mp4List: []
});
// 定义响应的数据类型
interface InfoData {
  title: string;
  masterImgList: Array<string>;
  mp4List: Array<string>;
}

const params = Taro.getCurrentInstance().router?.params;

// 请求数据
async function response() {
  const res = await getInfo(params);
  if (res.success) {
    data.value = res.success;
  }
  console.log('响应数据:', data.value);
}

// 切换标签的函数
const switchTab = (index: number) => {
  console.log(index);
  currentTab.value = index;
};

// 获取数据
onMounted(() => {
  response();
});
</script>

<template>
  <div>
    <custom-navbar left-show title="素材详情" />
    <!-- 标签页导航 -->
    <view class="tab-nav">
      <view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">图片</view>
      <view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">视频</view>
      <view class="tab-item" :class="{ active: currentTab === 2 }" @click="switchTab(2)">文案</view>
    </view>

    <!-- 内容展示 -->
    <view class="tab-content">
      <!-- 图片展示 -->
      <view v-if="currentTab === 0">
        <view v-for="(img, index) in data.masterImgList" :key="index">
          <image :src="img" mode="widthFix" style="width: 100%" />
        </view>
      </view>

      <!-- 视频展示 -->
      <view v-if="currentTab === 1">
        <view v-for="(video, index) in data.mp4List" :key="index">
          <video :src="video" controls style="width: 100%" />
        </view>
        <view v-if="data.mp4List.length === 0">暂无视频</view>
      </view>

      <!-- 文案展示 -->
      <view v-if="currentTab === 2">
        <view>{{ data.title }}</view>
      </view>
    </view>
  </div>
</template>

<style lang="scss">
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
