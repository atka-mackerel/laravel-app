import Time from "./Time"

export default class ComUtil {
  constructor() {
  }

  static summarizeDaily(attendance, defaultTime) {
    const work = Math.max(
      Time.minuteValue(attendance.finish) > Time.minuteValue(attendance.begin)
        ? Time.minuteValue(attendance.finish) - Time.minuteValue(attendance.begin)
        : 0
        , 0)

    const down = Object.entries(attendance.downTimes)
      .reduce((sum, item) => {
        if (Time.minuteValue(attendance.begin) <= Time.minuteValue(item[1].finish) &&
            Time.minuteValue(attendance.finish) >= Time.minuteValue(item[1].begin)) {
          sum += (Math.min(Time.minuteValue(attendance.finish), Time.minuteValue(item[1].finish)) - 
                  Math.max(Time.minuteValue(attendance.begin), Time.minuteValue(item[1].begin)))
        }
        return sum
      }, 0)

    const defaultWork = Math.max(
      Time.minuteValue(defaultTime.finish) > Time.minuteValue(defaultTime.begin) && Time.minuteValue(attendance.finish) > 0
        ? Time.minuteValue(defaultTime.finish) - Time.minuteValue(defaultTime.begin)
        : 0
        , 0)
    console.log('defaultWork', defaultWork)

    const defaultDown = Object.entries(attendance.downTimes)
      .reduce((sum, item) => {
        if (Time.minuteValue(defaultTime.begin) <= Time.minuteValue(item[1].finish) &&
            Time.minuteValue(defaultTime.finish) >= Time.minuteValue(item[1].begin)) {
          sum += (Math.min(Time.minuteValue(defaultTime.finish), Time.minuteValue(item[1].finish)) - 
                  Math.max(Time.minuteValue(defaultTime.begin), Time.minuteValue(item[1].begin)))
        }
        return sum
      }, 0)

    const actual = Math.max(work - down, 0)
    const defaultActual = Math.max(defaultWork - defaultDown, 0)
    console.log('over', defaultActual)

    attendance.summaries.work = Time.minToTime(work).formatTime()
    attendance.summaries.down = Time.minToTime(down).formatTime()
    attendance.summaries.actual = Time.minToTime(actual).formatTime()
    attendance.summaries.over = Time.minToTime(Math.max(actual - defaultActual, 0)).formatTime()
  }

  static summarizeTotal(attendances, total) {
    const _total = attendances.reduce((o, v) => {
      o.work += Time.minuteValue(v.summaries.work)
      o.down += Time.minuteValue(v.summaries.down)
      o.actual += Time.minuteValue(v.summaries.actual)
      o.over += Time.minuteValue(v.summaries.over)
      return o
    }, { work: 0, down: 0, actual: 0, over: 0 })

    total.work = Time.minToTime(_total.work).formatTime()
    total.down = Time.minToTime(_total.down).formatTime()
    total.actual = Time.minToTime(_total.actual).formatTime()
    total.over = Time.minToTime(_total.over).formatTime()
    console.log('Util total', JSON.stringify(total))
  }

  static formToJson(form) {
      return Array.prototype.reduce.call(
          form.querySelectorAll(`input`), 
          (o, el) => (o[el.name] = el.value, o), {});
  }

  static formToQuery(form) {
    return Array.prototype.map
      .call(form.querySelectorAll(`input`), e => `${e.name}=${e.value}`)
      .join('&')
  }
}