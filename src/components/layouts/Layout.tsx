import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import Navbar from '../Ui/Navbar';

interface Props {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '': window.location.origin;

const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {

    //console.log(origin);
    

  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Victor Ml Nunez' />
        <meta name='description' content={`Informacion sobre el pokemon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content= {`Esta es la pagina sobre el pokemon ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.jpg`} />
      </Head>
      <Navbar></Navbar>
      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}

export default Layout
