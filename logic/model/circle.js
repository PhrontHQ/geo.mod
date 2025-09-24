const Circle = require("mod/data/model/geo/circle").Circle,
    Geometry = require("./geometry").Geometry,
    BoundingBox = require("./bounding-box").BoundingBox,
    Polygon = require("./polygon").Polygon,
    Position = require("./position").Position,
    Montage = require("mod/core/core").Montage;

/**
 * Represents a geodesic circle
 * 
 * @class Circle
 * @extends external:Circle
 */


exports.Circle = Circle;

Montage.defineProperties(Circle.prototype, {


    /****************************************************************
     * Measurements
     */

    /**
     * Returns the bounding box that envelopes this circle.
     * @returns {BoundingBox}
     */
    bounds: {
        value: function () {
            var center = this.coordinates,
                radius = this.radius,
                west = center.destination(radius, 270).longitude,
                south = center.destination(radius, 180).latitude,
                east = center.destination(radius, 90).longitude,
                north = center.destination(radius, 0).latitude;

            return BoundingBox.withCoordinates(west, south, east, north);
        }
    },

    /****************************************************************
     * Observables
     */

    makeBoundsObserver: {
        value: function () {
            var self = this;
            return function observeBounds(emit) {
                return self.observeBounds(emit);
            };
        }
    },

    observeBounds: {
        value: function (emit) {
            var callback = this.bounds.bind(this),
                latitudeHandler,
                longitudeHandler,
                radiusHandler,
                cancel;

            function update() {
                if (cancel) {
                    cancel();
                }
                cancel = emit(callback());
            }

            update();
            radiusHandler = this.addPathChangeListener("radius", update);
            latitudeHandler = this.addPathChangeListener("coordinates.latitude", update);
            longitudeHandler = this.addPathChangeListener("coordinates.longitude", update);

            return function cancelObserver() {
                radiusHandler();
                latitudeHandler();
                longitudeHandler();
                if (cancel) {
                    cancel();
                }
            };
        }
    },

});
