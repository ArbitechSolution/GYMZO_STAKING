/* eslint-disable no-lone-blocks */
import React, { useRef, useState, useEffect } from 'react'
import './Home_style.css'
import { AiOutlineRise } from 'react-icons/ai'
import { loadWeb3 } from '../../apis/api'
import { ToastContainer, toast } from 'react-toastify';


import { contract, abi, tokenAddress, tokeAbi } from '../../utilies/constant'

export default function Home_page({ balance, setbalance }) {
    let getdata = useRef();

    let [days, setdays] = useState('')
    let [StakingG, setStakingG] = useState(0)
    let [firstArray, setFirstArray] = useState([]);
    let [secondArray, setSecondArray] = useState([]);
    let [thirdArray, setThirdArray] = useState([]);
    let [stak, setstak] = useState(0)
    // let [balance,setbalance] = useState(0)
    let [SumTotalStaking, setSumTotalStaking] = useState(0)
    const [PendingRewards, setPendingRewards] = useState(0)
    let [TimeCheck, setTimeCheck] = useState(0)












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
                if (enteredVal >= 1) {
                    if (days) {

                        await tokenapp.methods.approve(contract, web3.utils.toWei(enteredVal)).send({
                            from: acc
                        })
                        toast.success("Transaction Successful.");
                        await contractAcc.methods.FARM(web3.utils.toWei(enteredVal), days).send({
                            from: acc
                        })
                    } else {
                        toast.error("Please Select Days")

                    }

                }
                else {
                    toast.error("Please Enter greater than 1")

                }



            } catch (error) {
                console.log("Error while staking ", error);


            }
        }


    }

    const GlobleStaking = async () => {
        const web3 = window.web3;
        let contractAcc = new web3.eth.Contract(abi, contract)

        let GStaking = await contractAcc.methods.globalStaking().call()

        // let newGStaking = web3.utils.fromWei(GStaking)
        setStakingG(GStaking)

    }



    const balanceOf = async () => {
        let acc = await loadWeb3();
        const web3 = window.web3;
        let tokenBalane = new web3.eth.Contract(tokeAbi, tokenAddress)
        let Balance_here = await tokenBalane.methods.balanceOf(acc).call();
        tokenBalane = web3.utils.fromWei(Balance_here);
        setbalance(tokenBalane)


    }

    const pendindRewards = async () => {
        let acc = await loadWeb3();
        const web3 = window.web3;

        let currentRewards = new web3.eth.Contract(abi, contract);
        let Reward_here = await currentRewards.methods.pendindRewards(acc).call();

        Reward_here = web3.utils.fromWei(Reward_here);
        // console.log("Panding rewards here" ,parseInt (Reward_here))
        setPendingRewards(Reward_here);


    }

    const harvest = async (index) => {
        let acc = await loadWeb3();

        let web3 = window.web3;
        let withdraw_stake = new web3.eth.Contract(abi, contract);
        await withdraw_stake.methods.HARVEST(index).send({

            from: acc
        })


    }



    const UserInformation = async () => {
        try {
            let acc = await loadWeb3();

            const web3 = window.web3;
            let contractAcc = new web3.eth.Contract(abi, contract)
            let info = await contractAcc.methods.UserInformation(acc).call()


            console.log("stakingvalue", info)


            let stakingvalue = info[0];

            let abc;
            let simplearray = [];
            // eslint-disable-next-line no-lone-blocks
            {
                stakingvalue.map((_items, index) => {
                    abc = info[0][index]
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


            // Time conveerter--------------------

            let TimeMunites = info[2];
            let ArraySecond = [];
            {
                TimeMunites.map((items, index) => {
                    let Seconds = info[2][index] / 3600
                    ArraySecond.push(Seconds)



                })

            }





            setFirstArray(simplearray)


            setSecondArray(info[1])
            setThirdArray(info[2]);

            // console.log("Time ", info[2]);

        } catch (error) {
            console.log('Error here', error)


        }



    }



    useEffect(() => {
        setInterval(() => {
            GlobleStaking()
            balanceOf()
            pendindRewards()

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
                                                                    <h2>{parseInt(balance)} <small>GYZMO</small></h2>
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







                                                let timeStamp = thirdArray[index];
                                                // console.log("timeStamp",timeStamp)


                                                let contractDate = new Date(timeStamp * 1000);
                                                let contractDay = contractDate.getDay();
                                                let contractHours = contractDate.getHours();
                                                let contractMinutes = contractDate.getMinutes();
                                                // console.log("contractDate",contractDate)
                                                // console.log("contractHours",contractHours)






                                                let currentDay = new Date().getDay();
                                                let currentHours = new Date().getHours();
                                                let curerntMinutes = new Date().getMinutes();



                                                let day = currentDay - contractDay;
                                                let hours = currentHours - contractHours;
                                                let mint = curerntMinutes - contractMinutes;















                                                let Munits_here
                                                let Hours_here
                                                let Days_here
                                                let Seconds
                                                let TimeFinal

                                                let Rewardes_here
                                                let preApy = 0
                                                if (secondArray[index] === '30') {
                                                    preApy = 100;
                                                    // let dayInSecond = 2592000;
                                                    let dayInSecond = 30;
                                                   

                                                    let timeStamp = thirdArray[index];
                                                    var currentDateTime = new Date();
                                                    let resultInSeconds = currentDateTime.getTime() / 1000;
                                                    let Time_here = resultInSeconds - timeStamp
                                                    TimeFinal = parseInt(dayInSecond - Time_here)
                                                    if(TimeFinal<=0){
                                                        Days_here=0;
                                                        Hours_here=0;
                                                        Munits_here=0;
                                                        Seconds=0;


                                                    }
                                                    else{
                                                        Days_here = parseInt(TimeFinal / 86400)
                                                        TimeFinal = TimeFinal % (86400)
                                                        Hours_here = parseInt(TimeFinal / 3600)
                                                        TimeFinal %= 3600
                                                        Munits_here = parseInt(TimeFinal / 60)
                                                        TimeFinal %= 60
                                                        Seconds = parseInt(TimeFinal)
    

                                                    }
                                                    



                                                
                                                    Rewardes_here = 8.33333333333333333333 * firstArray[index] / 100





                                                    //30 8.33333333333333333333
                                                    //60 9.5833333333333333333333
                                                    //120 10.833333333333333333333
                                                    //360 13.33333333333333333333




                                                } else if (secondArray[index] === '60') {
                                                    preApy = 115;
                                                    // let dayInSecond = 5184000;
                                                    let dayInSecond = 60;

                                                    let timeStamp = thirdArray[index];
                                                    var currentDateTime = new Date();
                                                    let resultInSeconds = currentDateTime.getTime() / 1000;
                                                    let Time_here = resultInSeconds - timeStamp
                                                    TimeFinal = parseInt(dayInSecond - Time_here)


                                                    if(TimeFinal<=0){
                                                        Days_here=0;
                                                        Hours_here=0;
                                                        Munits_here=0;
                                                        Seconds=0;


                                                    }
                                                    else{
                                                        Days_here = parseInt(TimeFinal / 86400)
                                                        TimeFinal = TimeFinal % (86400)
                                                        Hours_here = parseInt(TimeFinal / 3600)
                                                        TimeFinal %= 3600
                                                        Munits_here = parseInt(TimeFinal / 60)
                                                        TimeFinal %= 60
                                                        Seconds = parseInt(TimeFinal)
    

                                                    }
                                                    

                                                    Rewardes_here = 9.5833333333333333333333 * firstArray[index] / 100





                                                } else if (secondArray[index] === '120') {
                                                    preApy = 130;
                                                    // let dayInSecond = 10368000;
                                                    let dayInSecond = 120;

                                                    let timeStamp = thirdArray[index];
                                                    var currentDateTime = new Date();
                                                    let resultInSeconds = currentDateTime.getTime() / 1000;
                                                    let Time_here = resultInSeconds - timeStamp
                                                    TimeFinal = parseInt(dayInSecond - Time_here)


                                                    if(TimeFinal<=0){
                                                        Days_here=0;
                                                        Hours_here=0;
                                                        Munits_here=0;
                                                        Seconds=0;


                                                    }
                                                    else{
                                                        Days_here = parseInt(TimeFinal / 86400)
                                                        TimeFinal = TimeFinal % (86400)
                                                        Hours_here = parseInt(TimeFinal / 3600)
                                                        TimeFinal %= 3600
                                                        Munits_here = parseInt(TimeFinal / 60)
                                                        TimeFinal %= 60
                                                        Seconds = parseInt(TimeFinal)
    

                                                    }
                                                    

                                                    Rewardes_here = 10.833333333333333333333 * firstArray[index] / 100




                                                } else if (secondArray[index] === '360') {
                                                    preApy = 160;
                                                    // let dayInSecond = 31104000;
                                                    let dayInSecond = 360;

                                                    
                                                    let timeStamp = thirdArray[index];
                                                    var currentDateTime = new Date();
                                                    let resultInSeconds = currentDateTime.getTime() / 1000;
                                                    let Time_here = resultInSeconds - timeStamp
                                                    TimeFinal = parseInt(dayInSecond - Time_here)

                                                    if(TimeFinal<=0){
                                                        Days_here=0;
                                                        Hours_here=0;
                                                        Munits_here=0;
                                                        Seconds=0;


                                                    }
                                                    else{
                                                        Days_here = parseInt(TimeFinal / 86400)
                                                        TimeFinal = TimeFinal % (86400)
                                                        Hours_here = parseInt(TimeFinal / 3600)
                                                        TimeFinal %= 3600
                                                        Munits_here = parseInt(TimeFinal / 60)
                                                        TimeFinal %= 60
                                                        Seconds = parseInt(TimeFinal)
    

                                                    }
                                                    
                                                    Rewardes_here = 13.33333333333333333333 * firstArray[index] / 100

                                                }


                                                const Withdraw_reward = async (index) => {
                                                    if (TimeFinal <= 0) {
                                                        await harvest(index)

                                                    }
                                                    else {
                                                        toast.error(<h6>Remaining Time is {Days_here} <small>d </small>{Hours_here} <small>h</small> {Munits_here} <small>m</small>  {Seconds} <small>s</small></h6>)


                                                    }

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
                                                                                <h2>{parseInt(Rewardes_here)}  <small>GYZMO</small>  <small>~$0.52</small> </h2>
                                                                            </div>
                                                                            <div className="current_inner">
                                                                                <h6>CLAIM IN {Days_here} <small>d </small>{Hours_here} <small>h</small> {Munits_here} <small>m</small></h6>
                                                                                <button className='btn btn_ce_stake' onClick={() => Withdraw_reward([index])} >Withdraw </button>
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

                                    <div className="row ">
                                        <div className="col-lg-7 col-md-7 mt-1">

                                            <div className='current_body'>
                                                <div className="current_inner">

                                                    <h6>GYZMO PRICE</h6>
                                                    <h2>$0.04  <small className='price_icon ms-2'><AiOutlineRise className='icon_rise ' />4.20%</small></h2>

                                                </div>

                                                {/* <div className="current_inner">
                                                    <h6>DAILY REWARDS</h6>
                                                    <h2>14,932 GYZMO</h2>
                                                </div>*/}


                                            </div>



                                        </div>
                                        <div className="col-lg-5 col-md-5" >
                                            <div className='current_body'>
                                                <div className="Supply">
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
