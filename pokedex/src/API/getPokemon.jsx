import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getPokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=0487')
      .then((res) => {
        setPokemon(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return pokemon;
}

export default getPokemon;