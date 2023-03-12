import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import DreamFeed from '../components/DreamFeed/DreamFeed'
import Bot from '../components/Bot/Bot'
import Widgets from '../components/Widgets/Widgets'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Androids, Dreams, Electric Sheeps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#141414] min-h-screen flex max-w-[2500px] mx-auto">

        <DreamFeed></DreamFeed>

        <Bot></Bot>

        <Widgets></Widgets>

      </main>
    </div>
  )
}

export default Home
