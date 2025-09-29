const MultiPolygon = require("mod/data/model/geo/multi-polygon").MultiPolygon,
    BoundingBox = require("./bounding-box").BoundingBox,
    Montage = require("mod/core/core").Montage;

/**
 * A Geometry whose "coordinates" property must be an array of
 * MultiPoint coordinate arrays.
 * 
 * @class MultiPolygon
 * @extends external:MultiPolygon
 */


exports.MultiPolygon = MultiPolygon;

Montage.defineProperties(MultiPolygon.prototype, {

    /****************************************************************
     * Measurements
     */

    /**
     * Returns the bounding box that envelopes this MultiLineString.
     * @returns {BoundingBox}
     */
    bounds: {
        value: function () {
            return this.coordinates.map(function (polygon) {
                return polygon.bounds();
            }).reduce(function (bounds, childBounds) {
                bounds.extend(childBounds);
                return bounds;
            }, BoundingBox.withCoordinates(Infinity, Infinity, -Infinity, -Infinity));
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
