import Link from "next/link"

type PokemonListResponse = {
  count: number
  next: string
  results: {
    name: string
    url: string
  }[]
}
const getPokemonList = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0', { cache: 'no-store' })
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
  const pokemons = await getPokemonList()
  return (
    <>
      {
        pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <h4>{pokemon.name}</h4> 
            <Link href={pokemon.url}>{pokemon.name}</Link>
            <img alt={pokemon.name} src={pokemon.imgSrc} />
          </div>
        ))
      }  
    </>
  )
   
}