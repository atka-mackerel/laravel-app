<template>
  <input type="time" v-model="time" class="form-control-sm" @change="$emit('change')" />
</template>

<script>
import store from '../store/store';

export default {
  name: 'DefaultTime',
  components: {
  },

  props: {
    colName: {
      type: Array,
      required: true
    }
  },

  mounted() {
    console.log('DefaultTime', 'mounted')
  },

  computed: {
    time: {
      get() { return store.getters.time({ colName: this.colName }) },
      set(val) { store.dispatch('setTime', { colName: this.colName, time: val }) }
    },
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
