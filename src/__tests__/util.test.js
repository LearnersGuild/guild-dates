import test from 'tape'

import {momentDayOnly, throwsIfInvalidDate} from '../util'

test('src/util', t => {
  t.test('momentDayOnly', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(momentDayOnly))

    tt.test('returns today if no date is given', ttt => {
      ttt.plan(3)
      const today = new Date()
      const todayMoment = momentDayOnly()
      ttt.equal(todayMoment.year(), today.getFullYear(), 'should be current year')
      ttt.equal(todayMoment.month(), today.getMonth(), 'should be current month')
      ttt.equal(todayMoment.date(), today.getDate(), 'should be current day')
    })

    tt.test('returns given date with 0 for hour, minute, and second', ttt => {
      ttt.plan(6)
      const dayOnly = momentDayOnly('2017-08-01')
      ttt.equal(dayOnly.year(), 2017, 'should return given year')
      ttt.equal(dayOnly.month(), 7, 'should return given month')
      ttt.equal(dayOnly.date(), 1, 'should return given day')
      ttt.equal(dayOnly.hour(), 0, 'should return 0 for hour')
      ttt.equal(dayOnly.minute(), 0, 'should return 0 for minute')
      ttt.equal(dayOnly.second(), 0, 'should return 0 for second')
    })
  })
})
