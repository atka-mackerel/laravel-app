<template>
  <div class="table-wrapper">
    <table class="sticky_table">
      <thead>
        <!-- <tr>
          <th class="date-col">
            日付
          </th><th class="holiday-col">
            休日
          </th><th class="time-col" colspan="2">
            勤務<br/>
            <div class="row">
              <div class="input-group col-6">
                <default-time v-bind:colName="['userDefaultTime', 'begin']" @change="summarizeAll" />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDefaultTime', 'begin'], ['begin'])">↓</button>
                </div>
              </div>
              <div class="input-group col-6">
                <default-time v-bind:colName="['userDefaultTime', 'finish']" @change="summarizeAll" />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDefaultTime', 'finish'], ['finish'])">↓</button>
                </div>
              </div>
            </div>
          </th><th class="time-col" colspan="2"
            v-for="(item, index) in userDownTimes"
            v-bind:key="'udt' + index">
            {{ item.name }}<br/>
            <div class="row">
              <div class="input-group col-6">
                <default-time v-bind:colName="['userDownTimes', index, 'begin']" />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDownTimes', index, 'begin'], ['downTimes', index, 'begin'])">↓</button>
                </div>
              </div>
              <div class="input-group col-6">
                <default-time v-bind:colName="['userDownTimes', index, 'finish']" />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDownTimes', index, 'finish'], ['downTimes', index, 'finish'])">↓</button>
                </div>
              </div>
            </div>
          </th><th class="sum-col">
            稼働時間<br/>
            {{ total.work }}
          </th><th class="sum-col">
            不稼働時間<br/>
            {{ total.down }}
          </th><th class="sum-col">
            実働時間<br/>
            {{ total.actual }}
          </th><th class="sum-col">
            超勤時間<br/>
            {{ total.over }}
          </th>
        </tr> -->
        <tr>
          <th rowspan="2" class="date-col">
            日付
          </th><th rowspan="2" class="holiday-col">
            休日
          </th><th colspan="2" class="time-col">
            <table>
              <tr>
                <th colspan="2">勤務</th>
              </tr>
              <tr>
                <th class="time-col">
                  <div class="input-group">
                    <default-time v-bind:colName="['userDefaultTime', 'begin']" />
                    <div class="input-group-append">
                      <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDefaultTime', 'begin'], ['begin'])">↓</button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="input-group">
                    <default-time v-bind:colName="['userDefaultTime', 'finish']" />
                    <div class="input-group-append">
                      <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDefaultTime', 'finish'], ['finish'])">↓</button>
                    </div>
                  </div>
                </th>
              </tr>
            </table>
          </th><th colspan="2" class="time-col"
            v-for="(item, index) in userDownTimes"
            v-bind:key="'udt' + index">
            <table>
              <tr>
                <th colspan="2">
                  {{ item.name }}
                </th>
              </tr>
              <tr>
                <th>
                  <div class="input-group">
                    <default-time v-bind:colName="['userDownTimes', index, 'begin']" />
                    <div class="input-group-append">
                      <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDownTimes', index, 'begin'], ['downTimes', index, 'begin'])">↓</button>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="input-group">
                    <default-time v-bind:colName="['userDownTimes', index, 'finish']" />
                    <div class="input-group-append">
                      <button class="btn btn-sm btn-secondary btn-row-height" @click="setTimes(['userDownTimes', index, 'finish'], ['downTimes', index, 'finish'])">↓</button>
                    </div>
                  </div>
                </th>
              </tr>
            </table>
          </th><th class="sum-col">
            稼働時間<br/>
            {{ total.work }}
          </th><th class="sum-col">
            不稼働時間<br/>
            {{ total.down }}
          </th><th class="sum-col">
            実働時間<br/>
            {{ total.actual }}
          </th><th class="sum-col">
            超勤時間<br/>
            {{ total.over }}
          </th>
        </tr>
      </thead>
      <tbody>
        <table-row
          v-for="(item, index) in tableData"
          v-bind:index="index"
          v-bind:key="index" />
      </tbody>
    </table>
  </div>
</template>

<script>
import store from '../store/store';
import TableRow from './TableRow.vue';
import Time from '../modules/Time';
import DefaultTime from './DefaultTime.vue';
import ComUtil from '../modules/ComUtil';

export default {
  name: 'AttendanceTable',
  components: {
    TableRow,
    DefaultTime
  },

  props: {
    userDownTimes: {
      type: Array|Object,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      defaultColName: null
    }
  },

  mounted() {
    console.log('AttendanceTable', 'mounted')
  },

  methods: {
    formatTime(time) {
      return new Time(time).formatTime()
    },

    setTimes(srcPath, targetPath) {
      this.defaultColName = srcPath
      const time = this.srcTime
      this.attendances.forEach((item, index) => {
        if (!item.holiday) {
          this.time = { colName: [index, ...targetPath], time }
        }
      })
    },

    summarizeAll() {
      console.log('summarizeAll')
      this.attendances.forEach((item) => ComUtil.summarizeDaily(item, this.defaultTime))
      ComUtil.summarizeTotal(this.attendances, this.total)
    }
  },

  computed: {
    attendances() {
      return store.getters.attendances
    },

    defaultTime() {
      return store.getters.storeValue({ colName: ['userDefaultTime'] })
    },

    srcTime: {
      get() { return store.getters.time({ colName: this.defaultColName }) },
      set(val) {  },
    },

    time: {
      get() { return store.getters.workTime({ colName: this.defaultColName }) },
      set({ colName, time }) { store.dispatch('setWorkTime', { colName, time }) }
    },

    // total() {
    //   return this.$store.getters.storeValue({ colName: ['total'] })
    // },

    total: {
      get() { return store.getters.storeValue({ colName: ['total'] }) },
      set(val) { store.dispatch('setStoreValue', { colName: ['total'], val }) }
    },

    totalWork() {
      return this.total.work
    },

    totalDown() {
      console.log('totalDown', JSON.stringify(this.total))
      return this.total['down']
    },

    totalActual() {
      return this.total.actual
    },
  }
}
</script>

<style>
p {
  font-size: 2em;
  text-align: center;
}

.table-wrapper {
  /* max-width: 700px; */
  overflow: scroll;
  height: calc(100vh - 240px);
}

.table-wrapper > table {
  position: relative;
  border: 1px solid #ddd;
  border-collapse: collapse;
  text-align: center;
}

.table-wrapper > table > thead > tr > td, th {
  white-space: nowrap;
  border: 1px solid #ddd;
  padding: 5px;
  text-align: center;
}

.table-wrapper > table > thead > tr > th {
  background-color: #eee;
  position: sticky;
  top: -1px;
  z-index: 2;
}

.table-wrapper > table > thead > tr > th:first-of-type {
  left: 0;
  z-index: 3;
}

.table-wrapper > table > tbody > tr td:first-of-type,
.table-wrapper > table > tbody > tr td:nth-of-type(2) {
  background-color: #eee;
  position: sticky;
  left: -1px;
  text-align: left;
}

/* .time-col {
  width: 250px;
}
.date-col {
  width: 90px;
}
.holiday-col {
  width: 40px;
}
.sum-col {
  width: 85px;
} */

.row, .input-group {
  flex-wrap: nowrap !important;
}

.col-6 {
  padding: 2px;
}

/* .row {
  margin-left: 0px;
} */
</style>
