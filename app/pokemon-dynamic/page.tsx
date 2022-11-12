import Link from "next/link"
import { Suspense } from "react"

type PokemonResponse = {
  id: string
  name: string
}

type PokemonListResponse = {
  count: number
  next: string
  results: {
    name: string
    url: string
  }[]
}


const getFavoritPokemon = async () => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu', { cache: 'no-store' })
  const { id, name, } = await res.json() as unknown as PokemonResponse


  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const url = `/pokemon/${id}`

  return { name, id, imgSrc, url}
}

const getPokemonList = async () => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(3000)
  
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0', { cache: 'no-store' })
  const json = await res.json() as PokemonListResponse
  
  const pokemons = json.results.map(pokemon => {
    const id = pokemon.url.split('/').at(-2)
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    const url = `/pokemon/${id}`
    return({...pokemon, id, url, imgSrc })
  })
  return pokemons
}

export default async function PokemonIndexPage() {
  const favoritPokemon = await getFavoritPokemon()
  const pokemons = await getPokemonList()
  return (
    <>
      <h3>Your Favorit Pokemon</h3>
      <Suspense fallback={<p>Loading Your Favorit Pokemon...</p>}>
        <h4>{favoritPokemon.name}</h4>
        <Link href={favoritPokemon.url}>{favoritPokemon.name}</Link>
        <img alt={favoritPokemon.name} src={favoritPokemon.imgSrc} />

      </Suspense>    

      <h3>All Pokemons List</h3>
      <Suspense fallback={<p>Loading Pokemons...</p>}>
        {
          pokemons.map(pokemon => (
            <div key={pokemon.id}>
              <h4>{pokemon.name}</h4> 
              <Link href={pokemon.url}>{pokemon.name}</Link>
              <img alt={pokemon.name} src={pokemon.imgSrc} />
            </div>
          ))
        }  
      </Suspense>
    </>
  )
   
}