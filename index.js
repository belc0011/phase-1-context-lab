const createEmployeeRecord = function (array) {
    const employeeRecord = {firstName: array[0], familyName: array[1],
    title: array[2], payPerHour: array[3], timeInEvents: [],
    timeOutEvents: []}

    return employeeRecord;
}
const sampleRec = createEmployeeRecord(["Monica", "Garcia", "Teacher", 20]);

function createEmployeeRecords(arrayOfArrays) {
    const arrayOfRecords = []
    for (let i = 0; i < arrayOfArrays.length; i++) {
        arrayOfRecords[i] = createEmployeeRecord(arrayOfArrays[i]);
    }
    return arrayOfRecords;
}

function createTimeInEvent(dateStamp) {
    let dateStampHourBeg;
    let dateStampHour;
    if (dateStamp.length === 15) {
        dateStampHourBeg = dateStamp.substr(11, 2);
    }
    else {dateStampHourBeg = dateStamp.substr(11, 1)}
    dateStampHour = dateStampHourBeg*100

    const dateStampDate = dateStamp.substr(0, 10);
    const timeInObject = {type: "TimeIn", hour: dateStampHour, 
    date: dateStampDate};
    let timeInEventsArray = this['timeInEvents'];
    timeInEventsArray.push(timeInObject);
    this['timeInEvents'] = timeInEventsArray;
    
    return this;
}

function createTimeOutEvent(dateStamp) {
    let dateStampHourBeg;
    let dateStampHour;
    if (dateStamp.length === 15) {
        dateStampHourBeg = dateStamp.substr(11, 2);
    }
    else {dateStampHourBeg = dateStamp.substr(11, 1)}
    dateStampHour = dateStampHourBeg*100

    const dateStampDate = dateStamp.substr(0, 10);
    const timeOutObject = {type: "TimeOut", hour: dateStampHour, 
    date: dateStampDate};
    let timeOutEventsArray = this['timeOutEvents'];
    timeOutEventsArray.push(timeOutObject);
    this['timeOutEvents'] = timeOutEventsArray;
    
    return this;
}

function hoursWorkedOnDate(dateOfInterest) {
    const timeInArray = this['timeInEvents'];
    const timeOutArray = this['timeOutEvents'];
    let timeStart;
    let timeEnd;
    let hoursWorked;
    for (let workObject of timeInArray) {
        if (workObject['date'] === dateOfInterest) {
            timeStart = workObject['hour']
        }
    }
    for (let workObject of timeOutArray) {
        if (workObject['date'] === dateOfInterest) {
            timeEnd = workObject['hour']
        }
    }
    hoursWorked = (timeEnd - timeStart)/100;
    return hoursWorked
}

function findEmployeeByFirstName(arrayOfRecords, firstNameInt) {
    let employeeRecordOfInterest;
    employeeRecordOfInterest = arrayOfRecords.find(item => item.firstName === firstNameInt)
    return employeeRecordOfInterest;
}
function wagesEarnedOnDate(date) {
    const wagesEarnedByDate = hoursWorkedOnDate.call(this, date) * this['payPerHour']
    return wagesEarnedByDate
}
const allWagesFor = function () {
    
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function calculatePayroll(empRecArray) {
    let totEmpWagesOwed = 0;
    for (let empRecord of empRecArray) {
        totEmpWagesOwed += allWagesFor.call(empRecord)
    }
    return totEmpWagesOwed;
}

