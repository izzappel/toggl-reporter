# toggl-reporter

## Getting started
1. add config.js with api token
```
module.exports = {
  togglApiToken: '123123123',
};
```

2. run reports


## Existing reports
### daily
Prints a table with all tasks for the current day.

```
node reports/daily
```

### weekly
Prints for each day a table with all tasks for the current week.
```
node reports/weekly
```

### weeklyTotal
Prints a table with all tasks for the current week.
```
node reports/weeklyTotal
```
