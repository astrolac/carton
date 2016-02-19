"use strict";

/* Массив, который будет содержать ширину, высоту домента браузера */
var pureDocSize=[];
/* Переменные для хранения ссылок на основные элементы интерфейса */
var mapDivPointer, mainblockDivPointer, mainmenuDivPointer, headerDivPointer, footerDivPointer;
/* Здесь будем хранить текущий масштаб карты (15 - начальный масштаб) */
var currentZoom = 15;

/* ------------ Это блок инструментов имитации (может стать постоянным) ------------ */
var moveTimeout = window.setInterval(placeTrackingMarks, 300);
var trackStep=0;
var trackImitation=[
  [59.86017095108688 , 30.20659974189727  ],
  [59.86030046037749 , 30.205811172446882 ],
  [59.86045964818744 , 30.205113798103017 ],
  [59.86062407464837 , 30.20434017922407  ],
  [59.860821033802175, 30.203514058847468 ],
  [59.860961332759786, 30.202843506593762 ],
  [59.86118796828323 , 30.2017920806599   ],
  [59.861357943909105, 30.201062519807852 ],
  [59.8615845767213  , 30.200048644800226 ],
  [59.861773436214655, 30.199222524423654 ],
  [59.86196229463209 , 30.198396404047052 ],
  [59.86213226628793 , 30.197650749940927 ],
  [59.862294143245165, 30.19692118908888  ],
  [59.86257472809862 , 30.195682008523992 ],
  [59.86280135259269 , 30.19474323536876  ],
  [59.86299829881148 , 30.19393857266432  ],
  [59.86317905664007 , 30.19315000321393  ],
  [59.863330137054064, 30.19253309514051  ],
  [59.863330137054064, 30.19253309514051  ],
  [59.86315198435639 , 30.192317092040017 ],
  [59.86315198435639 , 30.192317092040017 ],
  [59.86303867350148 , 30.192655050375883 ],
  [59.86284982121598 , 30.193518721678693 ],
  [59.86265287411509 , 30.194457494833898 ],
  [59.86247481134552 , 30.195246064284287 ],
  [59.86241006101033 , 30.195546471693945 ],
  [59.8622400907788  , 30.195809328177415 ],
  [59.862126776806974, 30.196313583472204 ],
  [59.86199457668365 , 30.19683929643912  ],
  [59.86184349018285 , 30.196705185988385 ],
  [59.861665423065844, 30.196538889029462 ],
  [59.861530523098004, 30.196420871832807 ],
  [59.86150084503139 , 30.19600781164452  ],
  [59.861481958975205, 30.195487463095628 ],
  [59.86130388991628 , 30.195466005423498 ],
  [59.86114200812365 , 30.1954820986776   ],
  [59.86109344343174 , 30.19558938703818  ],
  [59.86109344343174 , 30.19609900675102  ],
  [59.86109344343174 , 30.19669445715233  ],
  [59.86109344343174 , 30.19697340688988  ],
  [59.8609882196885  , 30.19734891615196  ]
];
var trackImitation2=[
  [59.8609882196885  , 30.19734891615196  ],
  [59.86109344343174 , 30.19697340688988  ],
  [59.86109344343174 , 30.19669445715233  ],
  [59.86109344343174 , 30.19609900675102  ],
  [59.86109344343174 , 30.19558938703818  ],
  [59.86114200812365 , 30.1954820986776   ],
  [59.86130388991628 , 30.195466005423498 ],
  [59.861481958975205, 30.195487463095628 ],
  [59.86150084503139 , 30.19600781164452  ],
  [59.861530523098004, 30.196420871832807 ],
  [59.861665423065844, 30.196538889029462 ],
  [59.86184349018285 , 30.196705185988385 ],
  [59.86199457668365 , 30.19683929643912  ],
  [59.862126776806974, 30.196313583472204 ],
  [59.8622400907788  , 30.195809328177415 ],
  [59.86241006101033 , 30.195546471693945 ],
  [59.86247481134552 , 30.195246064284287 ],
  [59.86265287411509 , 30.194457494833898 ],
  [59.86284982121598 , 30.193518721678693 ],
  [59.86303867350148 , 30.192655050375883 ],
  [59.86315198435639 , 30.192317092040017 ],
  [59.86315198435639 , 30.192317092040017 ],
  [59.863330137054064, 30.19253309514051  ],
  [59.863330137054064, 30.19253309514051  ],
  [59.86317905664007 , 30.19315000321393  ],
  [59.86299829881148 , 30.19393857266432  ],
  [59.86280135259269 , 30.19474323536876  ],
  [59.86257472809862 , 30.195682008523992 ],
  [59.862294143245165, 30.19692118908888  ],
  [59.86213226628793 , 30.197650749940927 ],
  [59.86196229463209 , 30.198396404047052 ],
  [59.861773436214655, 30.199222524423654 ],
  [59.8615845767213  , 30.200048644800226 ],
  [59.861357943909105, 30.201062519807852 ],
  [59.86118796828323 , 30.2017920806599   ],
  [59.860961332759786, 30.202843506593762 ],
  [59.860821033802175, 30.203514058847468 ],
  [59.86062407464837 , 30.20434017922407  ],
  [59.86045964818744 , 30.205113798103017 ],
  [59.86030046037749 , 30.205811172446882 ],
  [59.86017095108688 , 30.20659974189727  ]
];
/* --------------------------------------------------------------------------------- */

/* Массив - хранит начальные значения координат центра отображаемого участка карты */
var initLatLon = [59.86120336108158, 30.197611592705268];

/* Ссылка на объект главной карты (будет записана в эту переменную в процессе инициализации) */
var map;

/* Переменные-коды типов размеров HTML-элементов */
var CLIENT_SIZE = 0;
var OFFSET_SIZE = 1;
var SCROLL_SIZE = 2;

/* Указатель на слой с метками трекинга */
var trackingLayer = {};

var mapboxTerrainLayer, osmLayer;

var baseMaps, overlayMaps;

/* Функция с основным кодом */
function baseCode() {

  /*for(var eachtrack in trackImitation) {
    console.log(trackImitation[eachtrack]);
  }*/
}

/* Функция инициализации интерфейса */
function init() {

  /* Повесим функцию на событие изменения размеров окна браузера */
  window.addEventListener("resize", ifWinResize);

  /* В глобальные переменные затолкаем ссылки на базовые объекты интерфейса */
  mapDivPointer = document.getElementById("map");
  mainblockDivPointer = document.getElementById("mainblock");
  mainmenuDivPointer = document.getElementById("mainmenu");
  headerDivPointer = document.getElementById("header");
  footerDivPointer = document.getElementById("footer");

  /* Вызовем функцию отработки события изменения окна для инициализации некоторых значений */
  ifWinResize();
  /* Вызовем ее еще раз, чтобы получить корректные размеры блока для отображения карты.
     Пока не знаю почему, но после первого вызова получаемые размеры выходят за пределы родительского блока. */
  ifWinResize();

  /*mapboxTerrainLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution:  'contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoiYXN0cm9sYWMiLCJhIjoiY2lrbzNmYzQyMDA5c3ZxbHMzZzU4d3YycyJ9.WxeiYqnJlF_uQ4dgX9bLhQ'
  });*/

  osmLayer = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18,
        opacity: 1
  });

  /*baseMaps = {
    "mapboxTerrain": mapboxTerrainLayer,
    "OSM": osmLayer
  };

  overlayMaps = {
    "Tracking": trackingLayer
  };*/

  /* Сформируем саму карту */
  /*map = L.map('map').setView(initLatLon, currentZoom);*/

  map = L.map('map', {
    center: initLatLon,
    zoom: currentZoom,
    layers: [/*mapboxTerrainLayer, */osmLayer]
  });

  map.on('click', onMapMouseClick);

  /*L.control.layers(baseMaps, overlayMaps).addTo(map);*/

  /* После инциализации передадим управление функции с основным кодом */
  baseCode();
}

/* Функция, будет заполнять объект-срез информации для отображения на слое отслеживания */
function getCurrentTrackInfo() {
  /* ------ temp for imitation --------------------------- */
  var trackInfo = {};
  trackInfo[0] = {
    id: "ZD34HYK",
    type: "car",
    coordinates: trackImitation[trackStep],
    color: "red",
    filColor: "#f03",
    fillOpacity: 0.5
  };

  trackInfo[1] = {
    id: "ZD35HYK",
    type: "car",
    coordinates: trackImitation2[trackStep],
    color: "blue",
    filColor: "#30f",
    fillOpacity: 0.5
  };

  trackStep < 40 ? trackStep++ : trackStep=0;

  return trackInfo;
  /* ----------------------------------------------------- */
}

/* Функция размещения меток отслеживаемых объектов в слое отслеживания */
function placeTrackingMarks(/*layerForPlace*/) {
  /*if(!layerForPlace) {
    layerForPlace = trackingLayer;
  }*/

  var trackInfo = getCurrentTrackInfo();
  var eachTrack;
  var marks = [];

  var marksCounter = 0;
  for(eachTrack in trackInfo) {
    marks[marksCounter] = L.circle(trackInfo[eachTrack].coordinates, 5,
                                        {
                                          color: trackInfo[eachTrack].color,
                                          fillColor: trackInfo[eachTrack].filColor,
                                          fillOpacity: trackInfo[eachTrack].fillOpacity
                                        }
                                      );
    marksCounter++;
  }

  var layerForPlace = L.layerGroup(marks);

  if(trackingLayer) map.removeLayer(trackingLayer);
  trackingLayer = layerForPlace;

  map.addLayer(trackingLayer);

  /*console.log("track obj: " + eachTrack + " - id: " + trackInfo[eachTrack].id + " - type: " + trackInfo[eachTrack].type + " - coordinates: " + trackInfo[eachTrack].coordinates);*/

}

/* Функция сдвига центра карты к новым коордитанам */
function moveMapCenterToPosition() {
  ;
}

/* Вычисление размера блока в котором отображается карта */
function computeMapDivSize() {
  return [
    mainblockDivPointer.clientWidth /*- mainmenuDivPointer.clientWidth*/,
    pureDocSize[1] - headerDivPointer.clientHeight - footerDivPointer.clientHeight
  ];
}

/* Функция реакции на событие изменения размеров окна браузера */
function ifWinResize() {
  sizeInfoReload();
  var objSize=computeMapDivSize();
  putSizeToObject(mapDivPointer, objSize);
}

/* Функция получения размеров элемента интерфейса */
function getSizeFromObject(objPointer, sizeType) {
  switch(sizeType) {
    case CLIENT_SIZE:
      return [objPointer.clientWidth, objPointer.clientHeight];
    case OFFSET_SIZE:
      return [objPointer.offsetWidth, objPointer.offsetHeight];
    case SCROLL_SIZE:
      return [objPointer.scrollWidth, objPointer.scrollHeight];
  }
  return [0, 0];
}

/* Функция получения размеров окна браузера (записывает значения в глобальный массив) */
function sizeInfoReload() {
  pureDocSize=[document.documentElement.clientWidth,
               document.documentElement.clientHeight];
}

/* Применяет передаваемые размеры к указанному объекту (через стили) */
function putSizeToObject(objPointer, objSize) {
  objPointer.style.width = objSize[0].toString() + "px";
  objPointer.style.height = objSize[1].toString() + "px";
}

/* Функция отработки клика мыши на карте */
function onMapMouseClick(e) {
  mainmenuDivPointer.innerHTML = "Latitude: " + e.latlng.lat + "<br>" + "Longitude: " + e.latlng.lng;
}
