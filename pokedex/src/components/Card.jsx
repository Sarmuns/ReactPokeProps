// crie um componente Card onde será exibido o nome e a imagem de cada pokemon, além disso toda vez que for clicado a imagem do pokemon deve mudar para a imagem shiny
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';



const Card = ({ pokemon, reset, reverse }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState();
    const [pokeType, setPokeType] = useState("grass");
    const [image, setImage] = useState();
    const [shiny, setShiny] = useState();
    const [def, setDef] = useState();
    const [clicked, setClicked] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
                setPokemonData(response.data);
                setDef(response.data["sprites"].front_default);
                setShiny(response.data["sprites"].front_shiny);
                setImage(response.data["sprites"].front_default)
                setPokeType(response.data.types[0].type.name);
                setIsLoading(false);
            } catch (error) {
                console.error('ops! ocorreu um erro', error);
            }
        };
        fetchData();

    }, []);

    useEffect(() => {
        handleImageChange();
    }, [reverse])

    useEffect(() => {
        setImage(def)
    }, [reset])

    const handleImageChange = () => {
        setTimeout(() => { setClicked("") }, 100);
        if (image === def) {
            setImage(shiny)
        } else {
            setImage(def)
        }
        setClicked("animate-bounce");
        setTimeout(() => { setClicked("") }, 600);
    }


    const colorBackground = (pokeType) => {
        const colors = {
            grass: "bg-green-400",
            fire: "bg-red-500",
            water: "bg-blue-400",
            bug: "bg-green-500",
            normal: "bg-gray-400",
            poison: "bg-purple-500",
            electric: "bg-yellow-400",
            ground: "bg-yellow-500",
            fairy: "bg-pink-400",
            fighting: "bg-red-600",
            psychic: "bg-pink-500",
            rock: "bg-yellow-600",
            ghost: "bg-purple-600",
            ice: "bg-blue-300",
            dragon: "bg-purple-700",
            dark: "bg-gray-700",
            steel: "bg-gray-500",
            flying: "bg-blue-500",
        };
    
        return colors[pokeType] || "bg-gray-400";
    };
    




    return (
        <div className='flex flex-col gap-3 border-2 justify-center transition duration-1000 hover:scale-110 '>
            {isLoading ?
                <p>Loading...</p>
                :
                <div className={`flex flex-col w-80 h-40 ${colorBackground(pokeType)}`}>
                    <div className='flex justify-center '>
                        <img className={`w-24 h-24 ${clicked} hover:scale-125`} src={image} alt={pokemonData.name} onClick={handleImageChange} />
                    </div>
                    <h1 className="text-center">{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h1>
                </div>
            }
        </div>
    );

}

export default Card;
