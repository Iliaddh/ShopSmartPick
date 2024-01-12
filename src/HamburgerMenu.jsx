import { useState } from 'react';
import styled from 'styled-components';
import Headphones from "./Headphones";
import { useRef } from 'react';
function Hamburger({onHeadphoneMenu, onAirpodsMenu, onMonitorsMenu, onAccessoriesMenu, onHomeMenu, onAllMenu}) {
  const headphoneRef = useRef(null);

    const [electronicsMenu , setElectroncisMenu] = useState(false);

    const electronicsHandler = () => {
        setElectroncisMenu(!electronicsMenu);
    }

  

  return (
    <>
      <div className='ml-2 p-2 mt-4 w-2/6 shadow-2xl rounded-lg min-w-60 '>
        <ul className=''>
            <ul>
                <li onClick={electronicsHandler} className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded '>Electronics</li>
                {
                    electronicsMenu ? (
                      <div className='ml-8'>
                        <li onClick={onHeadphoneMenu}  className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded'>- Headphones</li>
                        <li onClick={onAirpodsMenu}  className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded'>- Airpods</li>
                        <li onClick={onMonitorsMenu} className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded'>- Monitors</li>
                        <li onClick={onAccessoriesMenu} className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded'>- Accessories</li>
                      </div>
                    ) : (null)
                }
            </ul>
            <li onClick={onHomeMenu} className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded'>Home Appliences</li>
            <li onClick={onAllMenu} className='cursor-pointer transition duration-300 hover:bg-slate-400 p-2 rounded'>All products</li>
        </ul>
      </div>
    </>
  )
}

export default Hamburger
