'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('src/util', function (t) {
  t.test('momentDayOnly', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_util.momentDayOnly));

    tt.test('returns today if no date is given', function (ttt) {
      ttt.plan(3);
      var today = new Date();
      var todayMoment = (0, _util.momentDayOnly)();
      ttt.equal(todayMoment.year(), today.getFullYear(), 'should be current year');
      ttt.equal(todayMoment.month(), today.getMonth(), 'should be current month');
      ttt.equal(todayMoment.date(), today.getDate(), 'should be current day');
    });

    tt.test('returns given date with 0 for hour, minute, and second', function (ttt) {
      ttt.plan(6);
      var dayOnly = (0, _util.momentDayOnly)('2017-08-01');
      ttt.equal(dayOnly.year(), 2017, 'should return given year');
      ttt.equal(dayOnly.month(), 7, 'should return given month');
      ttt.equal(dayOnly.date(), 1, 'should return given day');
      ttt.equal(dayOnly.hour(), 0, 'should return 0 for hour');
      ttt.equal(dayOnly.minute(), 0, 'should return 0 for minute');
      ttt.equal(dayOnly.second(), 0, 'should return 0 for second');
    });
  });
});