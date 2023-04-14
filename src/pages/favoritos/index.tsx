import { Card, Grid } from "@nextui-org/react";
import { localFavorites } from "@/utils";
import { useState, useEffect } from "react";
import FavoritePokemons from "@/components/pokemon/FavoritePokemons";
import Layout from "@/components/layouts/Layout";
import NoFavorites from "@/components/Ui/NoFavorites";


const Favoritos = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

useEffect(() => {
  setFavoritePokemons(localFavorites.pokemons());
}, []);

  return (
      <Layout title='Pokémons - Favoritos'>
        {
          favoritePokemons.length === 0
          ? (<NoFavorites />)
          : ( <FavoritePokemons pokemons={favoritePokemons} /> )
        }
      </Layout>
  )
};

export default Favoritos;