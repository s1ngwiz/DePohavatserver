"use strict";

require("dotenv").config();

var express = require("express");

var axios = require("axios");

var cors = require("cors"); // Импортируем CORS


var app = express();
var PORT = 3000;
app.use(cors()); // Используем CORS

app.use(express.json());
app.get("/api/restaurant", function _callee(req, res) {
  var cuisine, lat, lng, response, restaurants;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cuisine = req.query.cuisine;
          lat = '54.6872'; // Широта Вильнюса

          lng = '25.2797'; // Долгота Вильнюса

          if (cuisine) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Необходим параметр cuisine."
          }));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
              q: "".concat(cuisine, " restaurant"),
              format: "json",
              lat: lat,
              lon: lng,
              limit: 5,
              addressdetails: 1
            }
          }));

        case 8:
          response = _context.sent;

          if (!(response.data.length === 0)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: "Рестораны не найдены."
          }));

        case 11:
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
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          console.error("Ошибка при поиске:", _context.t0);
          res.status(500).json({
            error: "Ошибка сервера."
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 15]]);
});
app.listen(PORT, function () {
  return console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 http://localhost:".concat(PORT));
});
//# sourceMappingURL=script.dev.js.map
