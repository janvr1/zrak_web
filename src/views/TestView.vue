<template>
  <div>
    <Modal v-if="modalActive" @close="modalActive=false">
      <p>Message</p>
    </Modal>
    <button @click.prevent="modalActive=true">Click me</button>
    <p> Hello?</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "@/components/Modal";

export default {
  name: "TestView",
  components: {
    Modal
  },
  data() {
      return {
          modalActive: false
      }
  }
};
</script>
