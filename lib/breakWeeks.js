'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDuringBreakWeek = exports.breakWeekDaysBetween = exports.winterBreakWeekDays = exports.summerBreakWeekDays = exports.winterBreakWeekMonday = exports.summerBreakWeekMonday = undefined;

var _util = require('./util');

var _lastFullWeekOfMonthMonday = function _lastFullWeekOfMonthMonday(month) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  var input = (0, _util.momentDayOnly)(date);
  var output = input.clone().startOf('year').month(month).startOf('isoWeek');
  var firstOfNextMonth = output.clone().month(month + 1).startOf('month');

  while (output.clone().add(13, 'days').isSameOrBefore(firstOfNextMonth)) {
    output.add(1, 'week');
  }

  // ensure that we get the _next_ one
  output.add(output > input ? 0 : 52, 'weeks');

  return output.toDate();
};

var _weekdaysForMonday = function _weekdaysForMonday(mon) {
  var m = (0, _util.momentDayOnly)(mon);
  return [m.toDate(), m.clone().add(1, 'days').toDate(), m.clone().add(2, 'days').toDate(), m.clone().add(3, 'days').toDate(), m.clone().add(4, 'days').toDate()];
};

var summerBreakWeekMonday = exports.summerBreakWeekMonday = function summerBreakWeekMonday(date) {
  var input = (0, _util.momentDayOnly)(date);
  var summer2017BreakWeekMonday = (0, _util.momentDayOnly)('2017-06-12');
  return input.year() === summer2017BreakWeekMonday.year() ? summer2017BreakWeekMonday : _lastFullWeekOfMonthMonday(5, date);
};

var winterBreakWeekMonday = exports.winterBreakWeekMonday = function winterBreakWeekMonday(date) {
  return _lastFullWeekOfMonthMonday(11, date);
};

var summerBreakWeekDays = exports.summerBreakWeekDays = function summerBreakWeekDays(date) {
  var mon = summerBreakWeekMonday(date);
  return _weekdaysForMonday(mon);
};

var winterBreakWeekDays = exports.winterBreakWeekDays = function winterBreakWeekDays(date) {
  var mon = winterBreakWeekMonday(date);
  return _weekdaysForMonday(mon);
};

var _breakWeekDaysAfter = function _breakWeekDaysAfter(date) {
  return summerBreakWeekDays(date).concat(winterBreakWeekDays(date));
};

var breakWeekDaysBetween = exports.breakWeekDaysBetween = function breakWeekDaysBetween(startDate, endDate) {
  var start = (0, _util.momentDayOnly)(startDate);
  var end = (0, _util.momentDayOnly)(endDate);
  return _breakWeekDaysAfter(start).map(function (day) {
    return (0, _util.momentDayOnly)(day);
  }).filter(function (m) {
    return m.isSameOrAfter(start) && m.isSameOrBefore(end);
  }).map(function (m) {
    return m.toDate();
  });
};

var isDuringBreakWeek = exports.isDuringBreakWeek = function isDuringBreakWeek() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var input = (0, _util.momentDayOnly)(date);
  var lastWeek = input.clone().subtract(1, 'week');
  var breakWeekDays = _breakWeekDaysAfter(lastWeek);
  var foundBreakWeekDay = breakWeekDays.find(function (d) {
    return (0, _util.momentDayOnly)(d).isSame(input);
  });
  return Boolean(foundBreakWeekDay);
};