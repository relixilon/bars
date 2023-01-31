const getWeekDay = (date) => {
  const a = new Date(date)
  return a.getDay()

}

const average = (cajas) => {
  const sum = cajas.reduce((a, b) => a + b, 0);
  const average = (sum / cajas.length) || 0
  return average
}

const getCajas = (days) => {
  const cajas = []
  days.map((day =>
    cajas.push(day.amounts.find(item => item.label === 'Caja').value ? day.amounts.find(item => item.label === 'Caja').value : 0)
  ))
  return cajas
}

const dashboard = (days) => {
  const dash = []
  const week = [
    { weekDay: 'Sunday', days: [] },
    { weekDay: 'Monday', days: [] },
    { weekDay: 'Tuesday', days: [] },
    { weekDay: 'Wednesday', days: [] },
    { weekDay: 'Thursday', days: [] },
    { weekDay: 'Friday', days: [] },
    { weekDay: 'Saturday', days: [] }
  ]
  days.map(day => {
    week[getWeekDay(day.date)].days.push(day)
  })
  week.map(day => {
    cajas = getCajas(day.days)
    dash.push({
      weekDay: day.weekDay,
      average: Math.round(average(cajas)),
      max: Math.max(...cajas),
      min: Math.min(...cajas)
    })
  })
  return dash
}

module.exports = {
  dashboard
}