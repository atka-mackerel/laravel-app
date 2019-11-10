<template>
  <select v-model="selectedItem" class="form-control">
    <option
      v-for="(option) in items"
      v-bind:key="option.id"
      v-bind:value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script>

export default {
  name: 'SelectComponent',
  components: {
  },

  props: {
    initItem: {
      type: String,
      required: false
    },
    items: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      selectedItem: this.initItem
    }
  },

  mounted() {
    console.log('initItem', this.initItem)
  },

  computed: {

  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
