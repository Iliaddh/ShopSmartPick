import { useState} from 'react'
import './App.css';
import Card from "./Card";
import styled from 'styled-components';
import logo from "./assets/logo.png"
import styles from "./nav.module.css";
import hamburger from "./assets/hamburger.png";
import Hamburger from "./HamburgerMenu";
import s from "./card.module.css";

const cardData = [
  { id: 1, price:"33.99",  title: 'PowerLocus Bluetooth Headphones Over Ear, 40H Playtime with 4 EQ Modes, Wireless Headphones with Microphone, Hi-Fi Stereo Foldable Headset, FM Radio, Micro SD/TF, Deep Bass for Travel/PC/Cell Phones', content: 'Content for Card 1' , img:"https://m.media-amazon.com/images/I/71HZq1cT6DL._AC_SX425_.jpg",},
  { id: 2, price:"128",  title: 'Sony INZONE H3 Wired Gaming Headset, Over-Ear Headphones with 360 Spatial Sound, MDR-G300', content: 'Content for Card 2' , img:"https://m.media-amazon.com/images/I/41HMwroOuNL.__AC_SX300_SY300_QL70_ML2_.jpg",},
  { id: 3, price:"248",  title: 'Sony WH-CH720N Noise Cancelling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Voice Control, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51rpbVmi9XL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 4, price:"34.99",  title: 'Bluetooth Headphones Over-Ear, PowerLocus Wireless Headphones, Hi-Fi Stereo Deep Bass, Soft Earmuffs Foldable Headphone with Built-in Microphone, Wireless and Wired Headset for Cell Phones,Tablets, PC', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51YIf5qKnnL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  
];

function Headphones() {

  
  const [hamburgerDisplay, sethamburgerDisplay] = useState(false);
  const hamburgerMenu = () =>{
    sethamburgerDisplay(!hamburgerDisplay);
  }
  
  return (
   
    <main className='h-full mx-8'>
      <nav className='w-full h-14 flex justify-center items-center'>
         <img src={hamburger} className='h-8  mt-6 mr-16 cursor-pointer' onClick={hamburgerMenu}/>
        <div className='w-4/5 mt-6 flex items-center justify-between'>
          <img src={logo} className='h-10 cursor-pointer'/>
          <div className='flex items-center'>
            <input placeholder='Search ShopSmartPick' className={styles.searchBar}></input>
            <button className='bg-gray-800 text-white p-1 rounded h-2/5 '>Search</button>
          </div>
        </div>
      </nav>
      {
        hamburgerDisplay ? (
          <Hamburger></Hamburger>
        ) : (null)
      }
 
      <div className={`mt-40   ${s.cardDiv}`}>
          {
            cardData.map((card) => (
              <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
            ))
          }


      </div>
    </main>
  )
}

export default Headphones;
