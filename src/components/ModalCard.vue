<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
      </header>
      <section class="modal-card-body">
        <span></span>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalCard",
  props: {
    title: String,
    confirm: String,
    delete: String
  }
};
</script>

<style scoped>
</style>