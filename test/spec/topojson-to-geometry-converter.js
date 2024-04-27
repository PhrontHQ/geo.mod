var CountriesTopology = require("config/countries.js").CountriesTopology,
    Projection = require("geo.mod/logic/model/projection").Projection,
    TopojsonToGeometryConverter = require("geo.mod/logic/converter/topojson-to-geometry-converter").TopojsonToGeometryConverter;

describe("TopojsonToGeometryConverter", function () {

    it('it can convert topojson to Montage Geo', function () {
        var converter = new TopojsonToGeometryConverter(),
            collection;
        converter.projection = Projection.forSrid("3857");
        converter.keyPath = "objects.country";
        collection = converter.convert(CountriesTopology);
        expect(collection.features.length).toBe(236);
    });

});
