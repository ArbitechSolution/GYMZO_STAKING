import Web3 from 'web3';
import {abi, contract} from '../utilies/constant'
let accountAd;


const tokenContractOf = () => {
    let   newContract = new window.web3.eth.Contract(abi, contract);
       return newContract;
   }
let accounts;
const getAccounts = async () => {
    const web3 = window.web3;
    try {
        accounts = await web3.eth.getAccounts();
        return accounts;
    } catch (error) {
        console.log("Error while fetching acounts: ", error);
        return null;
    }
};

export const loadAccountAddress = async () => {
    let acc;
    let isConnected = false;
    try {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            isConnected = true;
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            isConnected = true;
        } else {
            isConnected = false;
            console.log("Metamask is not installed, please install it on your browser to connect.");
        }
        if (isConnected === true) {
            let accounts = await getAccounts();
            accountAd = accounts[0];
            // acc = accountAd.substring(0, 6) + "..." + accountAd.substring(accountAd.length - 6)
            //   setAccount(acc);
            return accountAd;

        }
    } catch (error) {
        console.log("Error while connecting metamask", error);
    }
};
