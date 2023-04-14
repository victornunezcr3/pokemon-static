import Layout from '@/components/layouts/Layout'
import { Inter } from 'next/font/google'
import { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../../api';
import { PokemonListResponse} from '../../interfaces';
import { SmallPokemon} from '../../interfaces/pokemon-list';
import {Grid} from '@nextui-org/react';
import PokemonCard from '@/components/pokemon/Pokemon-Card';


const inter = Inter({ subsets: ['latin'] });

interface Props{
  pokemons: SmallPokemon[];
}



// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  //const { data } = await  // your fetch function here 
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  // console.log(data);
  const pokemons: SmallPokemon[] = data.results.map((poke, idx)=>({
    ...poke,
    id: idx +1,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

const Home: NextPage<Props> = ({ pokemons }) => {
//console.log(pokemons);

  return (
    <Layout title='Listado de Pokémons'>
      
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( ( pokemon ) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>

    </Layout>
  )
}

export default Home;