console.log('montage-testing', 'Start');
module.exports = require("montage-testing").run(require, [
    "spec/bounding-box",
    "spec/circle",
    "spec/feature",
    "spec/feature-collection",
    "spec/geohash",
    "spec/geohash-collection",
    "spec/geometry",
    "spec/geometry-collection",
    "spec/line-string",
    "spec/multi-line-string",
    "spec/multi-point",
    "spec/multi-polygon",
    "spec/point",
    "spec/point-2d",
    "spec/polygon",
    "spec/position",
    "spec/size"

]).then(function () {
    console.log('montage-testing', 'End');
}, function (err) {
    console.log('montage-testing', 'Fail', err, err.stack);
});
