<template>
  <div id="app">
    <div>
      <a href="#" @click="locateTo('/')">勤怠入力</a>
      <a href="#" @click="locateTo('/userDownTimes')">不稼働時間</a>
    </div>
    <hr/>
    <form>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">不稼働時間</span>
        </div>
        <select-component v-bind:items="userDownTimeMasters" v-bind:initItem="params('id')" />
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">開始時間　</span>
        </div>
        <input type="time" class="form-control" v-model="begin" />
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">終了時間　</span>
        </div>
        <input type="time" class="form-control" v-model="finish" />
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">適用開始日</span>
        </div>
        <input type="date" class="form-control" v-model="applyStart" />
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">適用終了日</span>
        </div>
        <input type="date" class="form-control" v-model="applyEnd" />
      </div>
      <button v-if="!params('id')" class="btn btn-sm btn-primary">登録</button>
      <button v-if="params('id')" class="btn btn-sm btn-primary">更新</button>
    </form>
  </div>
</template>

<script>
import store from '../store/store';
import axios from 'axios'
import ComUtil from '../modules/ComUtil'
import DefaultTime from './DefaultTime.vue'
import Time from '../modules/Time'
import SelectComponent from './SelectComponent'

const API_URL = '/api/v1/attendances.json'

export default {
  name: 'UserDownTimeEditPage',
  components: {
    DefaultTime,
    SelectComponent,
  },

  data() {
    return {
      id: '',
      begin: '',
      finish: '',
      applyStart: '',
      applyEnd: '',
    }
  },

  mounted() {
    // axios
    //   .get(API_URL)
    //   .then(response => {
    //     console.log('axios', response)
    //     this.$store.dispatch('setViewData', { val: this.fillData(response.data.data) })
    //   })
    //   .catch(reason => console.log('error', reason))
    console.log('userDownTimeMasters', this.userDownTimeMasters)
    console.log('userDownTimeId', this.$route.params.id)
    console.log('userDownTime', this.userDownTime)

    if (this.params('id')) {
      const userDownTime = this.userDownTime
      this.begin = new Time(userDownTime.begin).formatTime()
      this.finish = new Time(userDownTime.finish).formatTime()
      this.applyStart = userDownTime.applyStart
      this.applyEnd = userDownTime.applyEnd
    }
  },

  methods: {
    locateTo(path) {
      this.$router.push({ path: path })
    },

    params(key) {
      return this.$route.params[key]
    },

    formatTime(time) {
      return new Time(time).formatTime()
    },

    update(id) {

    },
  },

  computed: {
    userDownTime: {
      get() { return store.getters.userDownTimes[this.$route.params.id] },
      set(val) {
        if (params('id')) {
          store.dispatch('setStoreValue', { colName: ['userDownTimes', params('id')], val })
        }
        else {
          store.getters.userDownTimes
        }
      }
    },

    userDownTimeMasters() {
      return store.getters.storeValue({ colName: ['userDownTimeMasters'] })
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
