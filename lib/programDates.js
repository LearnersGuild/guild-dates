'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stipendPaymentDatesBetween = exports.defaultISACancellationDate = exports.isaCancellationDate = exports.defaultExpectedExitDate = exports.expectedExitDate = exports.CANCELLATION_WEEKS = exports.MAX_PROGRAM_WEEKS = exports.defaultStartDate = exports.nextStartDate = undefined;

var _util = require('./util');

var _holidays = require('./holidays');

var _breakWeeks = require('./breakWeeks');

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

  var input = (0, _util.momentDayOnly)(date);
  if (input.isBefore(_legacyStartDates[_legacyStartDates.length - 1])) {
    return _legacyStartDate(date);
  }

  var firstMondayNextMonth = input.clone().endOf('month').endOf('isoWeek').add(1, 'day');
  var output = (0, _util.momentDayOnly)(firstMondayNextMonth);

  while ((0, _holidays.isHoliday)(output) || (0, _breakWeeks.isDuringBreakWeek)(output) || output.day() === 0 || output.day() === 6) {
    output.add(1, 'day');
  }

  return output.toDate();
};
var defaultStartDate = exports.defaultStartDate = nextStartDate();

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
  return (0, _util.momentDayOnly)(startDate).clone().add(weeks + _numBreakWeeks(startDate, weeks), 'weeks');
};

var expectedExitDate = exports.expectedExitDate = function expectedExitDate(startDate) {
  return _addProgramWeeks((0, _util.momentDayOnly)(startDate), MAX_PROGRAM_WEEKS).clone().day('Friday').toDate();
};
var defaultExpectedExitDate = exports.defaultExpectedExitDate = expectedExitDate(defaultStartDate);

var isaCancellationDate = exports.isaCancellationDate = function isaCancellationDate(startDate) {
  return _addProgramWeeks((0, _util.momentDayOnly)(startDate), CANCELLATION_WEEKS).clone().day('Monday').toDate();
};
var defaultISACancellationDate = exports.defaultISACancellationDate = isaCancellationDate(defaultStartDate);

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