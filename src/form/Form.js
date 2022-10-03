import { useWeb3React } from "@web3-react/core";
import { injected } from '../components/wallet/connectors';
import {useEffect, useState} from 'react';
import Web3 from 'web3';
import { abi } from '../components/contract/abi';
import { contractAddress } from '../components/contract/address';

const weiInEth = 1000000000000000000;

export default function TransferForm() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [diff, setDiff] = useState();
    const [amount, setAmount] = useState();
    const [salt, setSalt] = useState();
    const [status, setStatus] = useState()

    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            deactivate();
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable().then(() => {
            const contract = new web3.eth.Contract(abi, contractAddress);
            contract.methods.current_diff().call((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    if (result == 0)
                        setStatus(String('The guess game is not active'));
                    else
                        setStatus(String('Current difficulty: ' +  result));
                }
            })
        });
    }, []);

    const onDiffChange = (e) => {
        setDiff(e.target.value);
    }

    const onAmountChange = (e) => {
        setAmount(Number(e.target.value));
    }

    const onSaltChange = (e) => {
        setSalt(Number(e.target.value));
    }

    const start = async () => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const contract = new web3.eth.Contract(abi, contractAddress);
        contract.methods.newGuessGame(diff).send({
            from: account,
            value: amount * weiInEth,
        }, function(error, transactionHash) {
            if (error) {
                alert('Error: ' + error)
            } else {
                alert('Tx hash: ' + transactionHash)
            }
        });
    }

    const guess = async () => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const contract = new web3.eth.Contract(abi, contractAddress);
        contract.methods.trySolve(salt).send({
            from: account,
        }, function(error, transactionHash) {
            if (error) {
                alert('Error: ' + error)
            } else {
                alert('Tx hash: ' + transactionHash)
            }
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center', textAlign: 'left', marginTop: '100px', backgroundColor: '#b0e5ff', padding: '50px', borderRadius: '35px' }}>
            <span style={{ alignSelf: 'center' }}> {status} </span>
            <span>Your address: {active ? <span style={{ alignSelf: 'flex-end' }}>{account}</span> : ''}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <button onClick={connect}>Connect</button>
                <button onClick={disconnect}>Disconnect</button>
            </div>
            <p>Difficulty (between 1 and 4) </p>
            <input type='text' onChange={onDiffChange} />
            <p>ETH Amount(min 0.01 ETH)</p>
            <input type='text' onChange={onAmountChange} />
            <button style={{ width: '50%', alignSelf: 'center', margin: '10px', height: '45px', borderRadius: '15px' }} onClick={start}>Start game</button>
            <p>Salt</p>
            <input type='text' onChange={onSaltChange} />
            <button style={{ width: '50%', alignSelf: 'center', margin: '10px', height: '45px', borderRadius: '15px' }} onClick={guess}>Guess!</button>
        </div>
    )
}
