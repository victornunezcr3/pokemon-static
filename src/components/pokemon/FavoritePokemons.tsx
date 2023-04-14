import { Grid, Card } from '@nextui-org/react'
import React, { FC } from 'react'
import { localFavorites } from "@/utils";
import FavoriteCardPokemon from './FavoriteCardPokemon';

interface Props {
    pokemons: number[];


}

const FavoritePokemons: FC<Props> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
    {
      pokemons.map( id => (
        <FavoriteCardPokemon key={id} pokemonID={ id } />
      ))
    }
  </Grid.Container>
  )
}

export default FavoritePokemons
