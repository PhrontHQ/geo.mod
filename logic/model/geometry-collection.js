const GeometryCollection = require("mod/data/model/geo/geometry-collection").GeometryCollection;

/**
 * A position represents a physical location on the Earth.
 *
 * Position is a JavaScript Object subclass rather than a Montage subclass
 * so positions can be as lightweight as possible: They need to be
 * lightweight because many will be created and there's no benefit for them
 * to be derived from the Montage prototype because they don't use any of the
 * Montage class functionality.
 *
 * @class GeometryCollection
 * @extends external:GeometryCollection
 */


exports.GeometryCollection = GeometryCollection;