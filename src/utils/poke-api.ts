import Pokemon from './pokemon-model'

interface ITypeSlot {
  type: { name: string }
}

interface IPokemonDetail {
  id: string
  name: string
  types: ITypeSlot[]
  sprites: { other: { dream_world: { front_default: string } } }
}

class PokeAPI {
  static async getPokemons(offset = 0, limit = 5) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequests = pokemons.map(PokeAPI.#getPokemonDetail)
    const pokemonsDetails = await Promise.all(detailRequests)

    return pokemonsDetails
  }

  static async #getPokemonDetail(pokemon: { url: string }) {
    const response = await fetch(pokemon.url)
    const pokeDetail = await response.json()

    return PokeAPI.#convertPokeApiDetailToPokemon(pokeDetail)
  }

  static #convertPokeApiDetailToPokemon(pokeDetail: IPokemonDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(
      (typeSlot: ITypeSlot) => typeSlot.type.name
    )

    pokemon.type = types[0]
    pokemon.types = types

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
  }
}

export default PokeAPI
