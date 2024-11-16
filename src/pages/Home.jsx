import React, { useEffect } from 'react'
import RecommendationSystem from '../assets/images/RecommendationEngine.png'
import useAuthContext from '../hooks/useAuthContext';

const Home = () => {

  // const { dispatch } = useAuthContext();

  return (
    <main className='w-full min-h-[70vh] text-white p-10'>
      <div className='w-full h-full flex items-center justify-between'>
        <div className='w-[50%] flex flex-col items-start gap-4'>
          <h1 className='inline-block font-bold text-4xl'>BTP Recommendation System</h1>
          <p>
            The BTP Recommendation System is designed to help students find the best professors and projects for their B.Tech Project (BTP). By analyzing various factors such as professor expertise, student interests, and project requirements, our system provides personalized recommendations to ensure a successful and fulfilling project experience.

          </p>
          {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque dolor nesciunt doloribus ipsa dignissimos recusandae aliquid. Reiciendis et animi, natus eos quae voluptates perferendis, modi aliquid ratione maxime nesciunt sapiente.</p> */}
        </div>
        <div className='w-[50%]'>
          <img src={RecommendationSystem} alt="hero" draggable={false} className='h-full w-auto' />
        </div>
      </div>
    </main>
  )
}

export default Home