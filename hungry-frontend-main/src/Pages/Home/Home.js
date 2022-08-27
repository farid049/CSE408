import React from 'react';
import './Home.css';
import Rest__img from '../../img/restaurant.jpg';
import RestCard from '../../Components/RestCard/RestCard';

function Home() {
  return (
    <>
        <div className='hero__area'>
            <div className="inner__hero">
                <h3>Looking you are so <span>hungry!</span></h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iusto dignissimos quisquam, blanditiis pariatur laboriosam perspiciatis reprehenderit deserunt dolorem</p>
                <div className="form__group">
                    <input type="text" placeholder='Burger..'/>
                    <button>Search</button>
                </div>
            </div>
        </div>

        <div className='rest__area'>
          <h3>Some famous Restaurants</h3>
          <div className="rest__cards">
            <RestCard title='Jimmy Restaurant' Rest__img={Rest__img} />
            <RestCard title='Jimmy Restaurant' Rest__img={Rest__img} />
            <RestCard title='Jimmy Restaurant' Rest__img={Rest__img} />
            <RestCard title='Jimmy Restaurant' Rest__img={Rest__img} />
            <RestCard title='Jimmy Restaurant' Rest__img={Rest__img} />
            <RestCard title='Jimmy Restaurant' Rest__img={Rest__img} />
          </div>
        </div>
    </>
  )
}

export default Home