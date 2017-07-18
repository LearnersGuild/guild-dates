'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _util = require('../util');

var _programDates = require('../programDates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('src/programDates', function (t) {
  t.test('nextStartDate', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_programDates.nextStartDate));

    tt.test('returns the legacy start date if before 2017-05-08', function (ttt) {
      ttt.plan(1);
      var sd = (0, _programDates.nextStartDate)('2017-04-12');
      var expected = (0, _util.momentDayOnly)('2017-04-17');
      ttt.true((0, _util.momentDayOnly)(sd).isSame(expected), 'should be 2017-04-17');
    });

    tt.test('returns first Monday of next month if not a holiday', function (ttt) {
      ttt.plan(1);
      var sd = (0, _programDates.nextStartDate)('2017-09-15');
      var expected = (0, _util.momentDayOnly)('2017-10-02');
      ttt.true((0, _util.momentDayOnly)(sd).isSame(expected), 'should be first Monday of next month');
    });

    tt.test('returns first Tuesday of next month if first Monday falls on a holiday', function (ttt) {
      ttt.plan(1);
      var sd = (0, _programDates.nextStartDate)('2017-08-15');
      var expected = (0, _util.momentDayOnly)('2017-09-05');
      ttt.true((0, _util.momentDayOnly)(sd).isSame(expected), 'should be first Tuesday of next month');
    });
  });

  t.test('expectedExitDate', function (tt) {
    tt.test('throws if the given start date is not a date', function (ttt) {
      ttt.plan(1);
      ttt.throws(function () {
        return (0, _programDates.expectedExitDate)('xyz');
      });
    });

    tt.test('returns Friday of (startDate + 41 weeks) if 1 break week is encountered', function (ttt) {
      ttt.plan(1);
      var exit = (0, _programDates.expectedExitDate)(new Date('2016-07-11'));
      ttt.true((0, _util.momentDayOnly)(exit).isSame('2017-04-28', 'day'), 'should be Friday of 41st week');
    });

    tt.test('returns Friday of (startDate + 42 weeks) if both break weeks are encountered', function (ttt) {
      ttt.plan(1);
      var exit = (0, _programDates.expectedExitDate)(new Date('2017-05-08'));
      ttt.true((0, _util.momentDayOnly)(exit).isSame('2018-03-02', 'day'), 'should be Friday of 42nd week');
    });
  });

  t.test('isaCancellationDate', function (tt) {
    tt.test('throws if the given start date is not a date', function (ttt) {
      ttt.plan(1);
      ttt.throws(function () {
        return (0, _programDates.isaCancellationDate)('xyz');
      });
    });

    tt.test('returns Monday of (startDate + 6) weeks if no break weeks are encountered', function (ttt) {
      ttt.plan(1);
      var cancel = (0, _programDates.isaCancellationDate)(new Date('2017-02-06'));
      ttt.true((0, _util.momentDayOnly)(cancel).isSame('2017-03-13'), 'should be Monday of 6th week');
    });

    tt.test('returns Monday of (startDate + 7) weeks if a break week is encountered', function (ttt) {
      ttt.plan(1);
      var cancel = (0, _programDates.isaCancellationDate)(new Date('2017-12-04'));
      ttt.true((0, _util.momentDayOnly)(cancel).isSame('2018-01-15'), 'should be Monday of 6th week');
    });
  });
});