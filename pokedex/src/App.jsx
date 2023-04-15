import Card from './components/Card'
import { useState } from 'react';
import getPokemon from './API/getPokemon';

const App = () => {
  const pokemons = getPokemon();
  const [reset, setReset] = useState(false);
  const [reverse, setReverse] = useState(false);

  const resetClick = () => {
    setReset(!reset)
  }

  const changeState = () => {
    setReverse(!reverse)
  }

  return (
    <div>
      <button onClick={resetClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Reset</button>
      <button onClick={changeState} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Switch</button>
      <div className='mt-4 flex flex-wrap gap-3 mx-auto justify-center'>

        {pokemons.map((pokemon, index) =>
        (
          <Card reset={reset} reverse={reverse} key={index} pokemon={pokemon.name} />)
        )
        }


      </div>
    </div>

  )
}

export default App
