import {  isNull, isNullOrUndefined } from "util"

export default class Time {
  constructor(time) {
    if (time) {
      if (typeof time == 'string') {
        const timePart = time.split(':')
        this.time = {
          hour: timePart[0],
          minute: timePart[1],
        }
      }
      else {
        this.time = time
      }
    }

    this.parseInt = (val) => {
      // console.log('parseInt', val)
      return isNullOrUndefined(val) ? null : parseInt(val)
    }

    this.padding = (val, len, pad) => {
      if (val.length >= len) {
        return val
      }
      return (pad.slice(0, 1).repeat(len) + val).slice(-len)
    }

    this.padZero = (val, len) => {
      return this.padding(val, len, '0')
    }
  }

  getTime() {
    return this.time ? this.time : this.time = { hour: null, minute: null }
  }

  getHour() {
    return this.parseInt(this.getTime().hour)
  }

  setHour(hour) {
    this.getTime().hour = hour
  }

  getMinute() {
    return this.parseInt(this.getTime().minute)
  }

  setMinute(minute) {
    this.getTime().minute = minute
  }

  formatHour() {
    return this.getHour() >= 0 ? this.padZero(this.getHour().toString(10), 2) : null
  }

  formatMinute() {
    return this.getMinute() >= 0 ? this.padZero(this.getMinute().toString(10), 2) : null
  }

  formatTime() {
    // console.log('Time formatTime', this.getHour())
    return !isNull(this.getHour()) && !isNull(this.getMinute()) ?
      `${this.padZero(this.getHour().toString(10), 2)}:${this.padZero(this.getMinute().toString(10), 2)}` : null
  }

  minuteValue() {
    return this.getHour() >= 0 && this.getMinute() >= 0 ? this.getHour() * 60 + this.getMinute() : 0
  }

  static minuteValue(time) {
    return new Time(time).minuteValue()
  }

  static minToTime(min) {
    return new Time({
      hour: Math.floor(parseInt(min) / 60),
      minute: parseInt(min) % 60
    })
  }

}