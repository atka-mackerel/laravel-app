<template>
  <div id="app">
    <div>
      <a href="#" @click="locateTo('/')">勤怠入力</a>
    </div>
    <hr/>
    <form>
      <button class="btn btn-sm btn-primary" @click="locateTo('/userDownTimes/new')">追加</button>
      <table class="table">
        <thead>
          <tr>
            <th>名称</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>適用開始日</th>
            <th>適用終了日</th>
            <th colspan="2"> </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in userDownTimes"
            v-bind:key="index">
            <td>{{ item.name }}</td>
            <td>{{ formatTime(item.begin) }}</td>
            <td>{{ formatTime(item.finish) }}</td>
            <td>{{ item.applyStart }}</td>
            <td>{{ item.applyEnd }}</td>
            <td><button class="btn btn-sm btn-outline-primary" @click="locateTo(`/userDownTimes/edit/${index}`)">編集</button></td>
            <td><button class="btn btn-sm btn-outline-danger">削除</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import store from '../store/store';
import axios from 'axios'
import ComUtil from '../modules/ComUtil'
import DefaultTime from './DefaultTime.vue'
import Time from '../modules/Time'

const API_URL = '/api/v1/attendances.json'

export default {
  name: 'UserDownTimeIndexPage',
  components: {
    DefaultTime
  },

  mounted() {
    // axios
    //   .get(API_URL)
    //   .then(response => {
    //     console.log('axios', response)
    //     this.$store.dispatch('setViewData', { val: this.fillData(response.data.data) })
    //   })
    //   .catch(reason => console.log('error', reason))
  },

  methods: {
    locateTo(path) {
      this.$router.push({ path: path })
    },

    formatTime(time) {
      return new Time(time).formatTime()
    },
  },

  computed: {
    userDownTimes() {
      return store.getters.userDownTimes
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
