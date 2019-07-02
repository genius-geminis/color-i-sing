export const makeDate = date => {
  let slicedDate = date.slice(0, 10)
  let dateArr = slicedDate.split('-')
  let newDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
  return newDate.toDateString()
}
