"use strict";

var ACTIVE_TIMESHEET = "";
var HOUR = "";
var MINUTE = "";
var SECOND = "";
var MILISECOND = "";
var USERNAME = localStorage.getItem('username');
var PASSWORD = localStorage.getItem('password');
var CUSTOMERS = ""; //  [START] Timer Functionality

var cron;
$('#startBtn').click(function () {
  var date_now = new Date();
  localStorage.setItem('beginTimer', date_now.toISOString());
  startTimer();
  $('#startBtn').hide();
  $('#stopBtn').show();
});
$('#stopBtn').click(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stopTimer());

        case 2:
          $('#startBtn').show();
          $('#stopBtn').hide();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

function startTimer() {
  pause();
  cron = setInterval(function () {
    timer();
  }, 10);
}

function pause() {
  clearInterval(cron);
}

function resetTimer() {
  HOUR = 0;
  MINUTE = 0;
  SECOND = 0;
  MILISECOND = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
}

function stopTimer() {
  return regeneratorRuntime.async(function stopTimer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          resetTimer();
          pause();
          localStorage.setItem('beginTimer', '');
          _context2.next = 5;
          return regeneratorRuntime.awrap(stopTimesheet());

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function returnData(input) {
  return input > 10 ? input : "0".concat(input);
}

function timer() {
  if ((MILISECOND += 10) == 1000) {
    MILISECOND = 0;
    SECOND++;
  }

  if (SECOND == 60) {
    SECOND = 0;
    MINUTE++;
  }

  if (MINUTE == 60) {
    MINUTE = 0;
    HOUR++;
  }

  document.getElementById('hour').innerText = returnData(HOUR);
  document.getElementById('minute').innerText = returnData(MINUTE);
  document.getElementById('second').innerText = returnData(SECOND);
  localStorage.setItem("hour", HOUR);
  localStorage.setItem("minute", MINUTE);
  localStorage.setItem("second", SECOND);
  localStorage.setItem("milisecond", MILISECOND);
} // [END] Timer Functionality


function isServerSaved() {
  if (localStorage.getItem('kimaiserver')) {
    return true;
  }

  return false;
}

function isLoggedIn() {
  if (localStorage.getItem('username') && localStorage.getItem('password')) {
    USERNAME = localStorage.getItem('username');
    PASSWORD = localStorage.getItem('password');
    return true;
  }

  return false;
}

function getLogo() {
  return regeneratorRuntime.async(function getLogo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          url = localStorage.getItem('kimaiserver');
          _context3.next = 3;
          return regeneratorRuntime.awrap($.ajax({
            url: url,
            type: 'GET',
            success: function success() {
              return $('.login-logo img').attr('src');
            }
          }));

        case 3:
          return _context3.abrupt("return", _context3.sent);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function callKimaiApi(method, successHandler, errorHandler) {
  var domain;
  return regeneratorRuntime.async(function callKimaiApi$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          domain = '';

          if (localStorage.getItem('kimaiserver')) {
            domain = localStorage.getItem('kimaiserver');
          } else {
            domain = $('#inputDomain').val();
          }

          if (!isLoggedIn()) {
            USERNAME = $('#inputEmail').val();
            PASSWORD = $('#inputPassword').val();
          }

          _context4.next = 5;
          return regeneratorRuntime.awrap($.ajax({
            url: domain + '/api/' + method,
            type: 'GET',
            beforeSend: function beforeSend(request) {
              request.setRequestHeader("X-AUTH-USER", USERNAME);
              request.setRequestHeader("X-AUTH-TOKEN", PASSWORD);
            },
            headers: {
              'X-AUTH-USER': USERNAME,
              'X-AUTH-TOKEN': PASSWORD
            },
            success: successHandler,
            error: errorHandler
          }));

        case 5:
          return _context4.abrupt("return", _context4.sent);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function postKimaiApi(method, data, successHandler, errorHandler) {
  var domain, username, password, _username, _password;

  return regeneratorRuntime.async(function postKimaiApi$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          domain = '';

          if (localStorage.getItem('kimaiserver')) {
            domain = localStorage.getItem('kimaiserver');
          } else {
            domain = $('#inputDomain').val();
          }

          if (isLoggedIn()) {
            username = localStorage.getItem('username');
            password = localStorage.getItem('password');
          } else {
            _username = $('#inputEmail').val();
            _password = $('#inputPassword').val();
            localStorage.setItem('username', _username);
            localStorage.setItem('password', _password);
          }

          _context5.next = 5;
          return regeneratorRuntime.awrap($.ajax({
            url: domain + '/api/' + method,
            type: 'POST',
            beforeSend: function beforeSend(request) {
              request.setRequestHeader("X-AUTH-USER", USERNAME);
              request.setRequestHeader("X-AUTH-TOKEN", PASSWORD);
            },
            headers: {
              'X-AUTH-USER': USERNAME,
              'X-AUTH-TOKEN': PASSWORD
            },
            data: data,
            dataType: 'json',
            success: successHandler,
            error: errorHandler
          }));

        case 5:
          return _context5.abrupt("return", _context5.sent);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function patchKimaiApi(method, successHandler, errorHandler) {
  var domain, username, password, _username2, _password2;

  return regeneratorRuntime.async(function patchKimaiApi$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          domain = '';

          if (localStorage.getItem('kimaiserver')) {
            domain = localStorage.getItem('kimaiserver');
          } else {
            domain = $('#inputDomain').val();
          }

          if (isLoggedIn()) {
            username = localStorage.getItem('username');
            password = localStorage.getItem('password');
          } else {
            _username2 = $('#inputEmail').val();
            _password2 = $('#inputPassword').val();
            localStorage.setItem('username', _username2);
            localStorage.setItem('password', _password2);
          }

          _context6.next = 5;
          return regeneratorRuntime.awrap($.ajax({
            url: domain + '/api/' + method,
            type: 'PATCH',
            beforeSend: function beforeSend(request) {
              request.setRequestHeader("X-AUTH-USER", USERNAME);
              request.setRequestHeader("X-AUTH-TOKEN", PASSWORD);
            },
            headers: {
              'X-AUTH-USER': USERNAME,
              'X-AUTH-TOKEN': PASSWORD
            },
            dataType: 'json',
            success: successHandler,
            error: errorHandler
          }));

        case 5:
          return _context6.abrupt("return", _context6.sent);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getCurrentUser() {
  return regeneratorRuntime.async(function getCurrentUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!localStorage.getItem('current_user')) {
            _context7.next = 5;
            break;
          }

          CURRENT_USER = localStorage.getItem('current_user');
          return _context7.abrupt("return", parseInt(CURRENT_USER));

        case 5:
          _context7.next = 7;
          return regeneratorRuntime.awrap(callKimaiApi('users/me', function (result) {
            CURRENT_USER = parseInt(result.id);
            localStorage.setItem('current_user', result.id);
            return CURRENT_USER;
          }, function (xhr, err) {
            return false;
          }));

        case 7:
          return _context7.abrupt("return", _context7.sent);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function getProjects() {
  return regeneratorRuntime.async(function getProjects$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(callKimaiApi('projects', function (result) {
            PROJECTS = result; // localStorage.setItem('projects', JSON.stringify(PROJECTS));

            return result;
          }, function (xhr, err) {
            return false;
          }));

        case 2:
          return _context8.abrupt("return", _context8.sent);

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function getCustomers() {
  return regeneratorRuntime.async(function getCustomers$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(callKimaiApi('customers', function (result) {
            CUSTOMERS = result;
            return result;
          }, function (xhr, err) {
            return false;
          }));

        case 2:
          return _context9.abrupt("return", _context9.sent);

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function populateProjectsSelect() {
  var projects, customers, customers_ids, customers_projects, projectSelect, customerId, customer_name, _customer_color, _optgroup;

  return regeneratorRuntime.async(function populateProjectsSelect$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(getProjects());

        case 2:
          projects = _context10.sent;
          _context10.next = 5;
          return regeneratorRuntime.awrap(getCustomers());

        case 5:
          customers = _context10.sent;
          customers_ids = [];
          customers_projects = {};

          for (i = 0; i < customers.length; i++) {
            customers_projects[String(customers[i].id)] = [];
          }

          projectSelect = document.querySelector('#projectSelect');

          for (i = 0; i < projects.length; i++) {
            customer_id = projects[i].customer; // customers_projects_array.filter(function(item) {return item.id === customer_id}).map(function(item) {return item.projects})

            project = {};
            project['name'] = projects[i]['name'];
            project['id'] = projects[i]['id'];
            customers_projects[String(customer_id)].push(project); // option.text = projects[i]['name'];
            // option.value = projects[i]['id'];
            // projectSelect.appendChild(option);
          }

          i = 0;

        case 12:
          if (!(i < Object.entries(customers_projects).length)) {
            _context10.next = 33;
            break;
          }

          customer_projects = Object.entries(customers_projects)[i];
          customerId = '';
          customer_name = '';
          _customer_color = '';
          j = 0;

        case 18:
          if (!(j < customers.length)) {
            _context10.next = 27;
            break;
          }

          if (!(String(customers[j].id) == customer_projects[0])) {
            _context10.next = 24;
            break;
          }

          customerId = customers[j].id;
          customer_name = customers[j].name;
          _customer_color = customers[j].color;
          return _context10.abrupt("break", 27);

        case 24:
          j++;
          _context10.next = 18;
          break;

        case 27:
          _optgroup = document.createElement('optgroup');
          _optgroup.label = customer_name; // optgroup.classList.add('group-' + String(customerId));
          // let dot = document.createElement('div');
          // dot.style = 'background-color:' + customer_color + ';padding: 2px;border-radius: 50%;display: inline-block;width: 2px;height: 2px;'
          // optgroup.style = 'color: ' + customer_color + ' !important;';

          for (k = 0; k < customer_projects[1].length; k++) {
            option = document.createElement('option');
            option.text = customer_projects[1][k]['name'];
            option.value = customer_projects[1][k]['id']; // option.style = 'color: ' + customer_color + ' !important;';
            // optgroup.appendChild(dot);

            _optgroup.appendChild(option);

            projectSelect.appendChild(_optgroup);
          }

        case 30:
          i++;
          _context10.next = 12;
          break;

        case 33:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function getActivities() {
  return regeneratorRuntime.async(function getActivities$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(callKimaiApi('activities', function (result) {
            return result;
          }, function (xhr, err) {
            return false;
          }));

        case 2:
          return _context11.abrupt("return", _context11.sent);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function populateActivitiesSelect() {
  var activities, activitySelect;
  return regeneratorRuntime.async(function populateActivitiesSelect$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(getActivities());

        case 2:
          activities = _context12.sent;
          activitySelect = document.querySelector('#activitySelect');

          for (i = 0; i < activities.length; i++) {
            option = document.createElement('option');
            option.text = activities[0].name;
            option.value = activities[0].id;
            activitySelect.appendChild(option);
          }

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function getActiveTimesheet() {
  return regeneratorRuntime.async(function getActiveTimesheet$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(callKimaiApi('timesheets/active', function (result) {
            return result;
          }, function (xhr, err) {
            return false;
          }));

        case 2:
          return _context13.abrupt("return", _context13.sent);

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function populateTimesheetsSelect() {
  var timesheets, timesheetSelect, _option;

  return regeneratorRuntime.async(function populateTimesheetsSelect$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(getActiveTimesheet());

        case 2:
          timesheets = _context14.sent;
          timesheetSelect = document.querySelector('#timesheetSelect');

          for (i = 0; i < timesheets.length; i++) {
            _option = document.createElement('option');
            _option.text = timesheets[i].description;
            _option.value = timesheets[i].id;
            timesheetSelect.appendChild(_option);
          }

          localStorage.setItem('timesheets', JSON.stringify(timesheets));

        case 6:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function msToTime(duration) {
  var miliseconds = parseInt(duration % 1000 / 100),
      seconds = Math.floor(duration / 1000 % 60),
      minutes = Math.floor(duration / (1000 * 60) % 60),
      hours = Math.floor(duration / (1000 * 60 * 60) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  time = {};
  time['hours'] = hours;
  time['minutes'] = minutes;
  time['seconds'] = seconds;
  time['miliseconds'] = miliseconds;
  return time;
}

function stopTimesheet() {
  var timesheets, method, stopTimesheet;
  return regeneratorRuntime.async(function stopTimesheet$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(getActiveTimesheet());

        case 2:
          timesheets = _context15.sent;
          timesheet = timesheets[0];
          method = 'timesheets/' + timesheet.id + '/stop';
          _context15.next = 7;
          return regeneratorRuntime.awrap(patchKimaiApi(method, function (result) {
            $('#startBtn').show();
            $('#stopBtn').hide();
            return result;
          }, function (xhr, err) {
            return false;
          }));

        case 7:
          stopTimesheet = _context15.sent;

        case 8:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function checkActiveTimesheet() {
  var activeTimesheets;
  return regeneratorRuntime.async(function checkActiveTimesheet$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(getActiveTimesheet());

        case 2:
          activeTimesheets = _context16.sent;
          activeTimesheet = activeTimesheets[0];
          ACTIVE_TIMESHEET = activeTimesheet;

          if (activeTimesheet) {
            _context16.next = 9;
            break;
          }

          // $('#newTimesheet').show();
          $('#startBtn').show();
          $('#stopBtn').hide();
          return _context16.abrupt("return");

        case 9:
          description = activeTimesheet['description'];
          $('#description').val(description);
          beginTime = new Date(activeTimesheet.begin);
          time = msToTime(Date.now() - beginTime.getTime());
          HOUR = parseInt(time['hours']);
          MINUTE = parseInt(time['minutes']);
          SECOND = parseInt(time['seconds']);
          MILISECOND = parseInt(time['miliseconds']);
          $('#startBtn').hide();
          $('#stopBtn').show();
          startTimer();

        case 20:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function startTimesheet() {
  return regeneratorRuntime.async(function startTimesheet$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          date_now = new Date();
          project = document.getElementById('projectSelect').value;
          activity = document.getElementById('activitySelect').value;
          description = document.getElementById('description').value;
          _context17.next = 6;
          return regeneratorRuntime.awrap(getCurrentUser());

        case 6:
          user = _context17.sent;
          user = parseInt(user);
          data = {
            "begin": date_now.toISOString(),
            "end": "",
            "project": parseInt(project),
            "activity": parseInt(activity),
            "description": description,
            "tags": "",
            "fixedRate": 0,
            "hourlyRate": 0,
            "user": user,
            "exported": true
          };

          if (project && activity && description) {
            $('#fillFieldsAlert').hide();
            $('#saveTimesheetBtn').hide();
            postKimaiApi('timesheets', data, function (result) {
              return result;
            }, function (xhr, err) {
              return false;
            });
          } else {
            $('#fillFieldsAlert').show();
            $('#saveTimesheetBtn').show();
          }

          resetTimer();
          startTimer();
          $('#startBtn').hide();
          $('#stopBtn').show();

        case 14:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function saveTimesheet() {
  return regeneratorRuntime.async(function saveTimesheet$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          begin = localStorage.getItem('beginTimer');

          if (begin) {
            _context18.next = 3;
            break;
          }

          return _context18.abrupt("return");

        case 3:
          project = document.getElementById('projectSelect').value;
          activity = document.getElementById('activitySelect').value;
          description = document.getElementById('description').value;
          _context18.next = 8;
          return regeneratorRuntime.awrap(getCurrentUser());

        case 8:
          user = _context18.sent;
          data = {
            "begin": begin,
            "end": "",
            "project": parseInt(project),
            "activity": parseInt(activity),
            "description": description,
            "tags": "",
            "fixedRate": 0,
            "hourlyRate": 0,
            "user": parseInt(user.id),
            "exported": true
          };

          if (project && activity && description) {
            $('#fillFieldsAlert').hide();
            $('#saveTimesheetBtn').hide();
            postKimaiApi('timesheets', data, function (result) {
              return result;
            }, function (xhr, err) {
              return false;
            });
          } else {
            $('#fillFieldsAlert').show();
            $('#saveTimesheetBtn').show();
          }

          stopTimer();

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  });
}

$(function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          $('#loginForm').on('submit', function _callee2(event) {
            return regeneratorRuntime.async(function _callee2$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    event.preventDefault();
                    event.stopPropagation();
                    $('#loginButton').text('Loading...');
                    _context19.next = 5;
                    return regeneratorRuntime.awrap(callKimaiApi('version', function (result) {
                      localStorage.setItem('username', USERNAME);
                      localStorage.setItem('password', PASSWORD);
                      $('#loginButton').text('Success');
                      loggedInPage();
                      initFunctions();
                      return false;
                    }, function (xhr, err) {
                      localStorage.setItem('username', '');
                      localStorage.setItem('password', '');
                      $('#loginButton').text('Try again!');
                    }));

                  case 5:
                    return _context19.abrupt("return", false);

                  case 6:
                  case "end":
                    return _context19.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
});

function initTimer() {
  beginTimer = localStorage.getItem('beginTimer');

  if (!beginTimer) {
    return;
  }

  beginTimer = new Date(beginTimer);
  date_now = new Date();
  duration = date_now.getTime() - beginTimer.getTime();
  time = msToTime(duration);
  HOUR = time.hour;
  MINUTE = time.minute;
  SECOND = time.second;
  MILISECOND = time.milisecond;
  startTimer();
}

function initFunctions() {
  return regeneratorRuntime.async(function initFunctions$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          if (!localStorage.getItem('current_user')) {
            getCurrentUser();
          } else {
            CURRENT_USER = parseInt(localStorage.getItem('current_user'));
          }

          getCustomers();
          _context21.next = 4;
          return regeneratorRuntime.awrap(checkActiveTimesheet());

        case 4:
          _context21.next = 6;
          return regeneratorRuntime.awrap(populateActivitiesSelect());

        case 6:
          _context21.next = 8;
          return regeneratorRuntime.awrap(populateProjectsSelect());

        case 8:
          for (i = 0; i < CUSTOMERS.length; i++) {
            customer = CUSTOMERS[i];
            console.log(customer);
            customer_color = customer.color;
            optgroup = $('.group-' + String(customer.id)); // dot = document.createElement('div');

            optgroup.style = 'background-color:' + customer_color + ' !important;';
            console.log(optgroup); // optgroup.insertBefore(dot);
          } // initTimer();


        case 9:
        case "end":
          return _context21.stop();
      }
    }
  });
}

function setServer() {
  return regeneratorRuntime.async(function setServer$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          server = $('#inputDomain').val();
          localStorage.setItem('kimaiserver', server);
          document.location.reload(); // logo = await getLogo();
          // localStorage.setItem('logo', logo);
          // $('#logoImg').attr('src', logo);

        case 3:
        case "end":
          return _context22.stop();
      }
    }
  });
}

function logout() {
  localStorage.setItem('username', '');
  localStorage.setItem('password', '');
  localStorage.setItem('kimaiserver', '');
  localStorage.setItem('current_user', '');
  document.location.reload();
}

function startPage() {
  $('#logoutLink').hide();
  $('#loginPage').hide();
  $('#saveTimesheetBtn').hide();
  $('#newTimesheet').hide();
  $('#timerContainer').hide();
  $('#startBtn').hide();
  $('#stopBtn').hide();
}

function serverPage() {
  startPage();
  $('#serverPage').show();
}

function loginPage() {
  $('#logoutWrapper').show();
  $('#serverPage').hide();
  $('#loginPage').show();
}

function loggedInPage() {
  $('#stopBtn').hide();
  $('#logoutLink').show();
  $('#timerContainer').show();
  $('#serverPage').hide();
  $('#loginPage').hide();
  $('#loginBtn').hide();
  $('#newTimesheet').show();
  $('#startBtn').show();
}

$(document).ready(function () {
  startPage();
  document.getElementById('startBtn').addEventListener("click", startTimesheet);
  document.getElementById('stopBtn').addEventListener("click", stopTimer);
  document.getElementById('serverBtn').addEventListener("click", setServer);
  document.getElementById('logoutLink').addEventListener("click", logout);
  $('select').select2({
    style: 'background-color: #333333;',
    width: '100%'
  });

  try {
    $('#newTimesheet').hide();

    if (!isServerSaved()) {
      serverPage();
    } else if (!isLoggedIn()) {
      loginPage();
    } else {
      loggedInPage();
      initFunctions();
    }
  } catch (e) {
    console.log(e);
  }
});