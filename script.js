require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Импортируем CORS

const app = express();
const PORT = 3000;

app.use(cors()); // Используем CORS
app.use(express.json());

app.get("/api/restaurant", async (req, res) => {
    const { cuisine, lat, lng } = req.query;

    if (!cuisine || !lat || !lng) {
        return res.status(400).json({ error: "Необходимы параметры cuisine, lat и lng." });
    }

    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: `${cuisine} restaurant`,
                format: "json",
                lat,
                lon: lng,
                limit: 5, 
                addressdetails: 1,
            },
        });

       
        if (response.data.length === 0) {
            return res.status(404).json({ error: "Рестораны не найдены." });
        }

        const restaurants = response.data.map(restaurant => ({
            name: restaurant.display_name,
            address: restaurant.address,
            lat: restaurant.lat,
            lon: restaurant.lon,
            link: `https://www.openstreetmap.org/?mlat=${restaurant.lat}&mlon=${restaurant.lon}#map=16/${restaurant.lat}/${restaurant.lon}`,
        }));

        res.json(restaurants);

    } catch (error) {
        console.error("Ошибка при поиске:", error);
        res.status(500).json({ error: "Ошибка сервера." });
    }
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
