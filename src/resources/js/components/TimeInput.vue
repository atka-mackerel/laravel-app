<template>
  <div class="d-inline-flex">
    <input type="time" class="" v-model="time" />
  </div>
</template>

<script>
import store from '../store/store';
import axios from 'axios'

const MODE_HOUR = 'hour'
const MODE_MINUTE = 'minute'
const API_URL = '/api/v1/attendances'

export default {
  name: 'TimeInput',
  components: {
  },

  props: {
    colName: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      oldValue: null
    }
  },

  mounted() {
    // console.log('colName', this.colName)
    console.log('TimeInput', 'mounted')
    this.oldValue = this.time
  },

  methods: {
    update() {
      const value = this.time
      // console.log('update', value)
      if (value == this.oldValue) {
        return
      }
      this.oldValue = value

      let url
      let request
      let params
      const attendanceId = this.attendanceId

      if (this.colName.length == 2) {
        // Attendance
        url = `${API_URL}/${attendanceId || ''}`
        params = {
          date: this.attendance.date,
          col: this.colName.slice(-1)[0],
          val: value
        }
        request = attendanceId ? axios.put(url, params) : axios.post(url, params)
        request.then(response => {
          console.log('axios', response)
          this.attendanceId = response.data.attendance_id
        })
        .catch(reason => console.log('error', reason))
      } else if (this.colName.length == 4) {
        // DayDownTime
        const dayDownTimeId = this.downTimeId
        url = `${API_URL}/${attendanceId || '0'}/day_down_times/${dayDownTimeId || ''}`
        params = {
          date: this.attendance.date,
          user_down_time_id: this.colName[2],
          col: this.colName.slice(-1)[0],
          val: value
        }
        request = dayDownTimeId ? axios.put(url, params) : axios.post(url, params)
        request.then(response => {
          console.log('axios', response)
          this.attendanceId = response.data.attendance_id
          this.downTimeId = response.data.day_down_time_id
        })
        .catch(reason => console.log('error', reason))
      }

    }
  },

  computed: {
    time: {
      get() {
        // console.log('computed time get', this.$store.getters.time({ colName: this.colName }) )
        return store.getters.workTime({ colName: this.colName })
      },
      set(val) {
        // console.log('computed time set', { val: val, colName: this.colName })
        store.dispatch('setWorkTime', { colName: this.colName, time: val })
      }
    },

    attendance() {
      return store.getters.storeValue({ colName: ['attendances', this.colName[0]] })
    },

    downTimeId: {
      get() { return store.getters.storeValue({ colName: ['attendances', ...this.colName.slice(0, -1)] }).id },
      set(val) { store.dispatch('setStoreValue', { colName: ['attendances', ...this.colName.slice(0, -1), 'id'], val }) }
    },

    attendanceId: {
      get() { return store.getters.storeValue({ colName: ['attendances', this.colName[0]] }).id },
      set(val) { store.dispatch('setStoreValue', { colName: ['attendances', this.colName[0], 'id'], val }) }
    },
  },

}
</script>

<style scoped>
input {
  border-style: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
  text-align: center;
  background-color: #FFFFFF;
}

.holiday input {
  background-color: #fdd3d3;
}

</style>
