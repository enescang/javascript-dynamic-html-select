var cityJson = [];
var districtJson = [];

const provinceSelect = document.querySelector("#il");
const districtSelect = document.querySelector("#ilce");

window.addEventListener("DOMContentLoaded", function (event) {
  loadJsonFiles();
});

function loadJsonFiles(callback) {
  readTextFile("il.json", (data) => {
    cityJson = JSON.parse(data);
    loadProvince();
  });

  readTextFile("ilce.json", (data) => {
    districtJson = JSON.parse(data);
  });
}

function loadProvince() {
  cityJson.forEach((element) => {
    const option = new Option(element.il, element.il);
    provinceSelect.add(option, null);
  });
}

function changeProvince() {
  districtSelect.innerHTML = "";
  districtJson
    .filter((element) => element.il === provinceSelect.value)
    .sort()
    .forEach((element) => {
      const option = new Option(element.ilce, element.ilce);
      districtSelect.add(option, null);
    });
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

//https://www.javascripttutorial.net/javascript-dom/javascript-add-remove-options/
