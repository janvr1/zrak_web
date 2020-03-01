<template>
  <a class="box">
    <h1 class="title">{{device.name}}</h1>
    <h1 class="subtitle">Location: {{device.location}}</h1>
  </a>
</template>

<script>
export default {
  name: "DeviceTile",
  props: {
    device: Object
  }
};
</script>

<style scoped>
</style>