function doGet() {

  // For moveMailFromAllMail script
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(MOVE_MAIL_SCRIPT_INDEX, 0);

  // Install trigger
  ScriptApp.newTrigger('everyMinute')
    .timeBased()
    .everyMinutes(1)
    .create();

  // Show success page
  return HtmlService.createHtmlOutputFromFile('index');
}

function everyMinute() {
  moveMailFromAllMail();
}


//===================================================================
//                     MOVING MAIL FROM ALL_MAIL LABEL
//===================================================================

var X_LABEL_NAME = 'X'
var MOVE_MAIL_SCRIPT_INDEX = 'moveMailFromAllMailScriptIndex'

function moveMailFromAllMail () {
  var scriptProperties = PropertiesService.getScriptProperties();
  var x_label = GmailApp.createLabel(X_LABEL_NAME);
  var inc = 100;
  var start = parseInt(scriptProperties.getProperty(MOVE_MAIL_SCRIPT_INDEX));
  var threads = GmailApp.getInboxThreads(start, inc);
  var allMailThreads = threads.filter(function (thread) {
    return thread.getLabels().length == 0
  });
  x_label.addToThreads(allMailThreads);
  if (threads.length == inc){
    start += inc;
    scriptProperties.setProperty(MOVE_MAIL_SCRIPT_INDEX, start);
  } else {
    scriptProperties.setProperty(MOVE_MAIL_SCRIPT_INDEX, 0);
  }
}
