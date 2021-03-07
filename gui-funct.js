var is = require("electron-is");

/* available contexts */
var contexts = [{
  context: 'backend',
  war: 'pelican'
}, {
  context: 'frontend',
  war: 'PelicanFE'
}, {
  context: 'auth',
  war: 'auth'
}, {
  context: 'notifications',
  war: 'notifications'
}, {
  context: 'report',
  war: 'reports'
}]

/* active operating system */
function showOS() {
  if (is.windows()) console.log("Windows Detected")
  if (is.macOS()) console.log("Apple OS Detected")
  if (is.linux()) console.log("Linux Detected")
}

/* fetch branch listing for dropdown */
function fetchBranches(context) {
  if (localStorage[context + '-file'] !== undefined)
    showBranches(localStorage[context + '-file'], document.getElementById(context + '-dropdown'))
  else document.getElementById(context + '-dropdown').disabled = true;
}

/* execute script for fetching branch listing */
function showBranches(dir, element) {
  var process = require('child_process');
  var cmd = ((is.windows()) ? 'test.bat' : './branch.sh');
  var child = process.spawn(cmd, [dir]);

  child.on('error', function (err) {
    console.log(err.stack);
  });

  child.stdout.on('data', function (data) {
    var set = data.toString().split(" ")
    element.disabled = set.length <= 0;
    element.length = 0;

    for (var i = 0; i < set.length; i++) {
      var opt = document.createElement("option")
      opt.text = set[i]
      element.add(opt)
    }
  });
}

/* update path for fetching context listing */
function updatePath(context) {
  localStorage[context + '-file'] = document.getElementById(context + '-file').files[0].path;
  fetchBranches(context);
}

/* process init for data in dropdowns */
function init() {
  for (var i = 0; i < contexts.length; i++)
    fetchBranches(contexts[i].context)
}

/* initialize context */
function start(entity) {
  var process = require('child_process');
  var cmd = entity ? ((is.windows()) ? 'test.bat' : './scripts/startmaven.sh') : ((is.windows()) ? 'test.bat' : './scripts/startgulp.sh')
  var child = process.spawn(cmd, [
    localStorage[context + '-file'],
    document.getElementById(context + '-dropdown').value,
    'pelican' + '.war',
    ''
  ]);

  child.on('error', function (err) {
    console.log(err.stack);
  });

  child.stdout.on('data', function (data) {
  });
}

/* close active context */
function stop(entity) {
  if (entity) { // be

  } else { // fe

  }
}

/* restart context */
function restart(entity) {
  if (entity) { // be

  } else { // fe

  }
}
