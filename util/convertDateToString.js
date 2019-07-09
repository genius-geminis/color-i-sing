export const convertDateToString = date => {
  let slicedDate = date.slice(0, 10)
  let [day, month, year] = slicedDate.split('-')
  return new Date(day, month - 1, year).toDateString()
}
