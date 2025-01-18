"use strict";

require("dotenv").config();

var express = require("express");

var axios = require("axios");

var cors = require("cors");

var app = express();
var PORT = 3000;
app.use(cors());
app.use(express.json());
app.get("/api/restaurant", function _callee(req, res) {
  var cuisine, lat1, lat2, lon1, lon2, response, restaurants;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cuisine = req.query.cuisine;
          lat1 = 54.55;
          lat2 = 54.75;
          lon1 = 25.15;
          lon2 = 25.45;

          if (cuisine) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Необходим параметр cuisine."
          }));

        case 7:
          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(axios.get("https://www.google.com/maps/search", {
            params: {
              q: "".concat(cuisine, " restaurant"),
              format: "json",
              addressdetails: 1,
              limit: 1,
              viewbox: "".concat(lon1, ",").concat(lat1, ",").concat(lon2, ",").concat(lat2),
              bounded: 1
            }
          }));

        case 10:
          response = _context.sent;

          if (!(response.data.length === 0)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: "Рестораны не найдены."
          }));

        case 13:
          restaurants = response.data.map(function (restaurant) {
            return {
              name: restaurant.display_name,
              address: restaurant.address,
              lat: restaurant.lat,
              lon: restaurant.lon,
              link: "https://www.openstreetmap.org/?mlat=".concat(restaurant.lat, "&mlon=").concat(restaurant.lon, "#map=16/").concat(restaurant.lat, "/").concat(restaurant.lon)
            };
          });
          res.json(restaurants);
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](7);
          console.error("Ошибка при поиске:", _context.t0);
          res.status(500).json({
            error: "Ошибка сервера."
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 17]]);
});
app.listen(PORT, function () {
  return console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 http://localhost:".concat(PORT));
});
//# sourceMappingURL=script.dev.js.map
