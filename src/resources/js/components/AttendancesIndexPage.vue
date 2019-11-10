<template>
  <div>
    <div>
      <!-- <a href="#" @click="locateTo('/userDownTimes')">不稼働時間登録</a> -->
      <a href="#">不稼働時間登録</a>
    </div>
    <hr/>
    <form id="search_form">
      <div class="input-group">
        <input type="date" name="date_range_start" class="form-control" v-model="rangeStart" />
        <div class="input-group-prepend input-group-append">
          <span class="input-group-text">～</span>
         </div>
        <input type="date" name="date_range_end" class="form-control" v-model="rangeEnd" />
      </div>
      <button class="btn btn-sm btn-primary" @click="onClickSearchButton">検索</button>
      <button class="btn btn-sm btn-primary" @click="register">登録</button>
    </form>
    <attendance-table v-bind:tableData="attendances" v-bind:userDownTimes="userDownTimes"></attendance-table>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/store'
import AttendanceTable from './AttendanceTable.vue'
import Time from '../modules/Time'
import ComUtil from '../modules/ComUtil'
import DefaultTime from './DefaultTime.vue'

const API_URL = '/api/attendances'

export default {
  name: 'AttendancesIndexPage',
  components: {
    AttendanceTable,
    DefaultTime
  },

  mounted() {
    console.log('AttendancesIndexPage', 'mounted')
    this.search()
  },

  methods: {
    // locateTo(path) {
    //   this.$router.push({ path: path })
    // },

    fillData({ attendances, userDownTimes, userDefaultTime, userDownTimeMasters }) {
      attendances = attendances.map(item => {
        const downTimes = item.downTimes
        for (let key in userDownTimes) {
          if (item.date >= userDownTimes[key].applyStart && item.date <= userDownTimes[key].applyEnd) {
            if (!(key in downTimes)) {
              downTimes[key] = {
                id: null,
                begin: new Time().getTime(),
                finish: new Time().getTime(),
              }
            }
            downTimes[key].change = false
          }
        }

        item.change = false

        item.summaries = {
          work: '',
          down: '',
          actual: ''
        }
        ComUtil.summarizeDaily(item, userDefaultTime)

        return item
      })

      userDefaultTime = userDefaultTime || {
        begin: new Time().getTime(),
        finish: new Time().getTime(),
      }
      userDefaultTime.change = false

      ComUtil.summarizeTotal(attendances, this.total)

      return { attendances, userDownTimes, userDefaultTime, userDownTimeMasters }
    },

    onClickSearchButton(e) {
      const form = document.getElementById('search_form')
      this.search(form.date_range_start.value, form.date_range_end.value)
      e.preventDefault()
    },

    search(rangeStart = this.rangeStart, rangeEnd = this.rangeEnd) {
      axios
        .get(API_URL,
        {
            params: { date_range_start: rangeStart, date_range_end: rangeEnd },
            headers: {
                'Authorization': `Bearer ${Laravel.apiToken}`,
                'Accept': 'application/json',
            },
        })
        .then(response => {
          console.log('axios', response)
        //   this.$store.dispatch('setViewData', { val: this.fillData(response.data.data) })
          store.dispatch('setViewData', { val: this.fillData(response.data.data) })
        })
        .catch(reason => console.log('error', reason))
    },

    register() {
      axios
        .put(API_URL, { data: this.filteredData() })
        .then(response => {
          console.log('axios', response)
          this.search()
        })
        .catch(reason => console.log('error', reason))
    },

    filteredData() {
      const state = JSON.parse(JSON.stringify(this.state))
      state.attendances = state.attendances.filter((item) => {
        let downTimeChanged = false
        const downTimes = {}
        for (let key in item.downTimes) {
          const downTime = item.downTimes[key]
          if (downTime.change) {
            downTimes[key] = downTime
            downTimeChanged = true
          }
        }
        item.downTimes = downTimes

        return item.change || downTimeChanged
      })

      return state
    },

    afterRegister() {
      this.state.attendances.forEach((item) => {
        item.change = false
        for (let key in item.downTimes) {
          item.downTimes[key].change = false
        }
      })
    }
  },

  computed: {
    state() {
    //   return this.$store.getters.state
      return store.getters.state
    },

    userDefaultTime() {
    //   return this.$store.getters.defaultTime
      return store.getters.defaultTime
    },
    userDownTimes() {
    //   return this.$store.getters.userDownTimes
      return store.getters.userDownTimes
    },
    attendances() {
    //   return this.$store.getters.attendances
      return store.getters.attendances
    },

    searchCond() {
    //   return this.$store.getters.storeValue({ colName: ['searchCond'] })
      return store.getters.storeValue({ colName: ['searchCond'] })
    },

    rangeStart: {
    //   get() { return this.$store.getters.storeValue({ colName: ['searchCond', 'rangeStart'] }) },
    //   set(val) { this.$store.dispatch('setStoreValue', { colName: ['searchCond', 'rangeStart'], val }) }
      get() { return store.getters.storeValue({ colName: ['searchCond', 'rangeStart'] }) },
      set(val) { store.dispatch('setStoreValue', { colName: ['searchCond', 'rangeStart'], val }) }
    },

    rangeEnd: {
    //   get() { return this.$store.getters.storeValue({ colName: ['searchCond', 'rangeEnd'] }) },
    //   set(val) { this.$store.dispatch('setStoreValue', { colName: ['searchCond', 'rangeEnd'], val }) }
      get() { return store.getters.storeValue({ colName: ['searchCond', 'rangeEnd'] }) },
      set(val) { store.dispatch('setStoreValue', { colName: ['searchCond', 'rangeEnd'], val }) }
    },

    total: {
    //   get() { return this.$store.getters.storeValue({ colName: ['total'] }) },
    //   set(val) { this.$store.dispatch('setStoreValue', { colName: ['total'], val }) }
      get() { return store.getters.storeValue({ colName: ['total'] }) },
      set(val) { store.dispatch('setStoreValue', { colName: ['total'], val }) }
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
