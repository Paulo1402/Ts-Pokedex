interface IPokemon {
  number: string
  name: string
  type: string
  types: string[]
  photo: string
}

class Pokemon implements IPokemon {
  number: string = ''
  name: string = ''
  type: string = ''
  types: string[] = []
  photo: string = ''
}


export default Pokemon

export {IPokemon}
