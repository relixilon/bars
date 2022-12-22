const average = (data) => {
  console.log(data)
  let average = 0
  let sum = 0
  data.map((day) => {
    sum += day.amount
  })
  average = sum / data.length
  return average
}

module.exports = {
  average
}