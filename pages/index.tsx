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
      <main className="bg-[#141414] min-h-screen flex max-w-[2500px] mx-auto m-0 overflow-x-hidden scroll-smooth p-0">
        <div className="flex overflow-auto justify-end w-[50%] items-center">
          <DreamFeed />
        </div>
        <div className="w-[50%] fixed right-0">
          <Bot />
          <Widgets />
        </div>
      </main>
    </div>
  )
}

export default Home
