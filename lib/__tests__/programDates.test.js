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
    tt.test('throws if the given start date is not a date', (0, _util.throwsIfInvalidDate)(_programDates.expectedExitDate));

    tt.test('returns Friday of (startDate + 41 weeks) if 1 break week is encountered', function (ttt) {
      ttt.plan(1);
      var exit = (0, _programDates.expectedExitDate)(new Date('2017-08-07'));
      ttt.true((0, _util.momentDayOnly)(exit).isSame('2018-05-18', 'day'), 'should be Friday of 41st week');
    });

    tt.test('returns Friday of (startDate + 42 weeks) if both break weeks are encountered', function (ttt) {
      ttt.plan(1);
      var exit = (0, _programDates.expectedExitDate)(new Date('2017-05-08'));
      ttt.true((0, _util.momentDayOnly)(exit).isSame('2018-02-23', 'day'), 'should be Friday of 42nd week');
    });
  });

  t.test('closedDaysBetween', function (tt) {
    tt.test('throws if the given dates are not dates', (0, _util.throwsIfInvalidDates)(_programDates.closedDaysBetween));

    tt.test('returns the holidays and break week days between two dates', function (ttt) {
      ttt.plan(1);
      var closedDays = (0, _programDates.closedDaysBetween)((0, _util.momentDayOnly)('2017-11-20'), (0, _util.momentDayOnly)('2017-12-31'));
      ttt.equal(closedDays.length, 7, 'should include Thanksgiving and Christmas break days');
    });

    tt.test('should include the special 2017-07-03 holiday', function (ttt) {
      ttt.plan(1);
      var closedDays = (0, _programDates.closedDaysBetween)((0, _util.momentDayOnly)('2017-05-22'), (0, _util.momentDayOnly)('2017-07-21'));
      ttt.equal(closedDays.length, 8, 'should include Thanksgiving and Christmas break days');
    });
  });

  t.test('openDaysBetween', function (tt) {
    tt.test('throws if the given dates are not dates', (0, _util.throwsIfInvalidDates)(_programDates.closedDaysBetween));

    tt.test('returns the days the guild is open without holidays', function (ttt) {
      ttt.plan(1);
      var openDays = (0, _programDates.openDaysBetween)((0, _util.momentDayOnly)('2017-12-25'), (0, _util.momentDayOnly)('2018-01-04'));
      ttt.equal(openDays.length, 3, 'should not include Christmas break days or New Years Day');
    });

    tt.test('should not include the special 2017-07-03 holiday', function (ttt) {
      ttt.plan(1);
      var openDays = (0, _programDates.openDaysBetween)((0, _util.momentDayOnly)('2017-05-22'), (0, _util.momentDayOnly)('2017-07-21'));
      ttt.equal(openDays.length, 37, 'should not include summer break or holidays');
    });
  });

  t.test('isaCancellationDate', function (tt) {
    tt.test('throws if the given start date is not a date', (0, _util.throwsIfInvalidDate)(_programDates.isaCancellationDate));

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

  t.test('isaSessionStartDate', function (tt) {
    tt.test('throws if the given start date is not a date', (0, _util.throwsIfInvalidDate)(_programDates.isaSessionStartDate));

    tt.test('returns the start date of the session (0 indexed) for a given program start date', function (ttt) {
      ttt.plan(3);
      ttt.true((0, _util.momentDayOnly)((0, _programDates.isaSessionStartDate)(new Date('2016-11-28'), 0)).isSame('2016-11-28'), 'should be Monday of 1st week, not counting break weeks');
      ttt.true((0, _util.momentDayOnly)((0, _programDates.isaSessionStartDate)(new Date('2016-11-28'), 2)).isSame('2017-03-27'), 'should be Monday of 24th week, not counting break weeks');
      ttt.true((0, _util.momentDayOnly)((0, _programDates.isaSessionStartDate)(new Date('2016-11-28'), 3)).isSame('2017-05-22'), 'should be Monday of 32nd week, not counting break weeks');
    });
  });

  t.test('isaSessionEndDate', function (tt) {
    tt.test('throws if the given start date is not a date', (0, _util.throwsIfInvalidDate)(_programDates.isaSessionEndDate));

    tt.test('returns the end date of the session (0 indexed) for a given program start date', function (ttt) {
      ttt.plan(3);
      ttt.true((0, _util.momentDayOnly)((0, _programDates.isaSessionEndDate)(new Date('2016-11-28'), 0)).isSame('2017-01-27'), 'should be Friday of 8th week, not counting break weeks');
      ttt.true((0, _util.momentDayOnly)((0, _programDates.isaSessionEndDate)(new Date('2016-11-28'), 2)).isSame('2017-05-19'), 'should be Friday of 24th week, not counting break weeks');
      ttt.true((0, _util.momentDayOnly)((0, _programDates.isaSessionEndDate)(new Date('2016-11-28'), 3)).isSame('2017-07-21'), 'should be Friday of 32nd week, not counting break weeks');
    });
  });

  t.test('numDaysInISASession', function (tt) {
    tt.test('throws if the given start date is not a date', (0, _util.throwsIfInvalidDate)(_programDates.numDaysInISASession));

    tt.test('returns the number of days in the session (0 indexed) for a given program start date', function (ttt) {
      ttt.plan(1);
      var numDays = (0, _programDates.numDaysInISASession)(new Date('2016-10-03'), 0);
      ttt.equal(numDays, 36, 'should exclude Indigenous People\'s Day, Veteran\'s Day, and the Thanksgiving holidays');
    });
  });

  t.test('stipendPaymentDatesBetween', function (tt) {
    tt.test('throws if the given dates are not dates', (0, _util.throwsIfInvalidDates)(_programDates.stipendPaymentDatesBetween));

    tt.test('returns the stipend payment dates between the given dates', function (ttt) {
      ttt.plan(1);
      var payments = (0, _programDates.stipendPaymentDatesBetween)(new Date('2017-08-07'), new Date('2017-12-31'));
      ttt.equal(payments.length, 10, 'should include 10 stipend payments');
    });
  });
});