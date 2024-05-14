import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PokedexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  color: #ff0000;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ff0000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e60000;
  }
`;

const PokemonInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
`;

const PokemonName = styled.h2`
  font-family: 'Press Start 2P', cursive;
  color: #ff0000;
`;

const PokemonType = styled.p`
  font-size: 18px;
  color: #555;
`;

const PokemonDescription = styled.p`
  font-size: 14px;
  color: #777;
`;

function Pokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pokemon/${pokemonName}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Pokemon not found", error);
      setPokemon(null);
    }
  };

  return (
    <PokedexContainer>
      <Title>Pokedex</Title>
      <Input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokemon Name"
      />
      <Button onClick={fetchPokemon}>Fetch Pokemon</Button>
      {pokemon && (
        <PokemonInfo>
          <PokemonImage src={pokemon.image} alt={pokemon.name} />
          <PokemonName>{pokemon.name}</PokemonName>
          <PokemonType>Type: {pokemon.types.join(', ')}</PokemonType>
          <PokemonDescription>Description: {pokemon.description}</PokemonDescription>
        </PokemonInfo>
      )}
    </PokedexContainer>
  );
}

export default Pokedex;
