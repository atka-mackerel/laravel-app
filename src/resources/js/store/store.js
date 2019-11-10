import Vue from 'vue'
import Vuex from 'vuex'
import Time from '../modules/Time'
import ComUtil from '../modules/ComUtil'
import moment from 'moment'

Vue.use(Vuex)

const getValue = (obj, columns) => {
  return columns.reduce((o, c) => o ? o[c] : o, obj)
}

const setValue = (obj, columns, val) => {
  console.log('setValue', JSON.stringify(columns))
  columns.reduce((o, c, i) => {
    if (o !== undefined) {
      // console.log('setValue', JSON.stringify(o))
      return i < columns.length - 1 ? o[c] : o[c] = val
    }
  }, obj)
}

const store = new Vuex.Store({

  state: {
    debug: true,
    searchCond: {
      rangeStart: moment().startOf('month').format('YYYY-MM-DD'),
      rangeEnd: moment().endOf('month').format('YYYY-MM-DD'),
    },
    userDownTimes: {},
    userDownTimeEdit: {},
    userDownTimeMasters: [],
    userDefaultTime: {
      begin: {
        hour: null,
        minute: null,
      },
      finish: {
        hour: null,
        minute: null,
      },
    },
    attendances: [],
    summaries: {
      work: '00:00',
      down: '00:00',
      actual: '00:00',
      over: '00:00',
    },
    total: {
      work: '00:00',
      down: '00:00',
      atcual: '00:00',
      over: '00:00',
    }
  },

  getters: {
    state(state) {
      return state
    },

    userDownTimes(state) {
      // if (state.debug) console.log('userDownTimes')
      return state.userDownTimes
    },

    attendances(state) {
      // if (state.debug) console.log('attendances')
      return state.attendances
    },

    attendance: (state) => ({ index }) => {
      return state.attendances[index]
    },

    hour: (state) => ({ colName }) => {
      return new Time(getValue(state.attendances, colName)).formatHour()
    },

    minute: (state) => ({ colName }) => {
      return new Time(getValue(state.attendances, colName)).formatMinute()
    },

    workTime: (state) => ({ colName }) => {
      // if (state.debug) console.log('getter time', getValue(state.attendances, colName))
      // if (state.debug) console.log('getter time', new Time(getValue(state.attendances, colName)).formatTime())
      return new Time(getValue(state.attendances, colName)).formatTime()
    },

    time: (state) => ({ colName }) => {
      // console.log('getter default time', colName)
      return new Time(getValue(state, colName)).formatTime()
    },

    storeValue: (state) => ({ colName }) => {
      // console.log('sotreValue', getValue(state, colName))
      return getValue(state, colName)
    },

    formatTime: (state) => ({ time }) => {
      // console.log('getter formatTime', time)
      return new Time(time).formatTime()
    },

  },

  mutations: {
    setUserDownTimes(state, { val }) {
      // console.log('mutations setUserDownTimes', state)
      state.userDownTimes = val
    },

    setAttendances(state, { val }) {
      // console.log('mutations setAttendances', state)
      state.attendances = val
    },

    setViewData(state, { val }) {
      // console.log('mutations setAttendances', state)
      state.attendances = val.attendances
      state.userDownTimes = val.userDownTimes
      state.userDefaultTime = val.userDefaultTime
      state.userDownTimeMasters = val.userDownTimeMasters
    },

    setWorkTime(state, { colName, time }) {
      // console.log('mutations setTime', colName)
      const targetTime = getValue(state.attendances, colName)
      if (!targetTime) {
        return
      }
      // console.log('setTime time', JSON.stringify(time))
      // console.log('setTime colName', JSON.stringify(colName))
      // console.log('setTime', JSON.stringify(getValue(state.attendances, colName)))
      const srcTime = new Time(time)
      targetTime.hour = srcTime.getHour()
      targetTime.minute = srcTime.getMinute()
      ComUtil.summarizeDaily(state.attendances[colName[0]], state.userDefaultTime)
      ComUtil.summarizeTotal(state.attendances, state.total)

      setValue(state.attendances, [...colName.slice(0, -1), 'change'], true)
    },

    setTime(state, { colName, time }) {
      const targetTime = getValue(state, colName)
      if (!targetTime) {
        return
      }
      const srcTime = new Time(time)
      targetTime.hour = srcTime.getHour()
      targetTime.minute = srcTime.getMinute()
    },

    setStoreValue(state, { colName, val }) {
      // console.log('setStoreValue', JSON.stringify(colName))
      setValue(state, colName, val)
      console.log('setStoreValue', JSON.stringify([...colName.slice(0, -1), 'change']))
      setValue(state, [...colName.slice(0, -1), 'change'], true)
    },

    setHoliday(state, { colName, holiday }) {
      // console.log('setHoliday', holiday)
      setValue(state.attendances, colName, holiday)
    }
  },

  actions: {
    setUserDownTimes({ commit }, payload) {
      // console.log('actions setUserDownTimes', payload)
      commit('setUserDownTimes', payload)
    },

    setAttendances({ commit }, payload) {
      // console.log('actions setAttendances', payload)
      commit('setAttendances', payload)
    },

    setViewData({ commit }, payload) {
      // console.log('actions setAttendances', payload)
      commit('setViewData', payload)
    },

    setWorkTime({ commit }, payload) {
      // console.log('actions setTime', payload)
      commit('setWorkTime', payload)
    },

    setTime({ commit }, payload) {
      // console.log('actions setTime', payload)
      commit('setTime', payload)
    },

    setStoreValue({ commit }, payload) {
      // console.log('actions setTime', payload)
      commit('setStoreValue', payload)
    },

    setHoliday({ commit }, payload) {
      // console.log('actions setTime', payload)
      commit('setHoliday', payload)
    }
  }

});

export default store
