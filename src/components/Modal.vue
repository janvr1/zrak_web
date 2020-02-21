<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self="$emit('close')"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal"
};
</script>

<style scoped>
</style>