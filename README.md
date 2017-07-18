# guild-dates

[![Codeship Status](https://app.codeship.com/projects/50f27480-4e32-0135-d0e4-669f3827cd30/status?branch=master)](https://app.codeship.com/projects/233552)
[![Code Climate GPA](https://codeclimate.com/github/LearnersGuild/guild-dates/badges/gpa.svg)](https://codeclimate.com/github/LearnersGuild/guild-dates)
[![Code Climate Issue Count](https://codeclimate.com/github/LearnersGuild/guild-dates/badges/issue_count.svg)](https://codeclimate.com/github/LearnersGuild/guild-dates)
[![Test Coverage](https://codeclimate.com/github/LearnersGuild/guild-dates/badges/coverage.svg)](https://codeclimate.com/github/LearnersGuild/guild-dates/coverage)

## Getting Started

1. Install the module:

    ```bash
    npm install --save @learnersguild/guild-dates
    ```

2. Use the APIs, e.g.:

    ```bash
    $ node
    > var guildDates = require('@learnersguild/guild-dates')
    > guildDates
    { summerBreakWeekMonday: [Getter],
      winterBreakWeekMonday: [Getter],
      summerBreakWeekDays: [Getter],
      winterBreakWeekDays: [Getter],
      breakWeekDaysBetween: [Getter],
      isDuringBreakWeek: [Getter],
      newYearsDay: [Getter],
      mlkJrDay: [Getter],
      presidentsDay: [Getter],
      cesarChavezDay: [Getter],
      memorialDay: [Getter],
      independenceDay: [Getter],
      laborDay: [Getter],
      indigenousPeoplesDay: [Getter],
      veteransDay: [Getter],
      thanksgivingDay: [Getter],
      thanksgivingFriday: [Getter],
      christmasEve: [Getter],
      christmasDay: [Getter],
      holidaysBetween: [Getter],
      isHoliday: [Getter],
      nextStartDate: [Getter],
      defaultStartDate: [Getter],
      MAX_PROGRAM_WEEKS: [Getter],
      CANCELLATION_WEEKS: [Getter],
      expectedExitDate: [Getter],
      defaultExpectedExitDate: [Getter],
      isaCancellationDate: [Getter],
      defaultISACancellationDate: [Getter],
      stipendPaymentDatesBetween: [Getter],
      momentDayOnly: [Getter],
      formatDate: [Getter],
      throwsIfInvalidDate: [Getter] }
      ```

## Key Dependencies`

- [moment.js][moment]

## LICENSE

See the [LICENSE](./LICENSE) file.


[moment]: https://momentjs.com
