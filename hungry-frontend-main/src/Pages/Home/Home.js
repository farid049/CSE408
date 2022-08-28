import React from 'react';
import './Home.css';
import Rest__img from '../../img/restaurant.jpg';
import RestCard from '../../Components/RestCard/RestCard';

function Home() {
  return (
    <>
        <div className='hero__area'>
            <div className="inner__hero">
                <h3>Apply as a <span>Rider!</span></h3>
                <p>Be a part of Humger Express Family</p>
                <div className="form__group">
                    <input type="text" placeholder='Rider..'/>
                    <button>Search</button>
                </div>
            </div>
        </div>

        <div className='rest__area'>
          <h3>Some famous Restaurants</h3>
          <div className="rest__cards">
            <RestCard title='Sultans Dine Restaurant' Rest__img={Rest__img} />
            <RestCard title='Sultans Dine Restaurant' Rest__img={Rest__img} />
            <RestCard title='Sultans Dine Restaurant' Rest__img={Rest__img} />
            <RestCard title='Sultans Dine Restaurant' Rest__img={Rest__img} />
            <RestCard title='Sultans Dine Restaurant' Rest__img={Rest__img} />
            <RestCard title='Sultans Dine Restaurant' Rest__img={Rest__img} />
          </div>
        </div>
    </>
  )
}

export default Home