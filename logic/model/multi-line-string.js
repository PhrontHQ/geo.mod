var Geometry = require("./geometry").Geometry,
    LineString = require("./line-string").LineString,
    Map = require("collections/map"),
    Position = require("./position").Position;

/**
 *
 * A Geometry whose "coordinates" property must be an array of
 * LineString coordinate arrays.
 *
 * @class
 * @extends external:Geometry
 */
exports.MultiLineString = Geometry.specialize(/** @lends MultiLineString.prototype */ {

    /**
     * @type {array<Position>}
     */
    coordinates: {
        value: undefined
    },

    coordinatesDidChange: {
        value: function () {
            var self;
            if (this._rangeChangeCanceler) {
                this._rangeChangeCanceler();
            }
            this._childLineStringsRangeChangeCancelers.forEach(function (cancel) {
                cancel();
            });
            this._childLineStringsRangeChangeCancelers.clear();
            if (this.coordinates) {
                this._shouldRecalculate = true;
                this.coordinates.forEach(this._addLineString.bind(this));
                this._rangeChangeCanceler = this.coordinates.addRangeChangeListener(this, "childLineString");
            }
            this._recalculateBbox();
            this._shouldRecalculate = false;
        }
    },

    handleChildLineStringRangeChange: {
        value: function (plus, minus) {
            minus.forEach(this._removeLineString.bind(this));
            plus.forEach(this._addLineString.bind(this));
            if (this._shouldRecalculate) {
                this._recalculateBbox();
            }
        }
    },

    bboxPositions: {
        get: function () {
            return this.coordinates ? this.coordinates.reduce(function (accumulator, positions) {
                return accumulator.concat(positions);
            }, []) : [];
        }
    },

    _addLineString: {
        value: function (lineString) {
            var cancel = lineString.addRangeChangeListener(this), self;
            this._childLineStringsRangeChangeCancelers.set(lineString, cancel);
            if (!this._shouldRecalculate) {
                self = this;
                lineString.forEach(function (position) {
                    self._extend(position);
                });
            }
        }
    },

    _removeLineString: {
        value: function (lineString) {
            var cancel = this._childLineStringsRangeChangeCancelers.get(lineString);
            this._childLineStringsRangeChangeCancelers.delete(lineString);
            this._shouldRecalculate =   this._shouldRecalculate ||
                                        lineString.some(this.isPositionOnBoundary.bind(this));
            if (cancel) cancel();
        }
    },

    _childLineStringsRangeChangeCancelers: {
        get: function () {
            if (!this.__childLineStringsRangeChangeCancelers) {
                this.__childLineStringsRangeChangeCancelers = new Map();
            }
            return this.__childLineStringsRangeChangeCancelers;
        }
    },

    _rangeChangeCanceler: {
        value: undefined
    },

    _shouldRecalculate: {
        value: false
    },

    /**
     * @method
     * @param{LineString|Polygon|BoundingBox}
     * @returns boolean
     */
    intersects: {
        value: function (geometry) {
            var coordinates = geometry instanceof LineString ?  geometry.coordinates :
                                                                geometry.coordinates[0],
                isIntersecting = false,
                i, n;
            for (i = 0, n = this.coordinates.length; i < n && !isIntersecting; i += 1) {
                isIntersecting = this._intersects(this.coordinates[i], coordinates);
            }
            return isIntersecting;
        }
    },

    _intersects: {
        value: function (positions, coordinates) {
            var doesContain = false,
                point1, point2, point3, point4,
                i, j, a, b, length, length2;

            outerloop:
            for (i = 0, j = 1, length = positions.length - 1; i < length; i++, j++) {
                point3 = positions[i];
                point4 = positions[j];
                for (a = 0, b = 1, length2 = coordinates.length - 1; a < length2; a++, b++) {
                    point1 = coordinates[a];
                    point2 = coordinates[b];
                    doesContain = this._segmentsIntersect(
                        point1.longitude, point1.latitude,
                        point2.longitude, point2.latitude,
                        point3.longitude, point3.latitude,
                        point4.longitude, point4.latitude
                    );
                    if (doesContain) break outerloop;
                }
            }
            return doesContain;
        }
    },

    _segmentsIntersect: {
        value: function (x1, y1, x2, y2, x3, y3, x4, y4) {
            return this._orientation(x1, y1, x3, y3, x4, y4) !== this._orientation(x2, y2, x3, y3, x4, y4) &&
                this._orientation(x1, y1, x2, y2, x3, y3) !== this._orientation(x1, y1, x2, y2, x4, y4);
        }
    },

    _orientation: {
        value: function (tx1, ty1, tx2, ty2, tx3, ty3) {
            var clockWise = ((ty3 - ty1) * (tx2 - tx1)) - ((ty2 - ty1) * (tx3 - tx1));
            return clockWise > 0 ? true : clockWise < 0 ? false : true;
        }
    }

}, {

    /**
     * Returns a newly initialized MultiLineString with the specified coordinates.
     *
     * @param {array<array<array<number>>>} coordinates - The positions of this
     * MultiLineString.
     */
    withCoordinates: {
        value: function (lineStrings) {
            var self = new this();
            self.coordinates = lineStrings.map(function (coordinates) {
                return coordinates.map(function(coordinate) {
                    return Position.withCoordinates(coordinate);
                });
            });
            return self;
        }
    }

});