const MultiPoint = require("mod/data/model/geo/multi-point").MultiPoint,
    BoundingBox = require("./bounding-box").BoundingBox,
    Montage = require("mod/core/core").Montage;

/**
 * A Geometry whose "coordinates" property must be an array of
 * MultiPoint coordinate arrays.
 * 
 * @class MultiPoint
 * @extends external:MultiPoint
 */


exports.MultiPoint = MultiPoint;

Montage.defineProperties(MultiPoint.prototype, {

    /****************************************************************
     * Measurements
     */

    /**
     * Returns the bounding box that envelopes this MultiLineString.
     * @returns {BoundingBox}
     */
    bounds: {
        value: function () {
            var xMin = Infinity,
                yMin = Infinity,
                xMax = -Infinity,
                yMax = -Infinity,
                coordinates = this.coordinates,
                coordinate, i, n;

            for (i = 0, n = coordinates && coordinates.length || 0; i < n; i += 1) {
                coordinate = coordinates[i];
                xMin = Math.min(xMin, coordinate.longitude);
                yMin = Math.min(yMin, coordinate.latitude);
                xMax = Math.max(xMax, coordinate.longitude);
                yMax = Math.max(yMax, coordinate.latitude);
            }

            return BoundingBox.withCoordinates(xMin, yMin, xMax, yMax);
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
                coordinatesPathChangeListener,
                coordinatesRangeChangeListener,
                cancel;

            function update() {
                if (cancel) {
                    cancel();
                }
                cancel = emit(self.bounds());
            }

            update();
            coordinatesPathChangeListener = this.addPathChangeListener("coordinates", update);
            coordinatesRangeChangeListener = this.coordinates.addRangeChangeListener(update);

            return function cancelObserver() {
                coordinatesPathChangeListener();
                coordinatesRangeChangeListener();
                if (cancel) {
                    cancel();
                }
            };
        }
    }

});
