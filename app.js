Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZWNmYWI2ZC01YTZhLTQwYTQtYjAxOC0zODU3OTE1ZWZkMWMiLCJpZCI6MTIyOTAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA3ODg3Njd9.XO-65_X3O5GDOfUIrKgrfymfi7XcqtLhvRCUThDXwfE';


var viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: true,
  sceneMode: Cesium.SceneMode.COLUMBUS_VIEW,
  selectionIndicator: true,
  shadows: false,
  shouldAnimate: true,
});

function createModel(url, height) {
  viewer.entities.removeAll();

  var position = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  var heading = Cesium.Math.toRadians(135);
  var pitch = 0;
  var roll = 0;
  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  var orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  var entity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
  viewer.trackedEntity = entity;
}

var options = [
  {
    text: "Aircraft",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumAir/Cesium_Air.glb",
        5000.0
      );
    },
  },
  {
    text: "Drone",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumDrone/CesiumDrone.glb",
        150.0
      );
    },
  },
  {
    text: "Ground Vehicle",
    onselect: function () {
      createModel(
        "../SampleData/models/GroundVehicle/GroundVehicle.glb",
        0
      );
    },
  },
  {
    text: "Hot Air Balloon",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumBalloon/CesiumBalloon.glb",
        1000.0
      );
    },
  },
  {
    text: "Milk Truck",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",
        0
      );
    },
  },
  {
    text: "Skinned Character",
    onselect: function () {
      createModel(
        "../SampleData/models/CesiumMan/Cesium_Man.glb",
        0
      );
    },
  },
  {
    text: "Draco Compressed Model",
    onselect: function () {
      createModel(
        "../SampleData/models/DracoCompressed/CesiumMilkTruck.gltf",
        0
      );
    },
  },
  {
    text: "KTX2 Compressed Balloon",
    onselect: function () {
      if (!Cesium.FeatureDetection.supportsBasis(viewer.scene)) {
        window.alert(
          "This browser does not support Basis Universal compressed textures"
        );
      }
      createModel(
        "../SampleData/models/CesiumBalloonKTX2/CesiumBalloonKTX2.glb",
        1000.0
      );
    },
  },
];




// city 1 entity
var kaunas = viewer.entities.add({
  id: 'city1',
  position: Cesium.Cartesian3.fromDegrees(23.9036, 54.8985),
  label: {
    text: "Kaunas",
    fillColor: Cesium.Color.SKYBLUE,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 0,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new Cesium.Cartesian2(-50, -50),
    translucencyByDistance: new Cesium.NearFarScalar(
      1.5e2,
      1.0,
      1.5e8,
      3.0
    ),
  },
  point: {
    pixelSize: 20,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 5
  }
});



var timer = 6000 * 60;
setTimeout(function () {
  drawLine('city1', 'city2');
}, timer);

function drawLine(start, end) {
  console.log("✈️ Drawing line from " + start + " to " + end);
  // Line entity City 1 to city 2
  var line = viewer.entities.add({
    id: "line-" + start + "-to-" + end,
    polyline: {
      positions: new Cesium.PositionPropertyArray([
        new Cesium.ReferenceProperty(viewer.entities, start, ['position']),
        new Cesium.ReferenceProperty(viewer.entities, end, ['position'])
      ]),
      width: 5,
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2.5
      })
    }
  });
}

var cityCount = 2;
function addCity(lat = 0, lng = 0, name = '', height = 0) {
  // city 2 entity 
  var newCity = viewer.entities.add({
    id: 'city' + cityCount,
    position: Cesium.Cartesian3.fromDegrees(lat, lng),
    point: {
      pixelSize: 20,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 5
    }
  });
  cityCount++;

  viewer.flyTo(newCity);

}

setInterval(function () {
  timer--;
  document.getElementById('timer').innerHTML = timer;
}, 1000);


// Select Entities Event Listnenr

var startEntity = null;
var endEntity = null;
viewer.selectedEntityChanged.addEventListener(function(entity) {
  console.log(entity);
  if(startEntity === null) {
    startEntity = entity;
  } else {
    endEntity = entity;
  }

  console.log("🅰️ Start Entity");
  console.log(startEntity);

  console.log("🅱️ End Entity");
  console.log(endEntity);
});

function drawLineDynamic(start, end) {
  console.log("🅰️ Start Entity ID");
  console.log(start._id);

  console.log("🅱️ End Entity ID");
  console.log(end._id);
  drawLine(startEntity._id, endEntity._id);
}

document.getElementById('draw-line').addEventListener('click', function() {
  drawLineDynamic(startEntity, endEntity);
});

viewer.flyTo(kaunas);
//   Sandcastle.addToolbarMenu(options);

document.getElementById("kaunas").addEventListener('click', function () {
  viewer.flyTo(kaunas, 5);
  viewer.zoomIn(1);

});

document.getElementById("vilnius").addEventListener('click', function () {
  viewer.flyTo(vilnius);
});


document.getElementById("add-city").addEventListener('click', function () {
  addCity('25.279', '54.6872');
  alert("new Citty added");

  console.log(viewer.selectedEntity);
});
