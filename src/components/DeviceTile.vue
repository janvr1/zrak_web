<template>
  <div class="box">
    <!-- <div class="content is-vcentered has-text-centered"> -->
      <h1 class="title">{{device.name}}</h1>
      <h1 class="subtitle">Location: {{device.location}}</h1>
    <!-- </div> -->
  </div>
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
.content.is-vcentered {
  display: flex;
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
  align-items: center; /* if an only child */
}
</style>