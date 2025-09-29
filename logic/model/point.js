const Point = require("mod/data/model/geo/point").Point,
    BoundingBox = require("./bounding-box").BoundingBox,
    Projection = require("./projection").Projection;
    Montage = require("mod/core/core").Montage;

/**
 * A Geometry whose coordinates property is a single position.
 * 
 * @class Point
 * @extends external:Point
 */


exports.Point = Point;

Montage.defineProperties(Point.prototype, {

    /****************************************************************
     * Measurements
     */

    /**
     * Returns the bounding box that envelopes this MultiLineString.
     * @returns {BoundingBox}
     */
    bounds: {
        value: function () {
            var longitude = this.coordinates.longitude,
                latitude = this.coordinates.latitude;
            return BoundingBox.withCoordinates(longitude, latitude, longitude, latitude);
        }
    },

    /**
     * Returns this point in the MGRS reference system.
     * @method
     * @return {string}
     */
    mgrs: {
        value: function () {
            var coordinates = this.coordinates;
            return Projection.forSrid("MGRS").projectPoint([
                coordinates.longitude, coordinates.latitude
            ]);
        }
    },


    /****************************************************************
     * Observables
     */

    makeBoundsObserver: {
        value: function () {
            var self = this;
            return function observeBounds(emit, scope) {
                return self.observeBounds(emit);
            }.bind(this);
        }
    },

    observeBounds: {
        value: function (emit) {
            var self = this,
                latitudeListenerCanceler,
                longitudeListenerCanceler,
                cancel;

            function update() {
                if (cancel) {
                    cancel();
                }
                cancel = emit(self.bounds());
            }

            update();
            latitudeListenerCanceler = this.addPathChangeListener("coordinates.latitude", update);
            longitudeListenerCanceler = this.addPathChangeListener("coordinates.longitude", update);

            return function cancelObserver() {
                latitudeListenerCanceler();
                longitudeListenerCanceler();
                if (cancel) {
                    cancel();
                }
            };
        }
    },

    makeMgrsObserver: {
        value: function () {
            var self = this;
            return function observeMgrs(emit, scope) {
                return self.observeMgrs(emit);
            }.bind(this);
        }
    },

    observeMgrs: {
        value: function (emit) {
            var self = this,
                latitudeListenerCanceler,
                longitudeListenerCanceler,
                cancel;

            function update() {
                if (cancel) {
                    cancel();
                }
                cancel = emit(self.mgrs());
            }

            update();
            latitudeListenerCanceler = this.addPathChangeListener("coordinates.latitude", update);
            longitudeListenerCanceler = this.addPathChangeListener("coordinates.longitude", update);

            return function cancelObserver() {
                latitudeListenerCanceler();
                longitudeListenerCanceler();
                if (cancel) {
                    cancel();
                }
            };
        }
    }


});
