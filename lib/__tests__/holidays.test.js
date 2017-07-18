'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _util = require('../util');

var _holidays = require('../holidays');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('src/holidays', function (t) {
  t.test('newYearsDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.newYearsDay));

    tt.test('returns next New Year\'s day if no date is given', function (ttt) {
      ttt.plan(1);
      var nextNewYears = (0, _holidays.newYearsDay)();
      var expected = (0, _util.momentDayOnly)(new Date(new Date().getFullYear() + 1, 0, 1));
      ttt.true((0, _util.momentDayOnly)(nextNewYears).isSame(expected), 'should be the next New Year\'s Day');
    });

    tt.test('returns New Year\'s day that follows the given date', function (ttt) {
      ttt.plan(1);
      var nextNewYears = (0, _holidays.newYearsDay)('2016-07-11');
      var expected = (0, _util.momentDayOnly)('2017-01-01');
      ttt.true((0, _util.momentDayOnly)(nextNewYears).isSame(expected), 'should be the New Year\'s Day following the given date');
    });
  });

  t.test('mlkJrDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.mlkJrDay));

    tt.test('returns next MLK Jr. Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.mlkJrDay)('2017-08-07'), (0, _holidays.mlkJrDay)('2016-07-11'), (0, _holidays.mlkJrDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2018-01-15'), (0, _util.momentDayOnly)('2017-01-16'), (0, _util.momentDayOnly)('2020-01-20')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next MLK Jr. Day');
      });
    });
  });

  t.test('presidentsDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.presidentsDay));

    tt.test('returns the weekday closest to the next President\'s Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.presidentsDay)('2017-08-07'), (0, _holidays.presidentsDay)('2016-07-11'), (0, _holidays.presidentsDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2018-02-15'), (0, _util.momentDayOnly)('2017-02-15'), (0, _util.momentDayOnly)('2020-02-14')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next President\'s Day');
      });
    });
  });

  t.test('cesarChavezDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.cesarChavezDay));

    tt.test('returns the weekday closest to the next Cesar Chavez Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.cesarChavezDay)('2017-08-07'), (0, _holidays.cesarChavezDay)('2016-07-11'), (0, _holidays.cesarChavezDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2018-03-30'), // the 31st would have been a Saturday
      (0, _util.momentDayOnly)('2017-03-31'), (0, _util.momentDayOnly)('2020-03-31')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Cesar Chavez Day');
      });
    });
  });

  t.test('memorialDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.memorialDay));

    tt.test('returns the weekday closest to the next Memorial Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.memorialDay)('2017-08-07'), (0, _holidays.memorialDay)('2016-07-11'), (0, _holidays.memorialDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2018-05-28'), (0, _util.momentDayOnly)('2017-05-29'), (0, _util.momentDayOnly)('2020-05-25')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Memorial Day');
      });
    });
  });

  t.test('independenceDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.independenceDay));

    tt.test('returns the weekday closest to the next Independence Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.independenceDay)('2017-08-07'), (0, _holidays.independenceDay)('2016-07-11'), (0, _holidays.independenceDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2018-07-04'), (0, _util.momentDayOnly)('2017-07-04'), (0, _util.momentDayOnly)('2020-07-03')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Independence Day');
      });
    });
  });

  t.test('laborDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.laborDay));

    tt.test('returns the weekday closest to the next Labor Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.laborDay)('2017-08-07'), (0, _holidays.laborDay)('2016-07-11'), (0, _holidays.laborDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-09-04'), (0, _util.momentDayOnly)('2016-09-05'), (0, _util.momentDayOnly)('2020-09-07')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Labor Day');
      });
    });
  });

  t.test('indigenousPeoplesDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.indigenousPeoplesDay));

    tt.test('returns the weekday closest to the next Indigenous People\'s Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.indigenousPeoplesDay)('2017-08-07'), (0, _holidays.indigenousPeoplesDay)('2016-07-11'), (0, _holidays.indigenousPeoplesDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-10-09'), (0, _util.momentDayOnly)('2016-10-10'), (0, _util.momentDayOnly)('2020-10-12')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Indigenous People\'s Day');
      });
    });
  });

  t.test('veteransDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.veteransDay));

    tt.test('returns the weekday closest to the next Veterans Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.veteransDay)('2017-08-07'), (0, _holidays.veteransDay)('2016-07-11'), (0, _holidays.veteransDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-11-10'), // the 11th would have been a Friday
      (0, _util.momentDayOnly)('2016-11-11'), (0, _util.momentDayOnly)('2020-11-11')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Veterans Day');
      });
    });
  });

  t.test('thanksgivingDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.thanksgivingDay));

    tt.test('returns the weekday closest to the next Thanksgiving Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.thanksgivingDay)('2017-08-07'), (0, _holidays.thanksgivingDay)('2016-07-11'), (0, _holidays.thanksgivingDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-11-23'), (0, _util.momentDayOnly)('2016-11-24'), (0, _util.momentDayOnly)('2020-11-26')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Thanksgiving Day');
      });
    });
  });

  t.test('thanksgivingFriday', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.thanksgivingFriday));

    tt.test('returns the weekday closest to the next Thanksgiving Friday after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.thanksgivingFriday)('2017-08-07'), (0, _holidays.thanksgivingFriday)('2016-07-11'), (0, _holidays.thanksgivingFriday)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-11-24'), (0, _util.momentDayOnly)('2016-11-25'), (0, _util.momentDayOnly)('2020-11-27')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Thanksgiving Friday');
      });
    });
  });

  t.test('christmasEve', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.christmasEve));

    tt.test('returns the weekday closest to the next Christmas Eve after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.christmasEve)('2017-08-07'), (0, _holidays.christmasEve)('2016-07-11'), (0, _holidays.christmasEve)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-12-25'), // the 24th would be a Sunday
      (0, _util.momentDayOnly)('2016-12-23'), // the 24th would be a Saturday
      (0, _util.momentDayOnly)('2020-12-24')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Christmas Eve');
      });
    });
  });

  t.test('christmasDay', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.christmasDay));

    tt.test('returns the weekday closest to the next Christmas Day after the given date', function (ttt) {
      ttt.plan(3);
      var nexts = [(0, _holidays.christmasDay)('2017-08-07'), (0, _holidays.christmasDay)('2016-07-11'), (0, _holidays.christmasDay)('2020-01-01')];
      var expecteds = [(0, _util.momentDayOnly)('2017-12-25'), (0, _util.momentDayOnly)('2016-12-26'), // the 25th would be a Sunday
      (0, _util.momentDayOnly)('2020-12-25')];
      nexts.forEach(function (d, i) {
        return ttt.true((0, _util.momentDayOnly)(d).isSame(expecteds[i]), 'should be next Christmas Day');
      });
    });
  });

  t.test('isHoliday', function (tt) {
    tt.test('throws if the given date is not a date', (0, _util.throwsIfInvalidDate)(_holidays.isHoliday));

    tt.test('returns true if the given date is a holiday', function (ttt) {
      ttt.plan(3);
      ttt.true((0, _holidays.isHoliday)('2017-09-04'), 'should consider Labor Day a holiday');
      ttt.true((0, _holidays.isHoliday)('2019-12-24'), 'should consider Christmas Eve a holiday');
      ttt.true((0, _holidays.isHoliday)('2022-03-31'), 'should consider Cesar Chavez Day a holiday');
    });
  });
});