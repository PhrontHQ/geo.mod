const Polygon = require("mod/data/model/geo/polygon").Polygon,
    BoundingBox = require("./bounding-box").BoundingBox,
    d3Geo = require("d3-geo"),
    Montage = require("mod/core/core").Montage;

/**
 * A Geometry whose coordinates property must be an array of
 * LinearRing coordinate arrays. For Polygons with multiple
 * rings, the first must be the exterior ring and any others
 * must be interior rings or holes.
 * 
 * @class Polygon
 * @extends external:Polygon
 */


exports.Polygon = Polygon;

Montage.defineProperties(Polygon.prototype, {

    /****************************************************************
     * Measurements
     */

    /**
     * Returns the bounding box that envelopes this Polygon.
     * @returns {BoundingBox}
     */
    bounds: {
        value: function () {
            var geojson = Polygon.GeoJsonConverter.revert(this),
                inverted = this._invertRings(geojson),
                bounds = d3Geo.geoBounds(inverted);
            return BoundingBox.withCoordinates(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]);
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
            if (this.coordinates && this.coordinates.length) {
                coordinatesRangeChangeListener = this.coordinates[0].addRangeChangeListener(update);
            }

            return function cancelObserver() {
                coordinatesPathChangeListener();
                if (coordinatesRangeChangeListener) {
                    coordinatesRangeChangeListener();
                }
                if (cancel) {
                    cancel();
                }
            };
        }
    }

});
