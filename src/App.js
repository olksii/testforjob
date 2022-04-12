import React, {useEffect, useState} from 'react';
import './App.scss';
import Registration from './components/bottom-section/Registration/Registration';
import Collection from './components/middle-section/Collection/Collection';
import Header from './components/top-section/Header/Header';
import { getPositions, getProfiles } from './axios/axios'

function App() {
  const [userPositions, setUserPositions] = useState(null);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
     getProfiles()
        .then(({ data }) => {
            setUserCards(data.users)
        })
        .catch((error) => {
            console.log(error)
        })
}, [])

useEffect(() => {
  getPositions()
     .then(({data})=>{
       setUserPositions(data.positions)
     })
     .catch((error) => {
       console.log(error)
   })
}, [])

  return (
    <div className="container">
     <Header />
     <Collection userCards={userCards} setUserCards={setUserCards} />
     <Registration userPositions={userPositions} setUserCards={setUserCards} />
    </div>
  );
}

export default App;
