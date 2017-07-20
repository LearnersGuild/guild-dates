import test from 'tape'

import {
  momentDayOnly,
  throwsIfInvalidDate,
} from '../util'

import {
  newYearsDay,
  mlkJrDay,
  presidentsDay,
  cesarChavezDay,
  memorialDay,
  independenceDay,
  laborDay,
  indigenousPeoplesDay,
  veteransDay,
  thanksgivingDay,
  thanksgivingFriday,
  christmasEve,
  christmasDay,
  isHoliday,
} from '../holidays'

test('src/holidays', t => {
  t.test('newYearsDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(newYearsDay))

    tt.test('returns next New Year\'s day if no date is given', ttt => {
      ttt.plan(1)
      const nextNewYears = newYearsDay()
      const expected = momentDayOnly(new Date((new Date()).getFullYear() + 1, 0, 1))
      ttt.true(momentDayOnly(nextNewYears).isSame(expected), 'should be the next New Year\'s Day')
    })

    tt.test('returns New Year\'s day that follows the given date', ttt => {
      ttt.plan(1)
      const nextNewYears = newYearsDay('2016-07-11')
      const expected = momentDayOnly('2017-01-01')
      ttt.true(momentDayOnly(nextNewYears).isSame(expected), 'should be the New Year\'s Day following the given date')
    })
  })

  t.test('mlkJrDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(mlkJrDay))

    tt.test('returns next MLK Jr. Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        mlkJrDay('2017-08-07'),
        mlkJrDay('2016-07-11'),
        mlkJrDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2018-01-15'),
        momentDayOnly('2017-01-16'),
        momentDayOnly('2020-01-20')
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next MLK Jr. Day'))
    })
  })

  t.test('presidentsDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(presidentsDay))

    tt.test('returns the weekday closest to the next President\'s Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        presidentsDay('2017-08-07'),
        presidentsDay('2016-07-11'),
        presidentsDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2018-02-15'),
        momentDayOnly('2017-02-15'),
        momentDayOnly('2020-02-14'), // the 15th would have been a Saturday
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next President\'s Day'))
    })
  })

  t.test('cesarChavezDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(cesarChavezDay))

    tt.test('returns the weekday closest to the next Cesar Chavez Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        cesarChavezDay('2017-08-07'),
        cesarChavezDay('2016-07-11'),
        cesarChavezDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2018-03-30'), // the 31st would have been a Saturday
        momentDayOnly('2017-03-31'),
        momentDayOnly('2020-03-31'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Cesar Chavez Day'))
    })
  })

  t.test('memorialDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(memorialDay))

    tt.test('returns the weekday closest to the next Memorial Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        memorialDay('2017-08-07'),
        memorialDay('2016-07-11'),
        memorialDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2018-05-28'),
        momentDayOnly('2017-05-29'),
        momentDayOnly('2020-05-25'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Memorial Day'))
    })
  })

  t.test('independenceDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(independenceDay))

    tt.test('returns the weekday closest to the next Independence Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        independenceDay('2017-08-07'),
        independenceDay('2016-07-11'),
        independenceDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2018-07-04'),
        momentDayOnly('2017-07-04'),
        momentDayOnly('2020-07-03'), // the 4th would have been a Saturday
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Independence Day'))
    })
  })

  t.test('laborDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(laborDay))

    tt.test('returns the weekday closest to the next Labor Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        laborDay('2017-08-07'),
        laborDay('2016-07-11'),
        laborDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-09-04'),
        momentDayOnly('2016-09-05'),
        momentDayOnly('2020-09-07'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Labor Day'))
    })
  })

  t.test('indigenousPeoplesDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(indigenousPeoplesDay))

    tt.test('returns the weekday closest to the next Indigenous People\'s Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        indigenousPeoplesDay('2017-08-07'),
        indigenousPeoplesDay('2016-07-11'),
        indigenousPeoplesDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-10-09'),
        momentDayOnly('2016-10-10'),
        momentDayOnly('2020-10-12'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Indigenous People\'s Day'))
    })
  })

  t.test('veteransDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(veteransDay))

    tt.test('returns the weekday closest to the next Veterans Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        veteransDay('2017-08-07'),
        veteransDay('2016-07-11'),
        veteransDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-11-10'), // the 11th would have been a Friday
        momentDayOnly('2016-11-11'),
        momentDayOnly('2020-11-11'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Veterans Day'))
    })
  })

  t.test('thanksgivingDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(thanksgivingDay))

    tt.test('returns the weekday closest to the next Thanksgiving Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        thanksgivingDay('2017-08-07'),
        thanksgivingDay('2016-07-11'),
        thanksgivingDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-11-23'),
        momentDayOnly('2016-11-24'),
        momentDayOnly('2020-11-26'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Thanksgiving Day'))
    })
  })

  t.test('thanksgivingFriday', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(thanksgivingFriday))

    tt.test('returns the weekday closest to the next Thanksgiving Friday after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        thanksgivingFriday('2017-08-07'),
        thanksgivingFriday('2016-07-11'),
        thanksgivingFriday('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-11-24'),
        momentDayOnly('2016-11-25'),
        momentDayOnly('2020-11-27'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Thanksgiving Friday'))
    })
  })

  t.test('christmasEve', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(christmasEve))

    tt.test('returns the weekday closest to the next Christmas Eve after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        christmasEve('2017-08-07'),
        christmasEve('2016-07-11'),
        christmasEve('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-12-25'), // the 24th would be a Sunday
        momentDayOnly('2016-12-23'), // the 24th would be a Saturday
        momentDayOnly('2020-12-24'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Christmas Eve'))
    })
  })

  t.test('christmasDay', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(christmasDay))

    tt.test('returns the weekday closest to the next Christmas Day after the given date', ttt => {
      ttt.plan(3)
      const nexts = [
        christmasDay('2017-08-07'),
        christmasDay('2016-07-11'),
        christmasDay('2020-01-01'),
      ]
      const expecteds = [
        momentDayOnly('2017-12-25'),
        momentDayOnly('2016-12-26'), // the 25th would be a Sunday
        momentDayOnly('2020-12-25'),
      ]
      nexts.forEach((d, i) => ttt.true(momentDayOnly(d).isSame(expecteds[i]), 'should be next Christmas Day'))
    })
  })

  t.test('isHoliday', tt => {
    tt.test('throws if the given date is not a date', throwsIfInvalidDate(isHoliday))

    tt.test('returns true if the given date is a holiday', ttt => {
      ttt.plan(4)
      ttt.true(isHoliday('2017-05-29'), 'should consider Memorial Day a holiday')
      ttt.true(isHoliday('2017-09-04'), 'should consider Labor Day a holiday')
      ttt.true(isHoliday('2019-12-24'), 'should consider Christmas Eve a holiday')
      ttt.true(isHoliday('2022-03-31'), 'should consider Cesar Chavez Day a holiday')
    })
  })
})
