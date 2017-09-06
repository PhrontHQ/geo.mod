var MultiPoint = require("montage-geo/logic/model/multi-point").MultiPoint,
    Position = require("montage-geo/logic/model/position").Position;

describe("A MultiPoint", function () {

    it("can be created", function () {
        var geometry = MultiPoint.withCoordinates([
            [0, 0], [10, 0], [10, 10], [0, 10]
        ]);
        expect(geometry).toBeDefined();
        expect(geometry.coordinates.length).toBe(4);
        expect(geometry.bounds.bbox.join(",")).toBe("0,0,10,10");
    });

    it("can observe changes to coordinates", function () {
        var position = Position.withCoordinates(20, 20),
            geometry = MultiPoint.withCoordinates([
                [0, 0], [10, 0], [10, 10], [0, 10]
            ]);
        geometry.coordinates.push(position);
        expect(geometry.bounds.bbox.join(",")).toBe("0,0,20,20");
    });

    it ("can test for equality", function () {
        var a = MultiPoint.withCoordinates([[0, 0], [10, 0], [10, 10], [0, 10]]),
            b = MultiPoint.withCoordinates([[0, 0], [10, 0], [10, 10], [0, 10]]),
            c = MultiPoint.withCoordinates([[0, 0], [10, 0], [10, 10]]),
            d = MultiPoint.withCoordinates([[0, 0], [10, 0], [10, 10], [10, 10]]);

        expect(a.equals(b)).toBe(true);
        expect(a.equals(c)).toBe(false);
        expect(a.equals(d)).toBe(false);
    });

});
