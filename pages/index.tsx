import type { NextPage } from 'next'
import Head from 'next/head'
import React, {useContext} from 'react'
import { RenderContext } from '../contexts/render'
import PreFeed from '../components/DreamFeed/PreFeed'
import DreamFeed from '../components/DreamFeed/DreamFeed'
import Widgets from '../components/Widgets/Widgets'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'
import Bot from '@components/Bot/Bot'
import Greeting from '@components/DreamFeed/Greeting'

const Home: NextPage = () => {

  const renderState = useContext(RenderContext);

  return (
    
      <div className="">
        <Head>
          <title>Androids, Dreams, Electric Sheep</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-black min-h-screen flex flex-row max-w-[2500px] mx-auto m-0 overflow-x-hidden scroll-smooth p-0 bg-image">
          {renderState.logIn && !renderState.register && !renderState.mainDisplay &&
          ( <Login />)}
          {!renderState.logIn && renderState.register && !renderState.mainDisplay &&
          ( <Register />)}
          {!renderState.logIn && !renderState.register && renderState.mainDisplay && 
          ( <>
              <Bot />
              <div className="flex w-[20%] relative items-center justify-center">
                <Widgets />
              </div>
              <div className="flex flex-col w-[80%] justify-center items-center overflow-auto">
                <Greeting />
                <PreFeed />
                <DreamFeed />
              </div>
              
            </> )}
        </main>
      </div>
    
  )
}

export default Home
