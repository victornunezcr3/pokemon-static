import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router';
import React, { FC } from 'react'

interface Props{
    pokemonID: number;
}

const FavoriteCardPokemon:FC<Props> = ({pokemonID}) => {

    const router = useRouter();

    const onFavoriteClicked =()=>{
        router.push(`/pokemon/${pokemonID}`);
}

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonID} onClick={onFavoriteClicked}> 
          <Card isHoverable isPressable css={{padding:'$10'}}>
            <Card.Image 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
              alt="pokemon favorito"
              width={'100%'}
              height={140}

            />
          </Card>
    </Grid>
  )
}

export default FavoriteCardPokemon
