<template>
  <div class="input-group">
    <time-input mode="hour" v-bind:colName="colName" v-bind:index="index" class="time-input form-control" />
    <div class="input-group-prepend input-group-append">
      <span class="time-separator input-group-text">:</span>
    </div>
    <time-input mode="minute" v-bind:colName="colName" v-bind:index="index" class="time-input form-control" />
    <input type="time" v-on:change="changeValue" />
  </div>
</template>

<script>
import TimeInput from './TimeInput.vue';

export default {
  name: 'TimeInputGroup',
  components: {
    TimeInput
  },

  props: {
    index: {
      type: Number,
      required: true
    },
    colName: {
      type: String,
      required: true
    }
  },

  mounted() {
    console.log('TimeInputGroup', 'mounted')
  },

  methods: {
    changeValue(e) {
    }
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
