import { Button } from "@nextui-org/react";
import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { localFavorites} from '../../utils/';
import { pokeApi } from '../../../api';
import { Pokemon } from '../../../interfaces/pokemon-full';
import { PokemonListResponse } from '../../../interfaces';
import { useState } from 'react';
import confetti from 'canvas-confetti'
import getPokemonInfo from '../../utils/getPokemonInfo';
import Layout from '@/components/layouts/Layout';




interface Props {
  pokemon: Pokemon;
}


const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

const [isInFavorite, setIsInFavorite] = useState(localFavorites.existInFavorites(pokemon.id));
  // console.log(pokemon);
 const onToggleFavorite =()=>{
  localFavorites.toggleFavorite(pokemon.id);
  setIsInFavorite(!isInFavorite);

  if (isInFavorite) return;
  confetti({
    zIndex: 999,
    particleCount: 100,
    spread: 160,
    angle: -100,
    origin: {
      x: 1,
      y: 0
    }
  })
  
 }
    
    return (
     <Layout title={pokemon.name}>
           
           <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
              <Grid xs={ 12 } sm={ 4 } >
                <Card isHoverable isPressable css={{ padding: '30px' }}>
                    <Card.Body>
                      <Card.Image 
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                        alt={ pokemon.name }
                        width="100%"
                        height={ 200 }
                      />
                    </Card.Body>
                </Card>
              </Grid>

              <Grid xs={ 12 } sm={ 8 }>
                <Card>
                  <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text h1 transform='capitalize'>{ pokemon.name }</Text>

                    <Button
                      color="gradient"
                      ghost = {isInFavorite}
                      onPress={onToggleFavorite}
                    >
                      {isInFavorite ?'Quitar de favoritos': 'Guardar en favoritos'}
                    </Button>
                  </Card.Header>

                  <Card.Body>
                    <Text size={30}>Sprites:</Text>

                    <Container direction='row' display='flex' gap={ 0 }>
                        <Image 
                          src={ pokemon.sprites.front_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.front_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />

                    </Container>


                  </Card.Body>  


                </Card>
              </Grid>

           </Grid.Container>



        </Layout>
    )
    
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  //const pokemons151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }` );
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemonNames:string[] = data.results.map(pokemon => pokemon.name);

  return {
    paths: pokemonNames.map( name => ({
      params: { name }
    })),
    fallback: false
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {
  //console.log(params, 'params... testing...');
  
  const { name } = params as { name: string };
  
  
  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage;