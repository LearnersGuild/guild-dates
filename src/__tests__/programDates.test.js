import test from 'tape'

import {
  momentDayOnly,
  throwsIfInvalidDate,
  throwsIfInvalidDates,
} from '../util'

import {
  nextStartDate,
  expectedExitDate,
  closedDaysBetween,
  openDaysBetween,
  isaCancellationDate,
  isaSessionStartDate,
  isaSessionEndDate,
  isaSessionStartDates,
  numDaysInISASession,
  stipendPaymentDatesBetween,
} from '../programDates'

test('src/programDates', t => {
  t.test('nextStartDate', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(nextStartDate))

    tt.test('returns the legacy start date if before 2017-05-08', ttt => {
      ttt.plan(1)
      const start = nextStartDate('2017-04-12')
      const expected = momentDayOnly('2017-04-17')
      ttt.true(momentDayOnly(start).isSame(expected), 'should be 2017-04-17')
    })

    tt.test('returns first Monday of next month if not a holiday', ttt => {
      ttt.plan(1)
      const start = nextStartDate('2017-09-15')
      const expected = momentDayOnly('2017-10-02')
      ttt.true(momentDayOnly(start).isSame(expected), 'should be first Monday of next month')
    })

    tt.test('returns first Tuesday of next month if first Monday falls on a holiday', ttt => {
      ttt.plan(1)
      const start = nextStartDate('2017-08-15')
      const expected = momentDayOnly('2017-09-05')
      ttt.true(momentDayOnly(start).isSame(expected), 'should be first Tuesday of next month')
    })
  })

  t.test('expectedExitDate', tt => {
    tt.test('throws if the given start date is not a date', throwsIfInvalidDate(expectedExitDate))

    tt.test('returns Friday of (startDate + 41 weeks) if 1 break week is encountered', ttt => {
      ttt.plan(1)
      const exit = expectedExitDate(new Date('2017-08-07'))
      ttt.true(momentDayOnly(exit).isSame(momentDayOnly('2018-05-18')), 'should be Friday of 41st week')
    })

    tt.test('returns Friday of (startDate + 42 weeks) if both break weeks are encountered', ttt => {
      ttt.plan(1)
      const exit = expectedExitDate(new Date('2017-05-08'))
      ttt.true(momentDayOnly(exit).isSame(momentDayOnly('2018-02-23')), 'should be Friday of 42nd week')
    })
  })

  t.test('closedDaysBetween', tt => {
    tt.test('throws if the given dates are not dates', throwsIfInvalidDates(closedDaysBetween))

    tt.test('returns the holidays and break week days between two dates', ttt => {
      ttt.plan(1)
      const closedDays = closedDaysBetween(momentDayOnly('2017-11-20'), momentDayOnly('2017-12-31'))
      ttt.equal(closedDays.length, 7, 'should include Thanksgiving and Christmas break days')
    })

    tt.test('should include the special 2017-07-03 holiday', ttt => {
      ttt.plan(1)
      const closedDays = closedDaysBetween(momentDayOnly('2017-05-22'), momentDayOnly('2017-07-21'))
      ttt.equal(closedDays.length, 8, 'should include Thanksgiving and Christmas break days')
    })
  })

  t.test('openDaysBetween', tt => {
    tt.test('throws if the given dates are not dates', throwsIfInvalidDates(closedDaysBetween))

    tt.test('returns the days the guild is open without holidays', ttt => {
      ttt.plan(1)
      const openDays = openDaysBetween(momentDayOnly('2017-12-25'), momentDayOnly('2018-01-04'))
      ttt.equal(openDays.length, 3, 'should not include Christmas break days or New Years Day')
    })

    tt.test('should not include the special 2017-07-03 holiday', ttt => {
      ttt.plan(1)
      const openDays = openDaysBetween(momentDayOnly('2017-05-22'), momentDayOnly('2017-07-21'))
      ttt.equal(openDays.length, 37, 'should not include summer break or holidays')
    })
  })

  t.test('isaCancellationDate', tt => {
    tt.test('throws if the given start date is not a date', throwsIfInvalidDate(isaCancellationDate))

    tt.test('returns Monday of (startDate + 6) weeks if no break weeks are encountered', ttt => {
      ttt.plan(1)
      const cancel = isaCancellationDate(new Date('2017-02-06'))
      ttt.true(momentDayOnly(cancel).isSame(momentDayOnly('2017-03-13')), 'should be Monday of 6th week')
    })

    tt.test('returns Monday of (startDate + 7) weeks if a break week is encountered', ttt => {
      ttt.plan(1)
      const cancel = isaCancellationDate(new Date('2017-12-04'))
      ttt.true(momentDayOnly(cancel).isSame(momentDayOnly('2018-01-15')), 'should be Monday of 6th week')
    })
  })

  t.test('isaSessionStartDate', tt => {
    tt.test('throws if the given start date is not a date', throwsIfInvalidDate(isaSessionStartDate))

    tt.test('returns the start date of the session (0 indexed) for a given program start date', ttt => {
      ttt.plan(3)
      ttt.true(momentDayOnly(isaSessionStartDate(new Date('2016-11-28'), 0)).isSame(momentDayOnly('2016-11-28')), 'should be Monday of 1st week, not counting break weeks')
      ttt.true(momentDayOnly(isaSessionStartDate(new Date('2016-11-28'), 2)).isSame(momentDayOnly('2017-03-27')), 'should be Monday of 24th week, not counting break weeks')
      ttt.true(momentDayOnly(isaSessionStartDate(new Date('2016-11-28'), 3)).isSame(momentDayOnly('2017-05-22')), 'should be Monday of 32nd week, not counting break weeks')
    })
  })

  t.test('isaSessionEndDate', tt => {
    tt.test('throws if the given start date is not a date', throwsIfInvalidDate(isaSessionEndDate))

    tt.test('returns the end date of the session (0 indexed) for a given program start date', ttt => {
      ttt.plan(3)
      ttt.true(momentDayOnly(isaSessionEndDate(new Date('2016-11-28'), 0)).isSame(momentDayOnly('2017-01-27')), 'should be Friday of 8th week, not counting break weeks')
      ttt.true(momentDayOnly(isaSessionEndDate(new Date('2016-11-28'), 2)).isSame(momentDayOnly('2017-05-19')), 'should be Friday of 24th week, not counting break weeks')
      ttt.true(momentDayOnly(isaSessionEndDate(new Date('2016-11-28'), 3)).isSame(momentDayOnly('2017-07-21')), 'should be Friday of 32nd week, not counting break weeks')
    })
  })

  t.test('isaSessionStartDates', tt => {
    tt.test('throws if the given start date is not a date', throwsIfInvalidDate(isaSessionStartDates))

    tt.test('returns the 5 session start dates for a given program start date', ttt => {
      ttt.plan(6)
      const ssDates = isaSessionStartDates(new Date('2016-11-28'))
      ttt.equal(ssDates.length, 5, 'should have 5 elements')
      const expectedDateStrs = ['2016-11-28', '2017-01-30', '2017-03-27', '2017-05-22', '2017-07-24']
      expectedDateStrs.forEach((dateStr, idx) => {
        ttt.true(momentDayOnly(ssDates[idx]).isSame(momentDayOnly(dateStr)), `should be ${dateStr}`)
      })
    })
  })

  t.test('numDaysInISASession', tt => {
    tt.test('throws if the given start date is not a date', throwsIfInvalidDate(numDaysInISASession))

    tt.test('returns the number of days in the session (0 indexed) for a given program start date', ttt => {
      ttt.plan(1)
      const numDays = numDaysInISASession(new Date(Date.UTC(2016, 9, 3)), 0) // 10/3/16
      ttt.equal(numDays, 36, 'should exclude Indigenous People\'s Day, Veteran\'s Day, and the Thanksgiving holidays')
    })
  })

  t.test('stipendPaymentDatesBetween', tt => {
    tt.test('throws if the given dates are not dates', throwsIfInvalidDates(stipendPaymentDatesBetween))

    tt.test('returns the stipend payment dates between the given dates', ttt => {
      ttt.plan(1)
      const payments = stipendPaymentDatesBetween(new Date(Date.UTC(2017, 7, 7)), new Date(Date.UTC(2017, 11, 31))) // 8/7/17, 12/31/17
      ttt.equal(payments.length, 10, 'should include 10 stipend payments')
    })
  })
})
