const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const speciesResponse = await axios.get(response.data.species.url);
        const data = {
            name: response.data.name,
            image: response.data.sprites.front_default,
            types: response.data.types.map(typeInfo => typeInfo.type.name),
            description: speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text,
        };
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: 'Pokemon not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
