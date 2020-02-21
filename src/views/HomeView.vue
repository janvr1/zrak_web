<template>
  <div class="container">
    <DevicesGrid/>
  </div>
</template>

<script>
// @ is an alias to /src
import DevicesGrid from '@/components/DevicesGrid'

export default {
  name: 'HomeView',
  components: {
    DevicesGrid
  }
}
</script>
