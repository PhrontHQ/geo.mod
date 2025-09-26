var Projection = require("mod/data/model/geo/projection").Projection,
    BoundingBox = require("./bounding-box").BoundingBox,
    Position = require("./position").Position,
    Promise = require("mod/core/promise").Promise,
    Units = require("./units").Units,
    proj4 = require("proj4");


proj4.defs('EPSG:102100', "+title= Google Mercator EPSG:900913 +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
proj4.defs('EPSG:900913', "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
proj4.defs["EPSG:27700"] = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";
proj4.defs('EPSG:3395', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs');

/**
 * @class Projection
 * @extends external:Projection
 */
exports.Projection = Projection;

Montage.defineProperties(Projection.prototype, {

    projectPoint: {
        value: function (point) {
            var degrees = this.units === Units.DECIMAL_DEGREES;
            return degrees     ? point :
                this.isMGRS ? proj4.mgrs.forward(point, this._mgrsAccuracy) :
                    proj4(this._proj4Reference, point);
        }
    },


    inverseProjectPoint: {
        value: function (point) {
            var degrees = this.units === Units.DECIMAL_DEGREES;
            return degrees ? point :
                this.isMGRS     ? Position.withCoordinates(proj4.mgrs.toPoint(point)) :
                    proj4(this._proj4Reference).inverse(point);
        }
    },

    projectBounds: {
        value: function (bounds) {
            var yMax = Math.min(bounds.yMax, 85.06),
                yMin = Math.max(bounds.yMin, -85.06);
            var minimums = this.projectPoint([bounds.xMin, yMin]),
                maximums = this.projectPoint([bounds.xMax, yMax]);
            return BoundingBox.withCoordinates(minimums[0], minimums[1], maximums[0], maximums[1]);
        }
    },

    _mgrsAccuracy: {
        value: 5
    },

    _proj4Reference: {
        get: function () {
            var reference, identifier;
            if (!this.__proj4Reference) {
                identifier = "EPSG:" + this.srid;
                reference = proj4.defs[identifier];
                if (!reference) {
                    identifier = "ESRI:" + this.srid;
                    reference = proj4.defs[identifier];
                }
                this.__proj4Reference = reference || identifier;
            }
            return this.__proj4Reference;
        }
    }

});
