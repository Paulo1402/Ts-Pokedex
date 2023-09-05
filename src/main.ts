
import './css/global.css'
import './css/pokedex.css'
import PokeAPI from './poke-api'

const pokemonList = document.getElementById('pokemonList') as HTMLElement
const loadMoreButton = document.getElementById('loadMoreButton') as HTMLElement

const maxRecords = 151
const limit = 10

let offset = 0

function convertPokemonToLi(pokemon: any) {
  const pokemonElement = document.createElement('li')

  pokemonElement.classList.add('pokemon', pokemon.type)
  pokemonElement.addEventListener('click', () => {
    const pokemonHTML = pokemonElement.outerHTML
    const modalBody = document.querySelector(
      '.modal .modal-body'
    ) as HTMLElement
    modalBody.innerHTML = pokemonHTML

    document.getElementById('modalTrigger')?.click()
  })

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

function loadPokemonItens(offset: number, limit: number) {
  PokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    const pokemonElements = pokemons.map(convertPokemonToLi)
    pokemonList.append(...pokemonElements)
  })
}

loadPokemonItens(offset, limit)

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
