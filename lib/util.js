'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwsIfInvalidDates = exports.throwsIfInvalidDate = exports.formatDate = exports.momentDayOnly = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var momentDayOnly = exports.momentDayOnly = function momentDayOnly(date) {
  var dayOnly = (0, _moment2.default)(date);
  if (!dayOnly.isValid()) {
    throw new Error(date + ' is not a valid date');
  }
  return dayOnly.utc().hour(0).minute(0).second(0).millisecond(0);
};

var formatDate = exports.formatDate = function formatDate(date) {
  return (0, _moment2.default)(date).utc().format('ddd DD MMM YYYY');
};

var throwsIfInvalidDate = exports.throwsIfInvalidDate = function throwsIfInvalidDate(func) {
  return function (ttt) {
    ttt.plan(1);
    ttt.throws(function () {
      return func('xyz');
    });
  };
};

var throwsIfInvalidDates = exports.throwsIfInvalidDates = function throwsIfInvalidDates(func) {
  return function (ttt) {
    ttt.plan(2);
    ttt.throws(function () {
      return func('xyz', new Date());
    });
    ttt.throws(function () {
      return func(new Date(), 'xyz');
    });
  };
};