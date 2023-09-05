import './css/global.css'
import './css/pokedex.css'
import PokeAPI from './utils/poke-api'
import {IPokemon} from './utils/pokemon-model'

const pokemonList = document.getElementById('pokemonList') as HTMLElement
const loadMoreButton = document.getElementById('loadMoreButton') as HTMLElement

const maxRecords = 151
const limit = 10

let offset = 0

function loadPokemonItens(offset: number, limit: number) {
  PokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    const pokemonElements = pokemons.map(createPokemonElements)
    pokemonList.append(...pokemonElements)
  })
}

function createPokemonElements(pokemon: IPokemon) {
  const pokemonElement = document.createElement('li')

  pokemonElement.addEventListener('click', () => {
    const pokemonHTML = pokemonElement.outerHTML
    const modalBody = document.querySelector(
      '.modal .modal-body'
    ) as HTMLElement
    modalBody.innerHTML = pokemonHTML

    document.getElementById('modalTrigger')?.click()
  })

  pokemonElement.classList.add('pokemon', pokemon.type)
  pokemonElement.innerHTML = ` <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
            ${pokemon.types
              .map((type: string) => `<li class="type ${type}">${type}</li>`)
              .join('')}
        </ol>

        <img src="${pokemon.photo}"
             alt="${pokemon.name}">
    </div>`

  return pokemonElement
}

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset

    loadPokemonItens(offset, newLimit)
    loadMoreButton.remove()
  } else {
    loadPokemonItens(offset, limit)
  }
})

loadPokemonItens(offset, limit)
