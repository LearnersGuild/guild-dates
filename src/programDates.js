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
  const inputDate = momentDayOnly(date)
  if (inputDate.isBefore(_legacyStartDates[_legacyStartDates.length - 1])) {
    return _legacyStartDate(inputDate)
  }

  let startDate
  const firstMondayMonth = _firstMondayOfMonth(inputDate)
  const firstMondayMonthInFuture = firstMondayMonth.date() >= inputDate.date()
  if (firstMondayMonthInFuture) {
    startDate = firstMondayMonth
  } else {
    const firstDayNextMonth = inputDate.clone().endOf('month').add(1, 'day')
    startDate = _firstMondayOfMonth(firstDayNextMonth)
  }

  while (
    isHoliday(startDate) ||
    isDuringBreakWeek(startDate) ||
    startDate.isoWeekday() === 6 ||
    startDate.isoWeekday() === 7) {
    startDate.add(1, 'day')
  }

  return startDate.toDate()
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
  const numWeeksAdded = weeks + _numBreakWeeks(startDate, weeks)
  return momentDayOnly(startDate)
    .clone()
    .add(numWeeksAdded - 1, 'weeks')
    .day('Friday')
}

export const expectedExitDate = startDate => {
  const endOfProgramWeeks = _addProgramWeeks(momentDayOnly(startDate), MAX_PROGRAM_WEEKS)
  return endOfProgramWeeks.toDate()
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
  const endOfCancellationWeeks = _addProgramWeeks(momentDayOnly(startDate), CANCELLATION_WEEKS)
  return _nextMonday(endOfCancellationWeeks).toDate()
}
export const defaultISACancellationDate = isaCancellationDate(defaultStartDate)

export const PER_SESSION_WEEKS = 8

export const isaSessionStartDate = (startDate, sessionIdx = 0) => {
  const numWeeksBeforeStart = sessionIdx * PER_SESSION_WEEKS
  const fridayBeforeStart = _addProgramWeeks(momentDayOnly(startDate), numWeeksBeforeStart)
  return _nextMonday(fridayBeforeStart).toDate()
}

export const isaSessionEndDate = (startDate, sessionIdx = 0) => {
  const numTotalSessionWeeks = (sessionIdx + 1) * PER_SESSION_WEEKS
  const fridayFinalWeek = _addProgramWeeks(momentDayOnly(startDate), numTotalSessionWeeks)
  return fridayFinalWeek.toDate()
}

export const numDaysInISASession = (startDate, sessionIdx = 0) => {
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

function _firstMondayOfMonth(date) {
  return momentDayOnly(
    date
      .clone()
      .startOf('month')
      .startOf('isoWeek')
      .add(7, 'day')
  )
}

function _nextMonday(date) {
  const result = momentDayOnly(date).clone()
  if (result.isoWeekday() === 1) {
    return result // Monday
  }
  return result.endOf('isoWeek').add(1, 'day')
}
