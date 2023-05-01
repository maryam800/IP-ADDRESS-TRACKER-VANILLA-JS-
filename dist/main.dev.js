"use strict";

// IP api Information
var baseUrl = 'https://geo.ipify.org/api/v2/country?apiKey=at_vhJl8Mhk8VcYhvvG9Asf8yCwbmqfK';
var searchBtn = document.getElementById('searchBtn');
var searchInput = document.getElementById('searchInput');
var ipAddress = document.querySelector('.ip-address p');
var userLocation = document.querySelector('.location p');
var timezone = document.querySelector('.timezone p');
var isp = document.querySelector('.isp p'); //Set Up The Map

var map = L.map('map').setView([24.774265, 46.738586], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var updateMarker = function updateMarker() {
  var updatedMarker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [24.5, 46.738586];
  map.setView(updatedMarker, 13);
  L.marker(updatedMarker).addTo(map);
}; // initlize marker


updateMarker([24.774265, 46.738586]);
var url = '';

function getData(ip) {
  if (ip == undefined) {
    url = "".concat(baseUrl);
  } else {
    url = "".concat(baseUrl, "&ipaddress=").concat(ip);
  }

  axios.get(url).then(function (response) {
    var data = response.data;
    console.log(data);
    ipAddress.innerHTML = data.ip;
    isp.innerHTML = data.isp;
    userLocation.innerHTML = data.location.country + ", " + data.location.region;
    timezone.innerHTML = data.location.timezone;
    updateMarker(data.location.lat, data.location.lng);
  })["catch"](function (error) {
    return alert("Error Fetching Data");
  });
}

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var value = searchInput.value;
  getData(value);
  searchInput.value = '';
});