import React from 'react'
import RecommendationSystem from '../assets/images/RecommendationEngine.png'
// import useAuthContext from '../hooks/useAuthContext';

const Home = () => {

  // const { dispatch } = useAuthContext();

  return (
    <main className='w-full min-h-[70vh] text-white p-10'>
      <div className='w-full h-full flex items-center justify-between'>
        <div className='w-[50%] flex flex-col items-start gap-4'>
          <h1 className='inline-block font-bold text-4xl'>Faculty Recommendation System</h1>
          <p>
            Our Faculty Recommender System leverages advanced search technologies and machine learning to help users find professors based on their research areas and publications. By analyzing faculty expertise and scholarly work, the system offers personalized recommendations, making it easier to connect with the right mentors, collaborators, or subject experts.
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