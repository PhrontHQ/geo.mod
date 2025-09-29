const Point2D = require("mod/data/model/geo/point-2d").Point2D;

/**
 * A position represents a physical location on the Earth.
 *
 * Position is a JavaScript Object subclass rather than a Montage subclass
 * so positions can be as lightweight as possible: They need to be
 * lightweight because many will be created and there's no benefit for them
 * to be derived from the Montage prototype because they don't use any of the
 * Montage class functionality.
 *
 * @class
 * @extends external:Point2D
 */


exports.Point2D = Point2D;