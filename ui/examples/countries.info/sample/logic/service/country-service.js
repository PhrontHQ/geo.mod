var HttpService = require("mod/data/service/http-service").HttpService,
    Country = require("../model/country").Country,
    DataSelector = require("mod/data/service/data-selector").DataSelector,
    DataStream = require("mod/data/service/data-stream").DataStream,
    Feature = require("geo.mod/logic/model/feature").Feature,
    Promise = require("mod/core/promise").Promise,
    Style = require("geo.mod/logic/model/style").Style;

/**
 * Provide data about countries.
 *
 * @class
 * @extends external:HttpService
 */
exports.CountryService = HttpService.specialize(/* @lends CountryService */ {

    /***************************************************************************
     * Basic property
     */

    types: {
        value: [Country.TYPE]
    },

    /***************************************************************************
     * Fetching data
     */

    fetchRawData: {
        value: function (stream) {
            this._fetchCountries().then(function (countries) {
                stream.addData(countries);
                stream.dataDone();
                return null;
            });
        }
    },

    _fetchCountries: {
        value: function () {
            return this._cache ?    Promise.resolve(this._cache) :
                                    this._fetchCountryData();
        }
    },

    _fetchCountryData: {
        value: function () {
            var self = this;
            return this.fetchHttpRawData("data/countries.geo.json").then(function (rawData) {
                var stream = new DataStream();
                stream.selector = DataSelector.withTypeAndCriteria(Country.TYPE);
                self.addRawData(stream, rawData.features);
                self.rawDataDone(stream);
                self._cache = stream.data;
                return self._cache;
            });
        }
    },

    _cache: {
        value: undefined
    },

    _randomColor: {
        value: function () {
            var letters = '0123456789ABCDEF',
                color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },

    /***************************************************************************
     * Mapping data
     */

    mapFromRawData: {
        value: function (country, data) {
            var feature = Feature.withGeoJSON(data),
                color = this._randomColor();
            country.geometry = feature.geometry;
            country.name = data.properties.name;
            country.id = data.id;
            country.style = Style.withValues(color, 0.5, color, 1.0, 2.0);
        }
    }


});
