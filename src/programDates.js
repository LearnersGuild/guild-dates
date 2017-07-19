import {momentDayOnly} from './util'
import {
  holidaysBetween,
  isHoliday,
} from './holidays'
import {
  breakWeekDaysBetween,
  summerBreakWeekMonday,
  winterBreakWeekMonday,
  isDuringBreakWeek,
} from './breakWeeks'

// --- start dates

const _legacyStartDates = [
  momentDayOnly('2016-07-11'),
  momentDayOnly('2016-09-19'),
  momentDayOnly('2016-11-28'),
  momentDayOnly('2017-02-06'),
  momentDayOnly('2017-02-13'),
  momentDayOnly('2017-02-21'),
  momentDayOnly('2017-02-27'),
  momentDayOnly('2017-03-06'),
  momentDayOnly('2017-03-20'),
  momentDayOnly('2017-03-27'),
  momentDayOnly('2017-04-10'),
  momentDayOnly('2017-04-17'),
  momentDayOnly('2017-04-24'),
  momentDayOnly('2017-05-01'),
  momentDayOnly('2017-05-08'),
]

const _legacyStartDate = date => {
  const input = momentDayOnly(date)
  for (const i in _legacyStartDates) {
    if (input.isBefore(_legacyStartDates[i])) {
      return _legacyStartDates[i]
    }
  }
  return null
}

export const nextStartDate = (date = new Date()) => {
  const input = momentDayOnly(date)
  if (input.isBefore(_legacyStartDates[_legacyStartDates.length - 1])) {
    return _legacyStartDate(date)
  }

  const firstMondayNextMonth = input
    .clone()
    .endOf('month')
    .endOf('isoWeek')
    .add(1, 'day')
  const output = momentDayOnly(firstMondayNextMonth)

  while (
    isHoliday(output) ||
    isDuringBreakWeek(output) ||
    output.day() === 0 ||
    output.day() === 6) {
    output.add(1, 'day')
  }

  return output.toDate()
}
export const defaultStartDate = nextStartDate()

// --- exit dates

export const MAX_PROGRAM_WEEKS = 40
export const CANCELLATION_WEEKS = 5

const _numBreakWeeks = (startDate, weeks) => {
  const start = momentDayOnly(startDate)
  const end = start.clone().add(weeks, 'weeks')

  let numBreaks = 0
  numBreaks += momentDayOnly(summerBreakWeekMonday(start)).isBetween(start, end) ? 1 : 0
  numBreaks += momentDayOnly(winterBreakWeekMonday(start)).isBetween(start, end) ? 1 : 0

  return numBreaks
}

const _addProgramWeeks = (startDate, weeks) => {
  return momentDayOnly(startDate)
    .clone()
    .add(weeks + _numBreakWeeks(startDate, weeks), 'weeks')
}

export const expectedExitDate = startDate => {
  return _addProgramWeeks(momentDayOnly(startDate), MAX_PROGRAM_WEEKS)
    .clone()
    .day('Friday')
    .toDate()
}
export const defaultExpectedExitDate = expectedExitDate(defaultStartDate)

// --- open vs. closed dates

export const closedDaysBetween = (startDate, endDate) => {
  return holidaysBetween(startDate, endDate)
    .concat(breakWeekDaysBetween(startDate, endDate))
    .sort((a, b) => a - b)
    .map(date => date.toISOString())
    .filter((dateStr, index, arr) => arr.indexOf(dateStr) === index)
    .map(dateStr => new Date(dateStr))
}

export const openDaysBetween = (startDate, endDate) => {
  const start = momentDayOnly(startDate)
  const end = momentDayOnly(endDate)
  const openDays = []
  while (start.isSameOrBefore(end)) {
    if (
      start.day() > 0 &&
      start.day() < 6 &&
      !isHoliday(start) &&
      !isDuringBreakWeek(start)
    ) {
      openDays.push(start.clone())
    }
    start.add(1, 'day')
  }
  return openDays.map(m => m.toDate())
}

// --- ISA dates

export const isaCancellationDate = startDate => {
  return _addProgramWeeks(momentDayOnly(startDate), CANCELLATION_WEEKS)
    .clone()
    .day('Monday')
    .toDate()
}
export const defaultISACancellationDate = isaCancellationDate(defaultStartDate)

export const PER_SESSION_WEEKS = 8

export const isaSessionStartDate = (startDate, sessionIdx = 0) => {
  return _addProgramWeeks(momentDayOnly(startDate), sessionIdx * PER_SESSION_WEEKS)
    .clone()
    .day('Monday')
    .toDate()
}

export const isaSessionEndDate = (startDate, sessionIdx = 0) => {
  return _addProgramWeeks(momentDayOnly(startDate), (sessionIdx + 1) * PER_SESSION_WEEKS - 1)
    .clone()
    .day('Friday')
    .toDate()
}

export const numDaysPerISASession = (startDate, sessionIdx = 0) => {
  const sessStart = momentDayOnly(isaSessionStartDate(startDate, sessionIdx))
  const sessEnd = momentDayOnly(isaSessionEndDate(startDate, sessionIdx))
  const openDays = openDaysBetween(sessStart, sessEnd)
  return openDays.length
}

// --- stipend payment dates

const _stipendConfig = {
  numWeeksBetweenPayments: 2,
  firstDisbursementDate: '2016-09-02',
}

export const stipendPaymentDatesBetween = (startDate, endDate) => {
  const stipendPaymentDate = momentDayOnly(_stipendConfig.firstDisbursementDate)
  const start = momentDayOnly(startDate)
  const end = momentDayOnly(endDate)
  const paymentDates = []
  while (stipendPaymentDate.isBefore(start)) {
    stipendPaymentDate.add(2, 'weeks')
  }
  while (stipendPaymentDate.isAfter(start) && stipendPaymentDate.isBefore(end)) {
    paymentDates.push(stipendPaymentDate.clone())
    stipendPaymentDate.add(2, 'weeks')
  }
  return paymentDates.map(m => m.toDate())
}
