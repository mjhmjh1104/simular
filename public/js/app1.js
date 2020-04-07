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
var drag = 0;
var acceleration;
var length = 2;
var massDiv = $('#mass');
var dragDiv = $('#drag');
var pxDiv = $('#px');
var lengthDiv = $('#length');
var infoDiv = $('#moreInfo');
var dataes = [];

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
  earth.style.top = 'calc(100vh - ' + (75 + length * meter) + 'px)';
  massDiv.html(mass);
  dragDiv.html(drag);
  pxDiv.html(meter);
  lengthDiv.html(length);
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

function fall() {
  velocity = 0;
  position = 0;
  var cnt = 0;
  dataes = [];
  interval = setInterval(function () {
    cnt += 10;
    force = gravity * mass - drag * velocity * velocity;
    acceleration = force / mass;
    velocity += acceleration / 100;
    dataes.push([ cnt / 1000, velocity ]);
    drawChart();
    position += velocity;
    body.style.top = (position * meter) + 'px';
    infoDiv.html('아래 방향의 힘: ' + force.toFixed(6) + 'N<br />밀도: ' + (mass / length / length / length).toFixed(6) + 'kg/m^3<br />떨어지는 거리: ' + ((earth.offsetTop - 50) / meter - length) + 'm<br />걸린 시간: ' + cnt / 1000 + '초');
    if (position * meter >= earth.offsetTop - length * meter) {
      clearInterval(interval);
      position = earth.offsetTop / meter - length;
      body.style.top = (position * meter) + 'px';
    }
  }, 10);
};

apply();
