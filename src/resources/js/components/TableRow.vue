<template>
  <tr v-bind:class="{ holiday: attendance.holiday }">
    <td class="date-col">
      {{ date }}
    </td><td class="holiday-col">
      <input type="checkbox" v-model="holiday" />
    </td><td class="time-col">
        <time-input v-bind:colName="[index, 'begin']"></time-input>
    </td><td class="time-col">
        <time-input v-bind:colName="[index, 'finish']"></time-input>
    </td><td class="time-col"
      v-for="(item, forIndex) in userDownTimes"
      v-bind:key="forIndex">
        <time-input v-if="isDownTimeApplied(item[0][1])" v-bind:colName="[index, 'downTimes', item[0][0], item[1]]" />
    </td><td class="sum-col">
      {{ sum.work }}
    </td><td class="sum-col">
      {{ sum.down }}
    </td><td class="sum-col">
      {{ sum.actual }}
    </td><td class="sum-col">
      {{ sum.over }}
    </td>
  </tr>
</template>

<script>
import store from '../store/store';
import TimeInput from './TimeInput.vue';
import Time from '../modules/Time'
import moment from 'moment'
import 'moment/locale/ja'

export default {
  name: 'TableRow',
  components: {
    TimeInput
  },

  props: {
    index: {
      type: Number,
      required: true
    }
  },

  mounted() {
    // console.log('TableRow', this.$props)
    console.log('TableRow', 'mounted')
  },

  methods: {
    isDownTimeApplied(item) {
      return this.attendance.date >= item.applyStart && this.attendance.date <= item.applyEnd
    }
  },

  computed: {
    userDownTimes() {
      const userDownTimes = store.getters.userDownTimes
      return userDownTimes
        ? Object.entries(userDownTimes).reduce((o, c) => [...o, [c, 'begin'], [c, 'finish']], [])
        : {}
    },

    downTimes() {
      return store.getters.attendances[this.index].downTimes
    },

    attendance() {
      return store.getters.attendances[this.index]
    },

    date() {
      return moment(this.attendance.date).format('MM/DD(ddd)')
    },

    sum() {
      return this.attendance.summaries
    },

    workSum() {
      return this.attendance.summaries.work
    },

    downSum() {
      return this.attendance.summaries.down
    },

    actualSum() {
      return this.attendance.summaries.actual
    },

    holiday: {
      get() { return this.attendance.holiday },
      set(val) { store.dispatch('setStoreValue', { colName: ['attendances', this.index, 'holiday'], val }) }
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}

.holiday {
  background-color: #fdd3d3;
}

td {
  white-space: nowrap;
  border: 1px solid #ddd;
  padding: 5px;
  text-align: center;
}

th {
  background-color: #eee;
  position: sticky;
  top: -1px;
  z-index: 2;
}

th:first-of-type {
  left: 0;
  z-index: 3;
}

tbody tr td:first-of-type {
  background-color: #eee;
  position: sticky;
  left: -1px;
  text-align: left;
  z-index: 2;
}

</style>
