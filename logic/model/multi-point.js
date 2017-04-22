var Geometry = require("./geometry").Geometry,
    Position = require("./position").Position;

/**
 *
 * A Geometry whose coordinates property is an array of positions.
 *
 * @class
 * @extends external:Geometry
 */
exports.MultiPoint = Geometry.specialize(/** @lends MultiPoint.prototype */ {

    coordinatesDidChange: {
        value: function () {
            if (this._rangeChangeCanceler) {
                this._rangeChangeCanceler();
            }
            if (this.coordinates) {
                this._rangeChangeCanceler = this.coordinates.addRangeChangeListener(this);
            }
            this._recalculateBbox();
        }
    },

    bboxPositions: {
        get: function () {
            return this.coordinates;
        }
    },

    _rangeChangeCanceler: {
        value: undefined
    }

}, {

    /**
     * Returns a newly initialized multi-point with the specified coordinates.
     *
     * @param {array<array<number>>} coordinates - The positions of this geometry.
     */
    withCoordinates: {
        value: function (coordinates) {
            var self = new this();
            self.coordinates = coordinates.map(function (coordinate) {
                return Position.withCoordinates(coordinate[0], coordinate[1]);
            });
            return self;
        }
    }

});