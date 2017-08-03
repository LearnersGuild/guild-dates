'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stipendPaymentDatesBetween = exports.numDaysInISASession = exports.isaSessionEndDate = exports.isaSessionStartDate = exports.PER_SESSION_WEEKS = exports.defaultISACancellationDate = exports.isaCancellationDate = exports.openDaysBetween = exports.closedDaysBetween = exports.defaultExpectedExitDate = exports.expectedExitDate = exports.CANCELLATION_WEEKS = exports.MAX_PROGRAM_WEEKS = exports.defaultStartDate = exports.nextStartDate = undefined;

var _util = require('./util');

var _holidays = require('./holidays');

var _breakWeeks = require('./breakWeeks');

// --- start dates

var _legacyStartDates = [(0, _util.momentDayOnly)('2016-07-11'), (0, _util.momentDayOnly)('2016-09-19'), (0, _util.momentDayOnly)('2016-11-28'), (0, _util.momentDayOnly)('2017-02-06'), (0, _util.momentDayOnly)('2017-02-13'), (0, _util.momentDayOnly)('2017-02-21'), (0, _util.momentDayOnly)('2017-02-27'), (0, _util.momentDayOnly)('2017-03-06'), (0, _util.momentDayOnly)('2017-03-20'), (0, _util.momentDayOnly)('2017-03-27'), (0, _util.momentDayOnly)('2017-04-10'), (0, _util.momentDayOnly)('2017-04-17'), (0, _util.momentDayOnly)('2017-04-24'), (0, _util.momentDayOnly)('2017-05-01'), (0, _util.momentDayOnly)('2017-05-08')];

var _legacyStartDate = function _legacyStartDate(date) {
  var input = (0, _util.momentDayOnly)(date);
  for (var i in _legacyStartDates) {
    if (input.isBefore(_legacyStartDates[i])) {
      return _legacyStartDates[i];
    }
  }
  return null;
};

var nextStartDate = exports.nextStartDate = function nextStartDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var inputDate = (0, _util.momentDayOnly)(date);
  if (inputDate.isBefore(_legacyStartDates[_legacyStartDates.length - 1])) {
    return _legacyStartDate(inputDate);
  }

  var startDate = void 0;
  var firstMondayMonth = _firstMondayOfMonth(inputDate);
  var firstMondayMonthInFuture = firstMondayMonth.date() >= inputDate.date();
  if (firstMondayMonthInFuture) {
    startDate = firstMondayMonth;
  } else {
    var firstDayNextMonth = inputDate.clone().endOf('month').add(1, 'day');
    startDate = _firstMondayOfMonth(firstDayNextMonth);
  }

  while ((0, _holidays.isHoliday)(startDate) || (0, _breakWeeks.isDuringBreakWeek)(startDate) || startDate.isoWeekday() === 6 || startDate.isoWeekday() === 7) {
    startDate.add(1, 'day');
  }

  return startDate.toDate();
};
var defaultStartDate = exports.defaultStartDate = nextStartDate();

// --- exit dates

var MAX_PROGRAM_WEEKS = exports.MAX_PROGRAM_WEEKS = 40;
var CANCELLATION_WEEKS = exports.CANCELLATION_WEEKS = 5;

var _numBreakWeeks = function _numBreakWeeks(startDate, weeks) {
  var start = (0, _util.momentDayOnly)(startDate);
  var end = start.clone().add(weeks, 'weeks');

  var numBreaks = 0;
  numBreaks += (0, _util.momentDayOnly)((0, _breakWeeks.summerBreakWeekMonday)(start)).isBetween(start, end) ? 1 : 0;
  numBreaks += (0, _util.momentDayOnly)((0, _breakWeeks.winterBreakWeekMonday)(start)).isBetween(start, end) ? 1 : 0;

  return numBreaks;
};

var _addProgramWeeks = function _addProgramWeeks(startDate, weeks) {
  var numWeeksAdded = weeks + _numBreakWeeks(startDate, weeks);
  return (0, _util.momentDayOnly)(startDate).clone().add(numWeeksAdded - 1, 'weeks').day('Friday');
};

var expectedExitDate = exports.expectedExitDate = function expectedExitDate(startDate) {
  var endOfProgramWeeks = _addProgramWeeks((0, _util.momentDayOnly)(startDate), MAX_PROGRAM_WEEKS);
  return endOfProgramWeeks.toDate();
};
var defaultExpectedExitDate = exports.defaultExpectedExitDate = expectedExitDate(defaultStartDate);

// --- open vs. closed dates

var closedDaysBetween = exports.closedDaysBetween = function closedDaysBetween(startDate, endDate) {
  return (0, _holidays.holidaysBetween)(startDate, endDate).concat((0, _breakWeeks.breakWeekDaysBetween)(startDate, endDate)).sort(function (a, b) {
    return a - b;
  }).map(function (date) {
    return date.toISOString();
  }).filter(function (dateStr, index, arr) {
    return arr.indexOf(dateStr) === index;
  }).map(function (dateStr) {
    return new Date(dateStr);
  });
};

var openDaysBetween = exports.openDaysBetween = function openDaysBetween(startDate, endDate) {
  var start = (0, _util.momentDayOnly)(startDate);
  var end = (0, _util.momentDayOnly)(endDate);
  var openDays = [];
  while (start.isSameOrBefore(end)) {
    if (start.day() > 0 && start.day() < 6 && !(0, _holidays.isHoliday)(start) && !(0, _breakWeeks.isDuringBreakWeek)(start)) {
      openDays.push(start.clone());
    }
    start.add(1, 'day');
  }
  return openDays.map(function (m) {
    return m.toDate();
  });
};

// --- ISA dates

var isaCancellationDate = exports.isaCancellationDate = function isaCancellationDate(startDate) {
  var endOfCancellationWeeks = _addProgramWeeks((0, _util.momentDayOnly)(startDate), CANCELLATION_WEEKS);
  return _nextMonday(endOfCancellationWeeks).toDate();
};
var defaultISACancellationDate = exports.defaultISACancellationDate = isaCancellationDate(defaultStartDate);

var PER_SESSION_WEEKS = exports.PER_SESSION_WEEKS = 8;

var isaSessionStartDate = exports.isaSessionStartDate = function isaSessionStartDate(startDate) {
  var sessionIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var numWeeksBeforeStart = sessionIdx * PER_SESSION_WEEKS;
  var fridayBeforeStart = _addProgramWeeks((0, _util.momentDayOnly)(startDate), numWeeksBeforeStart);
  return _nextMonday(fridayBeforeStart).toDate();
};

var isaSessionEndDate = exports.isaSessionEndDate = function isaSessionEndDate(startDate) {
  var sessionIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var numTotalSessionWeeks = (sessionIdx + 1) * PER_SESSION_WEEKS;
  var fridayFinalWeek = _addProgramWeeks((0, _util.momentDayOnly)(startDate), numTotalSessionWeeks);
  return fridayFinalWeek.toDate();
};

var numDaysInISASession = exports.numDaysInISASession = function numDaysInISASession(startDate) {
  var sessionIdx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var sessStart = (0, _util.momentDayOnly)(isaSessionStartDate(startDate, sessionIdx));
  var sessEnd = (0, _util.momentDayOnly)(isaSessionEndDate(startDate, sessionIdx));
  var openDays = openDaysBetween(sessStart, sessEnd);
  return openDays.length;
};

// --- stipend payment dates

var _stipendConfig = {
  numWeeksBetweenPayments: 2,
  firstDisbursementDate: '2016-09-02'
};

var stipendPaymentDatesBetween = exports.stipendPaymentDatesBetween = function stipendPaymentDatesBetween(startDate, endDate) {
  var stipendPaymentDate = (0, _util.momentDayOnly)(_stipendConfig.firstDisbursementDate);
  var start = (0, _util.momentDayOnly)(startDate);
  var end = (0, _util.momentDayOnly)(endDate);
  var paymentDates = [];
  while (stipendPaymentDate.isBefore(start)) {
    stipendPaymentDate.add(2, 'weeks');
  }
  while (stipendPaymentDate.isAfter(start) && stipendPaymentDate.isBefore(end)) {
    paymentDates.push(stipendPaymentDate.clone());
    stipendPaymentDate.add(2, 'weeks');
  }
  return paymentDates.map(function (m) {
    return m.toDate();
  });
};

function _firstMondayOfMonth(date) {
  return (0, _util.momentDayOnly)(date.clone().startOf('month').startOf('isoWeek').add(7, 'day'));
}

function _nextMonday(date) {
  var result = (0, _util.momentDayOnly)(date).clone();
  if (result.isoWeekday() === 1) {
    return result; // Monday
  }
  return result.endOf('isoWeek').add(1, 'day');
}