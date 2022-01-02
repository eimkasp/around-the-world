Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZWNmYWI2ZC01YTZhLTQwYTQtYjAxOC0zODU3OTE1ZWZkMWMiLCJpZCI6MTIyOTAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA3ODg3Njd9.XO-65_X3O5GDOfUIrKgrfymfi7XcqtLhvRCUThDXwfE';


var viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
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
  
//   Sandcastle.addToolbarMenu(options);
  