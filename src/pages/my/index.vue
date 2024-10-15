<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import head from '@/assets/img/head.jpg';
import money from '@/assets/img/money.jpg';

const user = ref({
  avatar: head, // 替换为真实头像URL
  nickname: '鱼鱼'
});
const showPreview = ref(false);
const Payment = () => {
  Taro.showToast({
    title: '创作不易~感谢打赏',
    icon: 'none',
    duration: 2000
  });
  showPreview.value = true;
};
const closePreview = () => {
  showPreview.value = false;
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
// 退出登录的处理函数
const logout = () => {
  // 在这里添加退出登录的逻辑
  Taro.showToast({
    title: '退出登录成功',
    icon: 'success',
    duration: 2000
  });
};
</script>

<template>
  <div class="h-full">
    <custom-navbar title="我的" />
    <div class="profile-container">
      <img :src="user.avatar" class="avatar" />
      <div class="nickname">{{ user.nickname }}</div>
    </div>

    <nut-cell
      title="个人信息"
      is-link
      @click="
        () => {
          /* 个人信息处理 */
          Taro.showToast({
            title: '限时免费试用',
            icon: 'none',
            duration: 2000
          });
        }
      "
    />
    <nut-cell title="打赏作者" is-link @click="Payment" />
    <nut-cell
      title="设置"
      is-link
      @click="
        () => {
          /* 设置处理 */
          Taro.showToast({
            title: '限时免费试用',
            icon: 'none',
            duration: 2000
          });
        }
      "
    />
    <nut-cell
      title="关于我们"
      is-link
      @click="
        () => {
          Taro.showToast({
            title: '限时免费试用',
            icon: 'none',
            duration: 2000
          });
        }
      "
    />
    <nut-cell title="退出登录" is-link @click="logout" />
  </div>
  <nut-image-preview
    :show="showPreview"
    :images="[
      {
        src: money
      }
    ]"
    @close="closePreview"
    @long-press="longPress"
  />
</template>

<style lang="scss">
.h-full {
  background: rgb(255, 36, 66);
  height: 22vh; /* 使用100vh以确保全屏 */
  padding: 20px;
  box-sizing: border-box;
}

.profile-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.nickname {
  font-size: 20px;
  color: white;
  font-weight: bold;
}
.money-dialog {
  width: 90%; /* 宽度设为90% */
  max-width: 500px; /* 最大宽度 */
}
</style>
