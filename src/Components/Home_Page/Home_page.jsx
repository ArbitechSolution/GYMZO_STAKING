/* eslint-disable no-lone-blocks */
import React, { useRef, useState, useEffect } from 'react'
import './Home_style.css'
import { AiOutlineRise } from 'react-icons/ai'
import { loadWeb3 } from '../../apis/api'
import { ToastContainer, toast } from 'react-toastify';


import { contract, abi, tokenAddress, tokeAbi } from '../../utilies/constant'

export default function Home_page() {
    let getdata = useRef();
    console.log('Input data here', getdata)
    let [days, setdays] = useState('')
    let [StakingG, setStakingG] = useState('')
    let [firstArray, setFirstArray] = useState([]);
    let [secondArray, setSecondArray] = useState([]);
    let [thirdArray, setThirdArray] = useState([]);
    let [finalDays, setFinalDays] = useState([]);
    let [hours, sethours] = useState([]);
    let [minutes, setminutes] = useState([]);
    let [info2, setinfo2] = useState('')
    let [stak, setstak] = useState(0)
    let [totalStaking, settotalStaking] = useState();
    let [APY, setAPY] = useState('100')

    let [SumTotalStaking, setSumTotalStaking] = useState()

    let [bacgroungColor, setBackgroundColor] = useState("#282424b8")









    const stake = async () => {
        let acc = await loadWeb3();

        if (acc === "No Wallet") {
            toast.error("Not Connected to Wallet")

        }
        else if (acc === "Wrong Network") {
            toast.error("Wrong Newtwork please connect to test net")
        }

        else {
            try {





                const web3 = window.web3;
                let tokenapp = new web3.eth.Contract(tokeAbi, tokenAddress)
                let contractAcc = new web3.eth.Contract(abi, contract)
                let enteredVal = getdata.current.value;
                console.log("enteredVal", enteredVal);
                // console.log("entered Val", getdata);
                // console.log("Days here", days)
                if (enteredVal >= 100) {
                    if (days) {

                        await tokenapp.methods.approve(contract, web3.utils.toWei(enteredVal)).send({
                            from: acc
                        })
                        toast.success("Transaction Successful.");
                        // console.log("Approve here",  enteredVal)
                        // days= days.toString();
                        await contractAcc.methods.farm(web3.utils.toWei(enteredVal), days).send({
                            from: acc
                        })
                    } else {
                        toast.error("Please Select Days")

                    }

                }
                else {
                    toast.error("Please Enter greater than 100")

                }



            } catch (error) {
                console.log("Error while staking ", error);
                toast.error("Transaction Failed")

            }
        }


    }

    const GlobleStaking = async () => {
        const web3 = window.web3;
        let contractAcc = new web3.eth.Contract(abi, contract)

        let GStaking = await contractAcc.methods.GlobleStaking().call()

        let newGStaking = web3.utils.fromWei(GStaking)
        setStakingG(newGStaking)

    }

    const UserInformation = async () => {
        try {
            let acc = await loadWeb3();

            const web3 = window.web3;
            let contractAcc = new web3.eth.Contract(abi, contract)
            let info = await contractAcc.methods.UserInformation(acc).call()
            const now = new Date();
            let currentTime = Math.round(now.getTime() / 1000)



            let stakingvalue = info[0];

            let abc;
            let simplearray = [];
            let mydays = [];
            let myhours = [];
            let myMonths = []
            let loopLength = info[2].length;

            for (let i = 0; i < loopLength; i++) {
                let currentVariable = info[2][i];
                let diffTime = currentTime - currentVariable;
                let diffDays = diffTime / 86400;
                let diffHours = diffTime - (diffDays * 86400) / 3600;
                let diffMins = diffTime - (diffDays * 86400) - (diffHours * 3600) / 60;
                diffTime = parseInt(diffTime)



                // console.log("current variable,", diffHours);
            }
            // eslint-disable-next-line no-lone-blocks

            {

                stakingvalue.map((_items, index) => {
                    abc = web3.utils.fromWei(info[0][index])
                    simplearray.push(abc)
                    setstak(index + 1)




                })

            }


            // ------------------------------Total Staking here-------------------
            let totalS = simplearray.length;
            let sumarray = 0
            for (let i = 0; i < totalS; i++) {


                sumarray += +simplearray[i];


            }

            setSumTotalStaking(sumarray)
            // console.log('Sum here2', SumTotalStaking)


            // Time conveerter--------------------

            let TimeMunites = info[2];
            let ArraySecond = [];
            {
                TimeMunites.map((items, index) => {
                    let Seconds = info[2][index] / 3600
                    ArraySecond.push(Seconds)



                })

            }




            // Time in to day---------


            let timeDay = ArraySecond;
            let arrayDay = [];
            {
                timeDay.map((items, index) => {

                    let dayHere = timeDay[index] / 720
                    // let abc=info[0][1];

                    arrayDay.push(dayHere)



                })

            }





            setFirstArray(simplearray)


            setSecondArray(info[1])
            setThirdArray(info[2]);

            // console.log("Time ", info[2]);

        } catch (error) {
            console.log('Error here', error)
            toast.error("Transaction Failed")

        }



    }



    useEffect(() => {
        setInterval(() => {
            GlobleStaking()

            UserInformation()
        }, 1000);
    }, [])
    return (
        <div>

            <div className="Home_Page_Bg_Color">
                <div className="overlay"></div>
                <div className="container">
                    <div className="main_heading">

                        <div className="inner_div_here">
                            <h1>GYZMO STAKING DASHBOARD</h1>
                            <img src="GYZOBSERVER.png" alt="" width="100%" />
                        </div>

                    </div>

                    {/* __________________-------Cardshere------------------------*/}

                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <div className="card_main">
                                <div className="card card_innerhere">
                                    <div className="card-body">
                                        <h3>MY GYZMO STAKING</h3>
                                        <div className="row mt-4">
                                            <div className="col-lg-4 col-md-5 mt-4">

                                                <div className="first_col_1">
                                                    <h6>TOTaL STAKING</h6>
                                                    <h2>{SumTotalStaking}  <small>GYZMO</small></h2>
                                                    <small>~$840.00</small>
                                                </div>

                                            </div>
                                            <div className="col-lg-8 col-md-7">

                                                <div className="card second_card_1">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-lg-5 col-md-5" >
                                                                <div className="inner_div_first_col">

                                                                    <h6>AVAILABLE WALLET</h6>
                                                                    <h2>12 <small>GYZMO</small></h2>
                                                                    <small>~$840.00</small>
                                                                </div>

                                                            </div>
                                                            <div className="col-lg-7 col-md-7" >

                                                                <div className="secon_div_button">

                                                                    <input type="number" ref={getdata} className='form-control mb-2 inputfiled' />
                                                                    <button className='btn btn-primary btn_stakhere ' onClick={() => stake()}>Stake</button>


                                                                    <div className="inner_btn_all_here mt-2">
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">
                                                                                <button className='btn btn-small btn_small_here '


                                                                                    onClick={() => {
                                                                                        setdays("30")

                                                                                    }}>30</button>

                                                                            </div>

                                                                            <small className="hover_span" >100% APY</small>
                                                                        </div>
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">

                                                                                <button className='btn btn-small btn_small_here ms-1'

                                                                                    onClick={() => {
                                                                                        setdays("60")

                                                                                    }}>60</button>
                                                                            </div>
                                                                            <small className="hover_span" >115% APY</small>

                                                                        </div>
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">
                                                                                <button className='btn btn-small btn_small_here ms-1' onClick={() => setdays("120")}>120</button>
                                                                            </div>
                                                                            <small className="hover_span" >130% APY</small>

                                                                        </div>
                                                                        <div className="one2one_btn">
                                                                            <div className="linediv">

                                                                                <button className='btn btn-small btn_small_here ms-1' onClick={() => setdays("360")}>1Y</button>
                                                                            </div>
                                                                            <small className="hover_span" >160% APY</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <h5 className='mt-3'>CURRENT STAKING <span className='current_stking'>({stak})</span></h5>
                                        {
                                            firstArray.map((items, index) => {

                                                let currentTime = Math.floor(new Date().getSeconds() / 1000.0);
                                                currentTime = parseInt(currentTime)
                                                let finalTime = currentTime - thirdArray[index]

                                                let myDays = finalTime / 86400
                                                myDays = parseInt(myDays);
                                                let myHours = finalTime - (myDays * 86400);
                                                myHours = myHours / 3600;

                                                myHours = parseInt(myHours);
                                                let myMins = finalTime - (myDays * 86400) - (myHours * 3600);
                                                myMins = myMins / 60;
                                                myMins = parseInt(myMins);
                                                let mySecond = finalTime - (myDays * 86400) - (myHours * 3600) - (myMins * 60)
                                                mySecond = parseInt(mySecond);


                                            
                                                let timeStamp = thirdArray[index];;

                                                let contractDate = new Date(timeStamp * 1000);
                                                let contractDay = contractDate.getDay();
                                                let contractHours = contractDate.getHours();
                                                let contractMinutes = contractDate.getMinutes();


                                                let currentDay = new Date().getDay();
                                                let currentHours = new Date().getHours();
                                                let curerntMinutes = new Date().getMinutes();


                                                let day = currentDay - contractDay;
                                                let hours = currentHours - contractHours;
                                                let mint = curerntMinutes - contractMinutes;


                                                let preApy = 0
                                                if (secondArray[index] === '30') {
                                                    preApy = 100;

                                                } else if (secondArray[index] === '60') {
                                                    preApy = 115;


                                                } else if (secondArray[index] === '120') {
                                                    preApy = 130;


                                                } else if (secondArray[index] === '360') {
                                                    preApy = 160;
                                                }



                                                return (
                                                    <div>




                                                        <div className="card current_card_here">

                                                            <div className="card-body ">

                                                                <div className="row">
                                                                    <div className="col-lg-5 col-md-5">

                                                                        <div className='current_body'>
                                                                            <div className="current_inner">

                                                                                <h6>STAKED</h6>
                                                                                <h2>{firstArray[index]}  <small>GYZMO</small></h2>

                                                                            </div>
                                                                            <div className="current_inner">
                                                                                <h6>DAYS</h6>

                                                                                <h2>{secondArray[index]}</h2>
                                                                            </div>
                                                                            <div className="current_inner">
                                                                                <h6>APY</h6>
                                                                                <h2>{preApy}%</h2>
                                                                            </div>


                                                                        </div>



                                                                    </div>
                                                                    <div className="col-lg-7 col-md-7" >
                                                                        <div className='current_body'>
                                                                            <div className="current_inner">
                                                                                <h6>PENDING REWARDS</h6>
                                                                                <h2>13  <small>GYZMO</small>  <small>~$0.52</small> </h2>
                                                                            </div>
                                                                            <div className="current_inner">
                                                                                <h6>CLAIM IN {day} <small>d </small>{hours} <small>h</small> {mint} <small>m</small></h6>
                                                                                <button className='btn btn_ce_stake'>Cancel stake</button>
                                                                            </div>

                                                                        </div>


                                                                    </div>

                                                                </div>





                                                            </div>

                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }












                                    </div>
                                </div>









                            </div>






                        </div>
                        <div className="col-lg-6">
                            <div className="row secondcolo_row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="card card_innerhere22">
                                        <div className="first_col_2">

                                            <h6>GLOBAL STAKING</h6>
                                            <h2>{StakingG}  <small>GYZMO</small></h2>
                                            <small>~$525.649</small>
                                        </div>



                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="card card_innerhere22 col222">
                                        <div className="first_col_2">

                                            <h6>MAX APY</h6>
                                            <h2>160%</h2>
                                            <small>365DAYS</small>
                                        </div>



                                    </div>

                                </div>
                            </div>

                            <div className="card current_card_here" style={{ border: '1px solid #ffffff' }}>
                                <div className="card-body ">
                                    <div className="first_col_2">

                                        <h6>GYZMO STATS</h6>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-7 col-md-7">

                                            <div className='current_body'>
                                                <div className="current_inner">

                                                    <h6>GYZMO PRICE</h6>
                                                    <h2>$0.04  <small className='price_icon ms-2'><AiOutlineRise className='icon_rise ' />4.20%</small></h2>

                                                </div>

                                                <div className="current_inner">
                                                    <h6>DAILY REWARDS</h6>
                                                    <h2>14,932 GYZMO</h2>
                                                </div>


                                            </div>



                                        </div>
                                        <div className="col-lg-5 col-md-5" >
                                            <div className='current_body'>
                                                <div className="current_inner">
                                                    <h6>CIRCULATING SUPPLY</h6>
                                                    <h2>14,932,000 GYZMO </h2>
                                                </div>


                                            </div>


                                        </div>

                                    </div>





                                </div>

                            </div>




                        </div>


                    </div>





                </div>








            </div>

        </div>
    )
}
