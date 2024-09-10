<script setup lang="ts">
import { ref } from 'vue';
// import { navigateTo } from '@tarojs/taro';

const visible1 = ref<boolean>(false);

const inputValue = ref('');
</script>

<template>
  <div class="h-full">
    <custom-navbar title="AI创作" />
    <nut-textarea v-model="inputValue" type="text" placeholder="请粘贴链接" class="rounded-input" />
    <nut-dialog v-model:visible="visible1" title="基础弹框" content="这是基础弹框。" />
  </div>
</template>
<style lang="scss">
.h-full {
  // background: linear-gradient(to bottom, rgb(255, 36, 66) 20%, #ffffff 50vh, #ffffff 100vh);
  // background-attachment: fixed;
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
}
</style>
