'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHoliday = exports.holidaysBetween = exports.christmasDay = exports.christmasEve = exports.thanksgivingFriday = exports.thanksgivingDay = exports.veteransDay = exports.indigenousPeoplesDay = exports.laborDay = exports.independenceDay = exports.memorialDay = exports.cesarChavezDay = exports.presidentsDay = exports.mlkJrDay = exports.newYearsDay = undefined;

var _util = require('./util');

var _ensureWeekday = function _ensureWeekday(m) {
  if (m.day() === 6) {
    return m.clone().subtract(1, 'day');
  }
  if (m.day() === 0) {
    return m.clone().add(1, 'day');
  }
  return m;
};

var _holidayForDate = function _holidayForDate(month, dayOfMonth) {
  var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();

  var input = (0, _util.momentDayOnly)(date);
  var output = input.clone().startOf('year').month(month).date(dayOfMonth);

  // ensure that we get the _next_ one
  output.add(output > input ? 0 : 1, 'years');

  return _ensureWeekday(output).toDate();
};

var _holidayForNthWeekdayOccurence = function _holidayForNthWeekdayOccurence(month, n, day) {
  var date = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date();

  var input = (0, _util.momentDayOnly)(date);
  var output = input.clone().startOf('year').month(month).startOf('isoWeek').day(day);

  // if moving to Monday moved us backwards, we add n rather than n - 1 weeks
  output.add(output.month() !== month ? n : n - 1, 'weeks');

  // ensure that we get the _next_ one
  output.add(output > input ? 0 : 52, 'weeks');

  return output.toDate();
};

// New Year’s Day	                      January 1
var newYearsDay = exports.newYearsDay = function newYearsDay() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  return (0, _util.momentDayOnly)(date).add(1, 'year').month(0).date(1).toDate();
};

// Birthday of Martin Luther King, Jr.	Third Monday in January
var mlkJrDay = exports.mlkJrDay = function mlkJrDay(date) {
  return _holidayForNthWeekdayOccurence(0, 3, 1, date);
};

// President’s Day	                    February 15
var presidentsDay = exports.presidentsDay = function presidentsDay(date) {
  return _holidayForDate(1, 15, date);
};

// Cesar Chavez Day	                    March 31
var cesarChavezDay = exports.cesarChavezDay = function cesarChavezDay(date) {
  return _holidayForDate(2, 31, date);
};

// Memorial Day	                        Last Monday in May
var memorialDay = exports.memorialDay = function memorialDay(date) {
  var memDay = (0, _util.momentDayOnly)(_holidayForNthWeekdayOccurence(4, 4, 1, date));

  // if there are 5 Mondays, add a week
  memDay.add(memDay.date() < 25 ? 1 : 0, 'weeks');

  return memDay;
};

// Independence Day	                    July 4
var independenceDay = exports.independenceDay = function independenceDay(date) {
  return _holidayForDate(6, 4, date);
};

// Labor Day	                          First Monday in September
var laborDay = exports.laborDay = function laborDay(date) {
  return _holidayForNthWeekdayOccurence(8, 1, 1, date);
};

// Indigenous People’s Day	            Second Monday in October
var indigenousPeoplesDay = exports.indigenousPeoplesDay = function indigenousPeoplesDay(date) {
  return _holidayForNthWeekdayOccurence(9, 2, 1, date);
};

// Veterans Day	                        November 11
var veteransDay = exports.veteransDay = function veteransDay(date) {
  return _holidayForDate(10, 11, date);
};

// Thanksgiving Day and Friday	        Fourth Thursday in November and following Friday
var thanksgivingDay = exports.thanksgivingDay = function thanksgivingDay(date) {
  return _holidayForNthWeekdayOccurence(10, 4, 4, date);
};
var thanksgivingFriday = exports.thanksgivingFriday = function thanksgivingFriday(date) {
  return _holidayForNthWeekdayOccurence(10, 4, 5, date);
};

// Christmas Eve and Day                December 24 and December 25
var christmasEve = exports.christmasEve = function christmasEve(date) {
  return _holidayForDate(11, 24, date);
};
var christmasDay = exports.christmasDay = function christmasDay(date) {
  return _holidayForDate(11, 25, date);
};

var _holidaysAfter = function _holidaysAfter(date) {
  return [newYearsDay(date), mlkJrDay(date), presidentsDay(date), cesarChavezDay(date), memorialDay(date), independenceDay(date), laborDay(date), indigenousPeoplesDay(date), veteransDay(date), thanksgivingDay(date), thanksgivingFriday(date), christmasEve(date), christmasDay(date)].map(function (d) {
    return (0, _util.momentDayOnly)(d);
  }).sort(function (a, b) {
    if (a.isBefore(b)) {
      return -1;
    }
    if (b.isBefore(a)) {
      return 1;
    }
    return 0;
  }).map(function (m) {
    return m.toDate();
  });
};

var holidaysBetween = exports.holidaysBetween = function holidaysBetween(startDate, endDate) {
  var start = (0, _util.momentDayOnly)(startDate);
  var end = (0, _util.momentDayOnly)(endDate);
  return _holidaysAfter(start).map(function (day) {
    return (0, _util.momentDayOnly)(day);
  }).filter(function (day) {
    return day.isSameOrAfter(start) && day.isSameOrBefore(end);
  }).map(function (day) {
    return day.toDate();
  });
};

var isHoliday = exports.isHoliday = function isHoliday() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var input = (0, _util.momentDayOnly)(date);
  var yesterday = input.clone().subtract(1, 'day');
  var holidays = _holidaysAfter(yesterday);
  var foundHoliday = holidays.find(function (d) {
    return (0, _util.momentDayOnly)(d).isSame(input);
  });
  return Boolean(foundHoliday);
};