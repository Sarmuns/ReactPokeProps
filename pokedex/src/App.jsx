import Card from './components/Card'
import { useState, useEffect } from 'react';
import getPokemon from './API/getPokemon';

const App = () => {
  const pokemons = getPokemon();
  const [reset, setReset] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [change, setChange] = useState(false);

  const resetClick = () => {
    setReset(!reset)
  }

  const changeState = () => {
    setReverse(!reverse)
  }


  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRandomNumber = Math.floor(Math.random() * 151) + 1;
      if (randomNumbers.includes(newRandomNumber)) {
        return;
      }
      setRandomNumbers(prevNumbers => [...prevNumbers, newRandomNumber])
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className='bg-gray-900'>
      <div className='flex spacex-2 py-2 px-2 justify-between w-1/6'>
        <button onClick={resetClick} className='bg-blue-500 hover:bg-blue-700 hover:border-2  border-neutral-950  text-white font-bold py-2 px-4 rounded '>Reset</button>
        <button onClick={changeState} className='bg-blue-500 hover:bg-blue-700 hover:border-2  border-neutral-950 text-white font-bold py-2 px-4 rounded '>Switch</button>
      </div>
      <div className='mt-4 flex flex-wrap gap-3 mx-auto justify-center'>

        {pokemons.map((pokemon, index) =>
        (

          randomNumbers.includes(index)
            ? <Card forceShiny={true} reset={reset} reverse={reverse} key={index} pokemon={pokemon.name} />
            : <Card forceShiny={false} reset={reset} reverse={reverse} key={index} pokemon={pokemon.name} />

        )
        )}


      </div>
    </div>

  )
}

export default App
