const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./gas-tracker-80113-export.json', 'utf8'));
const pathToFix = 'entries';
let prevDate = null;
let sameCount = 0;

const newObj = Object.entries(data[pathToFix]).reduce((acc, curr) => {
    let {
        date,
        ...rest
    } = curr[1];
    let newDate = null;
    if (date === prevDate) {
        sameCount++;
        newDate = (new Date(date)).getTime() + (60000 * sameCount);
    } else {
        sameCount = 0;
        newDate = (new Date(date)).getTime();
    }
    prevDate = date;

    delete rest.date; // remove old date format
    acc[curr[0]] = {
        ...rest,
        timestamp: newDate, // add new date format
        key: curr[0] // add key
    }

    return acc;
}, {});
fs.writeFileSync(`./${pathToFix}.json`, JSON.stringify(newObj));