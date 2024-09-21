<script setup lang="ts">
import { ref } from 'vue';
import { navigateTo, showToast } from '@tarojs/taro';

const inputValue = ref('');

// 清空文本方法
const clearInput = () => {
  inputValue.value = '';
};

// 获取素材并跳转方法
function getMaterial() {
  if (!inputValue.value) {
    // 进行表单验证
    showToast({
      title: '请输入链接',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  navigateTo({ url: `/package/material/index?url=${encodeURIComponent(inputValue.value)}` });
}
</script>

<template>
  <div class="h-full">
    <custom-navbar title="AI创作" />
    <nut-textarea v-model="inputValue" type="text" placeholder="请粘贴链接" class="rounded-input" />

    <!-- 按钮容器 -->
    <div class="button-container">
      <nut-button type="primary" class="btn-clear" @click="clearInput">清空文本</nut-button>
      <nut-button type="success" class="btn-material" @click="getMaterial">获取素材</nut-button>
    </div>
  </div>
</template>

<style lang="scss">
.h-full {
  background: rgb(255, 36, 66);
  height: 40vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.nut-textarea {
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  height: 10vh;
  position: absolute;
  bottom: 55%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 46%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  margin: 20px auto 0;
}

.btn-clear {
  flex: 1;
  margin-right: 10px;
}

.btn-material {
  flex: 1;
  margin-left: 10px;
}
</style>
