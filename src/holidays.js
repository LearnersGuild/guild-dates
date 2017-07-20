import {momentDayOnly} from './util'

const _ensureWeekday = m => {
  if (m.day() === 6) {
    return m.clone().subtract(1, 'day')
  }
  if (m.day() === 0) {
    return m.clone().add(1, 'day')
  }
  return m
}

const _holidayForDate = (month, dayOfMonth, date = new Date()) => {
  const input = momentDayOnly(date)
  const output = input
    .clone()
    .startOf('year')
    .month(month)
    .date(dayOfMonth)

  // ensure that we get the _next_ one
  output.add(output > input ? 0 : 1, 'years')

  return _ensureWeekday(output).toDate()
}

const _holidayForNthWeekdayOccurence = (month, n, day, date = new Date()) => {
  const input = momentDayOnly(date)
  const output = input
    .clone()
    .startOf('year')
    .month(month)
    .startOf('isoWeek')
    .day(day)

  // if moving to Monday moved us backwards, we add n rather than n - 1 weeks
  output.add(output.month() !== month ? n : n - 1, 'weeks')

  // ensure that we get the _next_ one
  output.add(output > input ? 0 : 52, 'weeks')

  return output.toDate()
}

// New Year’s Day	                      January 1
export const newYearsDay = (date = new Date()) => {
  return momentDayOnly(date)
    .add(1, 'year')
    .month(0)
    .date(1)
    .toDate()
}

// Birthday of Martin Luther King, Jr.	Third Monday in January
export const mlkJrDay = date => _holidayForNthWeekdayOccurence(0, 3, 1, date)

// President’s Day	                    February 15
export const presidentsDay = date => _holidayForDate(1, 15, date)

// Cesar Chavez Day	                    March 31
export const cesarChavezDay = date => _holidayForDate(2, 31, date)

// Memorial Day	                        Last Monday in May
export const memorialDay = date => {
  // since it falls on the last Monday, we'll take the first Monday of June and
  // subtract a week (since we don't know if there are 4 or 5 Mondays)
  const memDay = momentDayOnly(_holidayForNthWeekdayOccurence(5, 1, 1, date))
  memDay.subtract(1, 'weeks')

  return memDay.toDate()
}

// Independence Day	                    July 4
export const independenceDay = date => _holidayForDate(6, 4, date)

// Labor Day	                          First Monday in September
export const laborDay = date => _holidayForNthWeekdayOccurence(8, 1, 1, date)

// Indigenous People’s Day	            Second Monday in October
export const indigenousPeoplesDay = date => _holidayForNthWeekdayOccurence(9, 2, 1, date)

// Veterans Day	                        November 11
export const veteransDay = date => _holidayForDate(10, 11, date)

// Thanksgiving Day and Friday	        Fourth Thursday in November and following Friday
export const thanksgivingDay = date => _holidayForNthWeekdayOccurence(10, 4, 4, date)
export const thanksgivingFriday = date => _holidayForNthWeekdayOccurence(10, 4, 5, date)

// Christmas Eve and Day                December 24 and December 25
export const christmasEve = date => _holidayForDate(11, 24, date)
export const christmasDay = date => _holidayForDate(11, 25, date)

const _holidaysAfter = date => {
  return [
    newYearsDay(date),
    mlkJrDay(date),
    presidentsDay(date),
    cesarChavezDay(date),
    memorialDay(date),
    independenceDay(date),
    laborDay(date),
    indigenousPeoplesDay(date),
    veteransDay(date),
    thanksgivingDay(date),
    thanksgivingFriday(date),
    christmasEve(date),
    christmasDay(date),
  ]
    .map(d => momentDayOnly(d))
    .sort((a, b) => {
      if (a.isBefore(b)) {
        return -1
      }
      if (b.isBefore(a)) {
        return 1
      }
      return 0
    })
    .map(m => m.toDate())
}

export const holidaysBetween = (startDate, endDate) => {
  const start = momentDayOnly(startDate)
  const end = momentDayOnly(endDate)
  return _holidaysAfter(start)
    .map(day => momentDayOnly(day))
    .filter(day => day.isSameOrAfter(start) && day.isSameOrBefore(end))
    .map(day => day.toDate())
}

export const isHoliday = (date = new Date()) => {
  const input = momentDayOnly(date)
  const yesterday = input.clone().subtract(1, 'day')
  const holidays = _holidaysAfter(yesterday)
  const foundHoliday = holidays.find(d => momentDayOnly(d).isSame(input))
  return Boolean(foundHoliday)
}
