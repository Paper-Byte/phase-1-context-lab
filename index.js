const createEmployeeRecord = (employeeArray) => {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (employeeRecords) => {
  const newEmployeeRecords = employeeRecords.map((element) =>
    createEmployeeRecord(element)
  );
  return newEmployeeRecords;
};

const createTimeInEvent = function (timeStamp) {
  const newTimeInEvent = {
    type: 'TimeIn',
    hour: parseInt(timeStamp.slice(11)),
    date: timeStamp.slice(0, 10),
  };
  this.timeInEvents.push(newTimeInEvent);
  return this;
};

const createTimeOutEvent = function (timeStamp) {
  const newTimeOutEvent = {
    type: 'TimeOut',
    hour: parseInt(timeStamp.slice(11)),
    date: timeStamp.slice(0, 10),
  };
  this.timeOutEvents.push(newTimeOutEvent);
  return this;
};

const hoursWorkedOnDate = function (dateStamp) {
  const timeInArray = this.timeInEvents;
  const timeInDay = timeInArray
    .filter((element) => element.date === dateStamp)
    .map((element) => element.hour);
  const timeInHour = parseInt(timeInDay);

  const timeOutArray = this.timeOutEvents;
  const timeOutDay = timeOutArray
    .filter((element) => element.date === dateStamp)
    .map((element) => element.hour);
  const timeOutHour = parseInt(timeOutDay);

  return (timeOutHour - timeInHour) / 100;
};

const wagesEarnedOnDate = function (dateStamp) {
  return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp);
};

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  const filteredArray = srcArray.find(
    (e) => e.firstName === firstName
  );
  if (filteredArray === {}) {
    return undefined;
  }
  return filteredArray;
};

const calculatePayroll = function (employeeRecords) {
  const payRoll = employeeRecords.reduce(
    (total, element) => (total += allWagesFor.call(element)),
    0
  );
  return payRoll;
};
