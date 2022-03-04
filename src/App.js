import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Home_page from './Components/Home_Page/Home_page'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contract, abi, tokenAddress, tokeAbi } from '../src/utilies/constant'
import { loadWeb3 } from './apis/api'
import Spinner from './Components/Loading_Spinner/Spinner';





function App() {

  let [balance, setbalance] = useState(0)
  let [isSpinner, setIsSpinner] = useState(false)



  const balanceOf = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;
    let tokenBalane = new web3.eth.Contract(tokeAbi, tokenAddress)
    let Balance_here = await tokenBalane.methods.balanceOf(acc).call();
    tokenBalane = web3.utils.fromWei(Balance_here);
    tokenBalane=parseInt(tokenBalane);
    // let tokenBalance_here= tokenBalane.toLocaleString('fullwide', { useGrouping: false })

   
    setbalance(tokenBalane)


  }


  useEffect(() => {
    setInterval(() => {

      balanceOf()

    }, 1000);
  }, [])

  return (

    <div className="App">
    <Header balance={balance} />

    {
      isSpinner ? <Spinner/> : <></>

    }
      <ToastContainer />

      <Home_page balance={balance} setbalance={setbalance} setIsSpinner={setIsSpinner} />





    </div>
  );
}

export default App;
