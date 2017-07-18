import test from 'tape'

import {momentDayOnly, throwsIfInvalidDate} from '../util'

import {
  nextStartDate,
  expectedExitDate,
  isaCancellationDate,
} from '../programDates'

test('src/programDates', t => {
  t.test('nextStartDate', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(nextStartDate))

    tt.test('returns the legacy start date if before 2017-05-08', ttt => {
      ttt.plan(1)
      const sd = nextStartDate('2017-04-12')
      const expected = momentDayOnly('2017-04-17')
      ttt.true(momentDayOnly(sd).isSame(expected), 'should be 2017-04-17')
    })

    tt.test('returns first Monday of next month if not a holiday', ttt => {
      ttt.plan(1)
      const sd = nextStartDate('2017-09-15')
      const expected = momentDayOnly('2017-10-02')
      ttt.true(momentDayOnly(sd).isSame(expected), 'should be first Monday of next month')
    })

    tt.test('returns first Tuesday of next month if first Monday falls on a holiday', ttt => {
      ttt.plan(1)
      const sd = nextStartDate('2017-08-15')
      const expected = momentDayOnly('2017-09-05')
      ttt.true(momentDayOnly(sd).isSame(expected), 'should be first Tuesday of next month')
    })
  })

  t.test('expectedExitDate', tt => {
    tt.test('throws if the given start date is not a date', ttt => {
      ttt.plan(1)
      ttt.throws(() => expectedExitDate('xyz'))
    })

    tt.test('returns Friday of (startDate + 41 weeks) if 1 break week is encountered', ttt => {
      ttt.plan(1)
      const exit = expectedExitDate(new Date('2016-07-11'))
      ttt.true(momentDayOnly(exit).isSame('2017-04-28', 'day'), 'should be Friday of 41st week')
    })

    tt.test('returns Friday of (startDate + 42 weeks) if both break weeks are encountered', ttt => {
      ttt.plan(1)
      const exit = expectedExitDate(new Date('2017-05-08'))
      ttt.true(momentDayOnly(exit).isSame('2018-03-02', 'day'), 'should be Friday of 42nd week')
    })
  })

  t.test('isaCancellationDate', tt => {
    tt.test('throws if the given start date is not a date', ttt => {
      ttt.plan(1)
      ttt.throws(() => isaCancellationDate('xyz'))
    })

    tt.test('returns Monday of (startDate + 6) weeks if no break weeks are encountered', ttt => {
      ttt.plan(1)
      const cancel = isaCancellationDate(new Date('2017-02-06'))
      ttt.true(momentDayOnly(cancel).isSame('2017-03-13'), 'should be Monday of 6th week')
    })

    tt.test('returns Monday of (startDate + 7) weeks if a break week is encountered', ttt => {
      ttt.plan(1)
      const cancel = isaCancellationDate(new Date('2017-12-04'))
      ttt.true(momentDayOnly(cancel).isSame('2018-01-15'), 'should be Monday of 6th week')
    })
  })
})
