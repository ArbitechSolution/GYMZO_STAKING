import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Home_page from './Components/Home_Page/Home_page'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contract, abi, tokenAddress, tokeAbi } from '../src/utilies/constant'
import { loadWeb3 } from './apis/api'





function App() {

  let [balance, setbalance] = useState(0)


  const balanceOf = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;
    let tokenBalane = new web3.eth.Contract(tokeAbi, tokenAddress)
    let Balance_here = await tokenBalane.methods.balanceOf(acc).call();
    tokenBalane = web3.utils.fromWei(Balance_here);
    let tokenBalance_here=tokenBalane.toLocaleString('fullwide', { useGrouping: false })

    console.log("Chek Obnee 1", tokenBalane.toLocaleString()); // "1,000,000,000,000,000,000,000"
    console.log("Chek",tokenBalane.toLocaleString('fullwide', { useGrouping: false }));
    setbalance(tokenBalance_here)


  }


  useEffect(() => {
    setInterval(() => {

      balanceOf()

    }, 1000);
  }, [])

  return (
    <div className="App">
      <ToastContainer />

      <Header balance={balance} />
      <Home_page balance={balance} setbalance={setbalance} />





    </div>
  );
}

export default App;
