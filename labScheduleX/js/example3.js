// var tasks = [
// {"startDate":new Date("Sun Dec 09 01:36:45 EST 2012"),"endDate":new Date("Sun Dec 09 02:36:45 EST 2012"),"taskName":"E Job","status":"RUNNING"}];

var tasks = [
{"startDate":new Date("Fri June 10 08:30:00 EST 2016"),"endDate":new Date("Fri June 10 19:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Fri June 10 07:30:00 EST 2016"),"endDate":new Date("Fri June 10 20:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Fri June 10 08:00:00 EST 2016"),"endDate":new Date("Fri June 10 19:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Fri June 10 09:00:00 EST 2016"),"endDate":new Date("Sat June 11 01:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Fri June 10 08:45:00 EST 2016"),"endDate":new Date("Fri June 10 22:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Sat June 11 08:30:00 EST 2016"),"endDate":new Date("Sat June 11 18:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Sat June 11 07:30:00 EST 2016"),"endDate":new Date("Sat June 11 19:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Sat June 11 08:00:00 EST 2016"),"endDate":new Date("Sat June 11 18:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Sat June 11 09:00:00 EST 2016"),"endDate":new Date("Sat June 11 21:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Sat June 11 08:45:00 EST 2016"),"endDate":new Date("Sat June 11 20:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Fri June 12 08:30:00 EST 2016"),"endDate":new Date("Fri June 12 19:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Fri June 12 07:30:00 EST 2016"),"endDate":new Date("Fri June 12 20:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Fri June 12 08:00:00 EST 2016"),"endDate":new Date("Fri June 12 19:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Fri June 12 09:00:00 EST 2016"),"endDate":new Date("Fri June 12 23:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Fri June 12 08:45:00 EST 2016"),"endDate":new Date("Fri June 12 22:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Sat June 13 08:30:00 EST 2016"),"endDate":new Date("Sat June 13 18:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Sat June 13 07:30:00 EST 2016"),"endDate":new Date("Sat June 13 19:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Sat June 13 08:00:00 EST 2016"),"endDate":new Date("Sat June 13 18:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Sat June 13 09:00:00 EST 2016"),"endDate":new Date("Sat June 13 21:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Sat June 13 08:45:00 EST 2016"),"endDate":new Date("Sat June 13 20:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},

];







var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

// var taskNames = [ "D Job", "P Job", "E Job", "A Job", "N Job" ];
var taskNames = [ "Arnhold Hall Labs", "Vera List Lab", "List Innovation Center", "Parsons East Lab", "The University Center" ];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%H:%M";
var timeDomainString = "1day";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format).height(450).width(800);


gantt.timeDomainMode("fixed");
changeTimeDomain(timeDomainString);

gantt(tasks);

function changeTimeDomain(timeDomainString) {
    this.timeDomainString = timeDomainString;
    switch (timeDomainString) {
    case "1hr":
  format = "%H:%M";
  // gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -1), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.hour.offset(Date.now(), 1) ]);
  break;
    case "3hr":
  format = "%H:%M";
  // gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -3), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.hour.offset(Date.now(), 3) ]);
  break;

    case "6hr":
  format = "%H:%M";
  // gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -6), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.hour.offset(Date.now(), 6) ]);
  break;

    case "1day":
  format = "%H:%M";
  // gantt.timeDomain([ d3.time.day.offset(getEndDate(), -1), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.day.offset(Date.now(), 1) ]);
  break;

    case "1week":
  format = "%m/%d";
  // gantt.timeDomain([ d3.time.day.offset(getEndDate(), -7), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.day.offset(Date.now(), 7) ]);
  break;

    case "1month":
  format = "%m/%d";
  // gantt.timeDomain([ d3.time.day.offset(getEndDate(), -30), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.day.offset(Date.now(), 30) ]);
  break;

    case "3months":
  format = "%m/%d";
  // gantt.timeDomain([ d3.time.day.offset(getEndDate(), -30), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.day.offset(Date.now(), 90) ]);
  break;

    case "1year":
  format = "%m/%d";
  // gantt.timeDomain([ d3.time.day.offset(getEndDate(), -30), getEndDate() ]);
  gantt.timeDomain([ Date.now(), d3.time.day.offset(Date.now(), 360) ]);
  break;


    }
    gantt.tickFormat(format);
    gantt.redraw(tasks);
}

function getEndDate() {
    var lastEndDate = Date.now();
    if (tasks.length > 0) {
  lastEndDate = tasks[tasks.length - 1].endDate;
    }

    return lastEndDate;
}

function addTask() {

    var lastEndDate = getEndDate();
    var taskStatusKeys = Object.keys(taskStatus);
    var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
    var taskName = taskNames[Math.floor(Math.random() * taskNames.length)];

    tasks.push({
  "startDate" : d3.time.hour.offset(lastEndDate, Math.ceil(1 * Math.random())),
  "endDate" : d3.time.hour.offset(lastEndDate, (Math.ceil(Math.random() * 3)) + 1),
  "taskName" : taskName,
  "status" : taskStatusName
    });

    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};

function removeTask() {
    tasks.pop();
    changeTimeDomain(timeDomainString);
    gantt.redraw(tasks);
};