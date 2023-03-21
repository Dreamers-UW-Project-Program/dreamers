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
      <main className="bg-[#141414] min-h-screen flex flex-row max-w-[2500px] mx-auto m-0 overflow-x-hidden scroll-smooth p-0 bg-image">
        <div className="flex w-[30%] relative items-center justify-center">
            <Widgets />
        </div>
        <div className="flex w-[70%] justify-center items-center overflow-auto">
          <DreamFeed />
        </div>
      </main>
    </div>
  )
}

export default Home
