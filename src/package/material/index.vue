<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { getInfo } from '@/service/api/aiCreate';
// 当前选中的标签页，默认是图片（0）
const currentTab = ref(0);
// 存放接口返回的数据
const data = ref<InfoData>({
  title: '',
  description: '',
  masterImgList: [],
  mp4List: []
});
// 定义响应的数据类型
interface InfoData {
  title: string;
  description: string;
  masterImgList: Array<string>;
  mp4List: Array<string>;
}

// URL 获取并解码
const url = Taro.getCurrentInstance().router?.params.url;
const isLive = Taro.getCurrentInstance().router?.params.isLive;
const showPreview = ref(false);
const currentIndex = ref(0);
let params = '';
if (url) {
  params = decodeURIComponent(url); // 解码
}

// 请求数据
async function response() {
  Taro.showLoading({
    title: '加载中...',
    mask: true // 是否显示透明蒙层
  });
  const res = await getInfo({
    url: params?.toString(),
    type: isLive ? 'all' : undefined
  });

  if (res.success) {
    data.value = res.success;
    Taro.hideLoading();
  }
}

// 切换标签页
const switchTab = (index: number) => {
  currentTab.value = index;
};

// 预览图片
const previewImage = (index: number) => {
  currentIndex.value = index;
  showPreview.value = true;
};
// 关闭预览
const closePreview = () => {
  showPreview.value = false;
};

// 保存图片到手机
const saveImages = () => {
  data.value.masterImgList.forEach(imgUrl => {
    Taro.downloadFile({
      url: imgUrl,
      success(res) {
        if (res.statusCode === 200) {
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              Taro.showToast({
                title: '图片保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail() {
              Taro.showToast({
                title: '图片保存失败',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      },
      fail() {
        Taro.showToast({
          title: '下载图片失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  });
};

// 保存视频到手机
const saveVideo = () => {
  if (data.value.mp4List.length > 0) {
    // 遍历所有视频链接进行下载
    data.value.mp4List.forEach(videoUrl => {
      // 使用真实的URL
      const fullUrl = videoUrl;

      // 创建下载任务
      const downloadTask = Taro.downloadFile({
        url: fullUrl
      });

      // 进度更新
      downloadTask.onProgressUpdate(progress => {
        Taro.showToast({
          title: `下载进度：${progress.progress}%`,
          icon: 'none',
          duration: 1000
        });
      });

      // 下载成功
      downloadTask
        .then(res => {
          if (res.statusCode === 200) {
            // 成功下载后，保存到相册
            Taro.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                Taro.showToast({
                  title: '视频保存成功',
                  icon: 'success',
                  duration: 2000
                });
              },
              fail() {
                Taro.showToast({
                  title: '视频保存失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          } else {
            Taro.showToast({
              title: `下载失败，状态码：${res.statusCode}`,
              icon: 'none',
              duration: 2000
            });
          }
        })
        .catch(() => {
          Taro.showToast({
            title: '下载视频失败',
            icon: 'none',
            duration: 2000
          });
        });
    });
  } else {
    Taro.showToast({
      title: '没有视频可供下载',
      icon: 'none',
      duration: 2000
    });
  }
};
// 长按保存图片
const longPress = image => {
  Taro.getImageInfo({
    src: image.src,
    success: res => {
      Taro.saveImageToPhotosAlbum({
        filePath: res.path,
        success: () => {
          Taro.showToast({
            title: '保存成功'
          });
        }
      });
    }
  });
};

// 复制文本到剪贴板
const copyText = (text: string) => {
  if (text) {
    Taro.setClipboardData({
      data: text,
      success() {
        Taro.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail() {
        Taro.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
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
        <view v-for="(img, index) in data.masterImgList" :key="index" @tap="previewImage(index)">
          <image :key="img" :src="img" mode="widthFix" style="width: 100%" />
        </view>
        <nut-button type="primary" class="saveBtn" @click="saveImages">保存图片</nut-button>
        <nut-image-preview
          :show="showPreview"
          :init-no="currentIndex"
          :images="data.masterImgList.map(v => ({ src: v }))"
          @close="closePreview"
          @long-press="longPress"
        />
      </view>

      <!-- 视频展示 -->
      <view v-show="currentTab === 1">
        <view v-for="(video, index) in data.mp4List" :key="index">
          <Video id="videoPlayer" :src="video" controls="true" style="width: 100%" />
        </view>
        <view v-if="data.mp4List.length === 0">暂无视频</view>
        <nut-button v-if="data.mp4List && data.mp4List.length > 0" type="primary" class="saveBtn" @click="saveVideo">
          保存视频
        </nut-button>
      </view>

      <!-- 文案展示 -->
      <view v-if="currentTab === 2">
        <view class="copy-container">
          <view class="title">{{ data.title }}</view>
          <view class="copy-text" @click="copyText(data.title)">复制文案</view>
        </view>

        <!-- 复制描述文案 -->
        <view class="copy-container">
          <view class="description">{{ data.description }}</view>
          <view class="copy-text" @click="copyText(data.description)">复制文案</view>
        </view>
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
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
.h5-video {
  height: 350px !important;
}
.copy-container {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.copy-text {
  flex-basis: 20%;
  color: #1e90ff;
  margin-right: 10px;
  cursor: pointer;
}

.title {
  flex-basis: 80%;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
}
.description {
  flex-basis: 80%;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-primary-label);
}
.saveBtn {
  position: fixed;
  width: 90%;
  bottom: 20px;
}
</style>
