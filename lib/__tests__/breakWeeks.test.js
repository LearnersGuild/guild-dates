'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _util = require('../util');

var _breakWeeks = require('../breakWeeks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('src/breakWeeks', function (t) {
  t.test('summerBreakWeekMonday', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_breakWeeks.summerBreakWeekMonday));

    tt.test('returns 2017-06-12 if given date is before that', function (ttt) {
      ttt.plan(1);
      var mon = (0, _breakWeeks.summerBreakWeekMonday)('2017-02-27');
      var expected = (0, _util.momentDayOnly)('2017-06-12');
      ttt.true((0, _util.momentDayOnly)(mon).isSame(expected), 'should be 2017-06-12');
    });

    tt.test('returns Monday of last fully-contained week in June', function (ttt) {
      ttt.plan(1);
      var mon = (0, _breakWeeks.summerBreakWeekMonday)('2020-01-06');
      var expected = (0, _util.momentDayOnly)('2020-06-22');
      ttt.true((0, _util.momentDayOnly)(mon).isSame(expected), 'should be the Monday of the last fully-contained week in June');
    });
  });

  t.test('summerBreakWeekDays', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_breakWeeks.summerBreakWeekDays));

    tt.test('returns [2017-06-12 .. 2017-16-16] if given date is before that', function (ttt) {
      ttt.plan(5);
      var days = (0, _breakWeeks.summerBreakWeekDays)('2017-02-27');
      var expected = [(0, _util.momentDayOnly)('2017-06-12'), (0, _util.momentDayOnly)('2017-06-13'), (0, _util.momentDayOnly)('2017-06-14'), (0, _util.momentDayOnly)('2017-06-15'), (0, _util.momentDayOnly)('2017-06-16')];
      days.forEach(function (day, i) {
        return ttt.true((0, _util.momentDayOnly)(day).isSame(expected[i]), 'should be the week of 2017-06-12');
      });
    });

    tt.test('returns last fully-contained week in June', function (ttt) {
      ttt.plan(5);
      var days = (0, _breakWeeks.summerBreakWeekDays)('2018-01-01');
      var expected = [(0, _util.momentDayOnly)('2018-06-25'), (0, _util.momentDayOnly)('2018-06-26'), (0, _util.momentDayOnly)('2018-06-27'), (0, _util.momentDayOnly)('2018-06-28'), (0, _util.momentDayOnly)('2018-06-29')];
      days.forEach(function (day, i) {
        return ttt.true((0, _util.momentDayOnly)(day).isSame(expected[i]), 'should be the last fully-contained week in June');
      });
    });
  });

  t.test('winterBreakWeekMonday', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_breakWeeks.winterBreakWeekMonday));

    tt.test('returns Monday of last fully-contained week in December', function (ttt) {
      ttt.plan(1);
      var mon = (0, _breakWeeks.winterBreakWeekMonday)('2016-07-11');
      var expected = (0, _util.momentDayOnly)('2016-12-26');
      ttt.true((0, _util.momentDayOnly)(mon).isSame(expected), 'should be the Monday of the last fully-contained week in December');
    });
  });

  t.test('winterBreakWeekDays', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_breakWeeks.winterBreakWeekDays));

    tt.test('returns last fully-contained week in December', function (ttt) {
      ttt.plan(5);
      var days = (0, _breakWeeks.winterBreakWeekDays)('2020-01-06');
      var expected = [(0, _util.momentDayOnly)('2020-12-21'), (0, _util.momentDayOnly)('2020-12-22'), (0, _util.momentDayOnly)('2020-12-23'), (0, _util.momentDayOnly)('2020-12-24'), (0, _util.momentDayOnly)('2020-12-25')];
      days.forEach(function (day, i) {
        return ttt.true((0, _util.momentDayOnly)(day).isSame(expected[i]), 'should be the last fully-contained week in December');
      });
    });
  });

  t.test('isDuringBreakWeek', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_breakWeeks.isDuringBreakWeek));

    tt.test('returns true if the given date is a holiday', function (ttt) {
      ttt.plan(2);
      ttt.true((0, _breakWeeks.isDuringBreakWeek)('2017-12-27'), 'should consider Christmas week to be a break');
      ttt.true((0, _breakWeeks.isDuringBreakWeek)('2020-06-24'), 'should consider last week of June to be a break');
    });
  });
});