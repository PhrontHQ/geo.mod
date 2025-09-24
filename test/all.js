console.log('mod-testing', 'Start');

var Promise = require("mod/core/promise").Promise;


//Remove once the issue that causes unminified bluebird to be bootstrapped is resolved.
//Suppress Bluebird unhandled rejection error
Promise.onPossiblyUnhandledRejection(function(e, promise) {
    console.warn("[Bluebird] Unhandled Rejection: " + e.message);
    // console.warn(e);
});


Promise.config({
    // Enable warnings
    warnings: false
});

module.exports = require("mod/testing/run").run(require, [
    "spec/wkt-to-geometry-converter",
    "spec/bounding-box",
    "spec/cluster-organizer",
    "spec/esri-json-to-geometry-converter",
    "spec/esri-symbol-to-style-converter",
    "spec/feature",
    "spec/feature-cluster",
    "spec/feature-collection",
    "spec/geohash",
    "spec/geohash-collection",
    "spec/geo-json-to-geometry-converter",
    "spec/icon",
    "spec/kml-style-to-style-converter",
    "spec/leaflet-engine",
    "spec/renderer",
    "spec/style",
    "spec/topojson-to-geometry-converter"
]).then(function () {
    console.log('mod-testing', 'End');
}, function (err) {
    console.log('mod-testing', 'Fail', err, err.stack);
});
