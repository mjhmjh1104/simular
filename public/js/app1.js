var gravity = 9.8;
var meter = 20;
var body = $('#body')[0];
var earth = $('#earth')[0];
var origin = $('#origin')[0];
var position = 0;
var velocity = 0;
var interval;
var mass = 10;
var force;
var drag = 1.05;
var acceleration;
var length = 2;
var density = 1.25;
var densityF = 0;
var gravityDiv = $('#gravity');
var massDiv = $('#mass');
var dragDiv = $('#drag');
var densityDiv = $('#density');
var pxDiv = $('#px');
var lengthDiv = $('#length');
var infoDiv = $('#moreInfo');
var dataes = [];
var sliders = $('.slider');
var checkbox = $('#sGround');
var button = $('#buttonStart');
var groundAvaliable = true;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = new google.visualization.arrayToDataTable([
    [ '시간', '속도' ],
    [ 0, 0 ]
  ]);
  dataes.forEach(function(item) {
    data.addRow(item);
  });
  var options = {'title':'속도-시간 그래프',
                 'width':400,
                 'height':300};
  chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function apply() {
  body.style.width = length * meter + 'px';
  body.style.height = length * meter + 'px';
  body.style.left = 'calc(50% - ' + length * meter / 2 + 'px)';
  if (groundAvaliable) {
    earth.style.display = 'block';
    earth.style.top = 'calc(100vh - ' + (75 + length * meter) + 'px)';
  } else earth.style.display = 'none';
  gravityDiv.html(gravity);
  massDiv.html(mass);
  dragDiv.html(drag);
  pxDiv.html(meter);
  lengthDiv.html(length);
  densityDiv.html(densityF);
}

function setGravity(x) {
  gravity = x;
  apply();
}

function setLength(x) {
  length = x;
  apply();
}

function setMeter(x) {
  meter = x;
  apply();
}

function setMass(x) {
  mass = x;
  apply();
}

function setDrag(x) {
  drag = x;
  apply();
}

function setDensity(x) {
  densityF = x;
  apply();
}

document.getElementById('sGround').addEventListener('change', function (e) {
  groundAvaliable = !e.target.checked;
  apply();
});

function iClear() {
  clearInterval(interval);
  sliders.prop('disabled', false);
  button.prop('disabled', false);
  checkbox.prop('disabled', false);
}

function fall() {
  velocity = 0;
  position = 0;
  density = mass / length / length / length;
  var nDrag = drag * densityF * length * length / 2;
  var cnt = 0;
  dataes = [];
  sliders.prop('disabled', true);
  button.prop('disabled', true);
  checkbox.prop('disabled', true);
  body.style.top = '0px';
  interval = setInterval(function () {
    cnt += 10;
    force = gravity * mass - length * length * length * densityF;
    if (force > 0) force -= nDrag * velocity * velocity * 10000;
    else force += nDrag * velocity * velocity;
    acceleration = force / mass / 10000;
    velocity += acceleration;
    dataes.push([ cnt / 1000, velocity * 100 ]);
    drawChart();
    position += velocity;
    if (groundAvaliable) body.style.top = (position * meter) + 'px';
    infoDiv.html('아래 방향의 힘: ' + force.toFixed(6) + 'N<br />밀도: ' + density.toFixed(6) + 'kg/m^3<br />떨어진 거리: ' + position.toFixed(6) + 'm<br />걸린 시간: ' + cnt / 1000 + '초');
    if (groundAvaliable && position * meter >= earth.offsetTop - length * meter) {
      clearInterval(interval);
      position = earth.offsetTop / meter - length;
      body.style.top = (position * meter) + 'px';
      sliders.prop('disabled', false);
      button.prop('disabled', false);
      checkbox.prop('disabled', false);
    }
  }, 10);
};

apply();
