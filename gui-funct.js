var is = require("electron-is");
const dialog = require('electron');

function showOS() {
  if (is.windows()) console.log("Windows Detected")
  if (is.macOS()) console.log("Apple OS Detected")
  if (is.linux()) console.log("Linux Detected")
}

function startProcess(context) {
  // 1-fe, 2-be, 3-auth, 4-reports, 5-notifs
  switch (context) {
    case 1:
      console.log('Starting frontend war build')
      break;

    case 2:
      console.log('Starting backend war build')
      break;

    case 3:
      console.log('Starting auth war build')
      break;

    case 4:
      console.log('Starting reports war build')
      break;

    case 5:
      console.log('Starting notifications war build')
      break;

    default:
      console.log('Error in building war')
      break;

  }
}

function fetchBranches(context) {
  if (localStorage[context + '-file'] !== undefined)
    showBranches(localStorage[context + '-file'], document.getElementById(context + '-dropdown'))
  else
    document.getElementById(context + '-dropdown').disabled = true;
}

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

function updatePath(context) {
  localStorage[context + '-file'] = document.getElementById(context + '-file').files[0].path;
  fetchBranches('frontend');
}

function init() {
  fetchBranches('frontend')
  fetchBranches('backend')
  fetchBranches('auth')
  fetchBranches('report')
  fetchBranches('notifications')
}

function backgroundProcess() {
  showOS();
}
