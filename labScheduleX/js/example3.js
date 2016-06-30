// var tasks = [
// {"startDate":new Date("Sun Dec 09 01:36:45 EST 2012"),"endDate":new Date("Sun Dec 09 02:36:45 EST 2012"),"taskName":"E Job","status":"RUNNING"}];

var tasks = [
{"startDate":new Date("Thu June 30 08:30:00 EST 2016"),"endDate":new Date("Thu June 30 19:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Thu June 30 07:30:00 EST 2016"),"endDate":new Date("Thu June 30 20:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Thu June 30 08:00:00 EST 2016"),"endDate":new Date("Thu June 30 19:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Thu June 30 09:00:00 EST 2016"),"endDate":new Date("Thu June 30 21:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Thu June 30 08:45:00 EST 2016"),"endDate":new Date("Thu June 30 22:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Fri July 1 08:30:00 EST 2016"),"endDate":new Date("Fri July 1 19:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Fri July 1 07:30:00 EST 2016"),"endDate":new Date("Fri July 1 20:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Fri July 1 08:00:00 EST 2016"),"endDate":new Date("Fri July 1 19:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Fri July 1 09:00:00 EST 2016"),"endDate":new Date("Fri July 1 21:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Fri July 1 08:45:00 EST 2016"),"endDate":new Date("Fri July 1 22:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Sat July 2 08:30:00 EST 2016"),"endDate":new Date("Sat July 2 18:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Sat July 2 07:30:00 EST 2016"),"endDate":new Date("Sat July 2 19:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Sat July 2 08:00:00 EST 2016"),"endDate":new Date("Sat July 2 18:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Sat July 2 09:00:00 EST 2016"),"endDate":new Date("Sat July 2 21:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Sat July 2 08:45:00 EST 2016"),"endDate":new Date("Sat July 2 20:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Sun July 3 08:30:00 EST 2016"),"endDate":new Date("Sun July 3 19:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Sun July 3 07:30:00 EST 2016"),"endDate":new Date("Sun July 3 20:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Sun July 3 08:00:00 EST 2016"),"endDate":new Date("Sun July 3 19:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Sun July 3 09:00:00 EST 2016"),"endDate":new Date("Sun July 3 23:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Sun July 3 08:45:00 EST 2016"),"endDate":new Date("Sun July 3 22:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},
{"startDate":new Date("Mon July 4 08:30:00 EST 2016"),"endDate":new Date("Mon July 4 18:00:00 EST 2016"),"taskName":"Arnhold Hall Labs","status":"RUNNING"},
{"startDate":new Date("Mon July 4 07:30:00 EST 2016"),"endDate":new Date("Mon July 4 19:00:00 EST 2016"),"taskName":"Vera List Lab","status":"RUNNING"},
{"startDate":new Date("Mon July 4 08:00:00 EST 2016"),"endDate":new Date("Mon July 4 18:30:00 EST 2016"),"taskName":"List Innovation Center","status":"RUNNING"},
{"startDate":new Date("Mon July 4 09:00:00 EST 2016"),"endDate":new Date("Mon July 4 21:30:00 EST 2016"),"taskName":"Parsons East Lab","status":"RUNNING"},
{"startDate":new Date("Mon July 4 08:45:00 EST 2016"),"endDate":new Date("Mon July 4 20:00:00 EST 2016"),"taskName":"The University Center","status":"RUNNING"},

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