<template>
  <div class="modal is-active">
    <div class="modal-background" @click.self="$emit('close')"></div>
    <div class="modal-content">
      <div class="message is-danger">
        <div class="message-header">Confirmation needed</div>
        <div class="message-body">
          <div class="field">
            <div class="control" style="text-align:center">{{message}}</div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-danger is-light" @click="$emit('confirm')">Yes</button>
            </div>
            <div class="control">
              <button class="button is-danger" @click="$emit('deny')">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    message: String
  }
};
</script>

<style scoped>
</style>