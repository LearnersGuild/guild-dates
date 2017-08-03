import moment from 'moment'

export const momentDayOnly = date => {
  const dayOnly = moment(date)
  if (!dayOnly.isValid()) {
    throw new Error(`${date} is not a valid date`)
  }
  return dayOnly
    .utc()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
}

export const formatDate = date => {
  return moment(date).utc().format('ddd DD MMM YYYY')
}

export const throwsIfInvalidDate = func => {
  return ttt => {
    ttt.plan(1)
    ttt.throws(() => func('xyz'))
  }
}

export const throwsIfInvalidDates = func => {
  return ttt => {
    ttt.plan(2)
    ttt.throws(() => func('xyz', new Date()))
    ttt.throws(() => func(new Date(), 'xyz'))
  }
}
