var LineString = require("mod/data/model/geo/line-string").LineString,
    Bindings = require("mod/core/frb/bindings"),
    BoundingBox = require("mod/data/model/geo/bounding-box").BoundingBox,
    Deserializer = require("mod/core/serialization/deserializer/montage-deserializer").MontageDeserializer,
    Position = require("mod/data/model/geo/position").Position,
    Serializer = require("mod/core/serialization/serializer/montage-serializer").MontageSerializer;

describe("A LineString", function () {

    function roundedBbox(bbox) {
        return bbox.map(function (coordinate) {
            return Math.round(coordinate);
        })
    }

    it("can be created", function () {
        var line = LineString.withCoordinates([[0, 0], [0, 10]]);
        expect(line).toBeDefined();
        expect(line.bounds().bbox.join(",")).toBe("0,0,0,10");
    });

    it("can be properly update its bounds", function () {
        var line = LineString.withCoordinates([[0, 0], [0, 10]]),
            position = Position.withCoordinates(10, 10);
        expect(roundedBbox(line.bounds().bbox).join(",")).toBe("0,0,0,10");
        line.coordinates.push(position);
        expect(roundedBbox(line.bounds().bbox).join(",")).toBe("0,0,10,10");
    });

    it("can create an observer for its bounds", function () {
        var geometry = LineString.withCoordinates([
                [0, 0], [10, 10]
            ]),
            controller = {
                geometry: geometry,
                bounds: undefined
            };

        Bindings.defineBinding(controller, "bounds", {"<-": "geometry.bounds()"});
        expect(controller.bounds.bbox.join(",")).toBe("0,0,10,10");
        geometry.coordinates.push(Position.withCoordinates(20, 20));
        expect(controller.bounds.bbox.join(",")).toBe("0,0,20,20");
        geometry.coordinates.pop();
        expect(controller.bounds.bbox.join(",")).toBe("0,0,10,10");
    });

    it("can test for intersection with a bounding box", function () {
        var line = LineString.withCoordinates([[0, 0], [0, 10]]),
            intersectingBoundingBox = BoundingBox.withCoordinates(-5, -5, 5, 5),
            nonIntersectingBoundingBox = BoundingBox.withCoordinates(-5, -5, -15, -15);
        expect(line.intersects(intersectingBoundingBox)).toBe(true);
        expect(line.intersects(nonIntersectingBoundingBox)).toBe(false);
    });

});
