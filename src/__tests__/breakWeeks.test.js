import test from 'tape'

import {
  momentDayOnly,
  throwsIfInvalidDate,
} from '../util'

import {
  summerBreakWeekMonday,
  summerBreakWeekDays,
  winterBreakWeekMonday,
  winterBreakWeekDays,
  isDuringBreakWeek,
} from '../breakWeeks'

test('src/breakWeeks', t => {
  t.test('summerBreakWeekMonday', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(summerBreakWeekMonday))

    tt.test('returns 2017-06-12 if given date is before that', ttt => {
      ttt.plan(1)
      const mon = summerBreakWeekMonday('2017-02-27')
      const expected = momentDayOnly('2017-06-12')
      ttt.true(momentDayOnly(mon).isSame(expected), 'should be 2017-06-12')
    })

    tt.test('returns Monday of last fully-contained week in June', ttt => {
      ttt.plan(1)
      const mon = summerBreakWeekMonday('2020-01-06')
      const expected = momentDayOnly('2020-06-22')
      ttt.true(momentDayOnly(mon).isSame(expected), 'should be the Monday of the last fully-contained week in June')
    })
  })

  t.test('summerBreakWeekDays', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(summerBreakWeekDays))

    tt.test('returns [2017-06-12 .. 2017-16-16] if given date is before that', ttt => {
      ttt.plan(5)
      const days = summerBreakWeekDays('2017-02-27')
      const expected = [
        momentDayOnly('2017-06-12'),
        momentDayOnly('2017-06-13'),
        momentDayOnly('2017-06-14'),
        momentDayOnly('2017-06-15'),
        momentDayOnly('2017-06-16'),
      ]
      days.forEach((day, i) => ttt.true(momentDayOnly(day).isSame(expected[i]), 'should be the week of 2017-06-12'))
    })

    tt.test('returns last fully-contained week in June', ttt => {
      ttt.plan(5)
      const days = summerBreakWeekDays('2018-01-01')
      const expected = [
        momentDayOnly('2018-06-25'),
        momentDayOnly('2018-06-26'),
        momentDayOnly('2018-06-27'),
        momentDayOnly('2018-06-28'),
        momentDayOnly('2018-06-29'),
      ]
      days.forEach((day, i) => ttt.true(momentDayOnly(day).isSame(expected[i]), 'should be the last fully-contained week in June'))
    })
  })

  t.test('winterBreakWeekMonday', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(winterBreakWeekMonday))

    tt.test('returns Monday of last fully-contained week in December', ttt => {
      ttt.plan(1)
      const mon = winterBreakWeekMonday('2016-07-11')
      const expected = momentDayOnly('2016-12-26')
      ttt.true(momentDayOnly(mon).isSame(expected), 'should be the Monday of the last fully-contained week in December')
    })
  })

  t.test('winterBreakWeekDays', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(winterBreakWeekDays))

    tt.test('returns last fully-contained week in December', ttt => {
      ttt.plan(5)
      const days = winterBreakWeekDays('2020-01-06')
      const expected = [
        momentDayOnly('2020-12-21'),
        momentDayOnly('2020-12-22'),
        momentDayOnly('2020-12-23'),
        momentDayOnly('2020-12-24'),
        momentDayOnly('2020-12-25'),
      ]
      days.forEach((day, i) => ttt.true(momentDayOnly(day).isSame(expected[i]), 'should be the last fully-contained week in December'))
    })
  })

  t.test('isDuringBreakWeek', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(isDuringBreakWeek))

    tt.test('returns true if the given date is a holiday', ttt => {
      ttt.plan(2)
      ttt.true(isDuringBreakWeek('2017-12-27'), 'should consider Christmas week to be a break')
      ttt.true(isDuringBreakWeek('2020-06-24'), 'should consider last week of June to be a break')
    })
  })
})
