const LineString = require("mod/data/model/geo/line-string").LineString,
    Geometry = require("./geometry").Geometry,
    BoundingBox = require("./bounding-box").BoundingBox,
    Polygon = require("./polygon").Polygon,
    Position = require("./position").Position,
    Montage = require("mod/core/core").Montage;

/**
 * A Geometry whose "coordinates" property is an array of
 * two or more positions.
 * 
 * @class LineString
 * @extends external:LineString
 */


exports.LineString = LineString;

Montage.defineProperties(LineString.prototype, {

    /****************************************************************
     * Measurements
     */

    /**
     * Returns the bounding box that envelopes this LineString.
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
                cooordinatesRangeChangeListener,
                cancel;

            function update() {
                if (cancel) {
                    cancel();
                }
                cancel = emit(self.bounds());
            }

            update();
            coordinatesPathChangeListener = this.addPathChangeListener("coordinates", update);
            cooordinatesRangeChangeListener = this.coordinates.addRangeChangeListener(update);

            return function cancelObserver() {
                coordinatesPathChangeListener();
                cooordinatesRangeChangeListener();
                if (cancel) {
                    cancel();
                }
            };
        }
    }

});
