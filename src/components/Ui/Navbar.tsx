import { Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image';
import React from 'react'
import NextLink from 'next/link';
import Link from '@mui/material/Link';


const Navbar = () => {
  const { theme } = useTheme();

  //console.log(theme);

  return (
    <div style={{
      display: 'flex',
      width: '99%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '10x 20px',
      margin: '5px',
      marginRight: '2em',
      backgroundColor: theme?.colors.black.value
    }}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt='pokemon icono app'
        width={70}
        height={70}
      />
      {/* link 1 */}

        <Link href="/" passHref component={NextLink} variant='button' textTransform={'capitalize'} >

          <Text  color='white' >Pokémon</Text>

        </Link>

      <Spacer css={{ flex: 1 }} />

      {/* Link 2 */}


        <Link href="/favoritos" passHref  component={NextLink} variant='button'>
          <Text color='white' css={{marginRight: '$10', borderBlockColor: 'ButtonBorder'}}>Favoritos</Text>
        </Link>


    </div>
  )
}

export default Navbar
