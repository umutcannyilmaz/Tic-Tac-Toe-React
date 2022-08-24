import React, { useCallback, useEffect, useState } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import './App.css';
import Area from './components/area';
import particlesOptions from "./particles.json";

function App() {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

    //9 kutumuz var...
    const initialState = ["", "", "", "", "", "", "", "", ""];

    // 9 kutuya boş değer atadık
    const [gameState, updateGameState] = useState(initialState)
    const [isXChance, updateIsXChance] = useState(false)
    const [score, setScore] = useState(JSON.parse(localStorage.getItem('score')) || [0, 0])
    const [modal, setModal] = useState("hidden")
    const [winnerPlayer, setWinnerPlayer] = useState("")


    const onUserClicked = (index) => {
        // yeni bir array oluşturduk
        let boxes = Array.from(gameState);
        // eğer tıklanan indexteki arraydeki değer
        if (boxes[index])
            return;
        // eğer false sa X değeri atar yoksa O
        boxes[index] = isXChance ? "0" : "X";
        //sonraki kullanıcı için tam tersini kaydederiz
        updateIsXChance(!isXChance)
        //son oluşan array i kaydederiz
        updateGameState(boxes)
    }

    const clearGame = () => {
        // oyunu sıfırlarız
        updateGameState(initialState)
        setScore([0, 0])
        setModal("hidden")
    }

    const modalCome = () => {
        setModal("modal");
        updateGameState(initialState);
    }
    const checkWinner = () => {

        // kazanma array indexleri 
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            //Destructuring tüm ihtimalleri deniyoruz
            const [a, b, c] = lines[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }

    useEffect(() => {
        let winner = checkWinner();
        
        if (winner) {
            
            if (winner === "X") {

                setWinnerPlayer("Player X Kazandı")
                setScore([score[0] + 1, score[1]])
                setTimeout(modalCome, 1000);
                

            } else if (winner === "0") {
                setWinnerPlayer("Player 0 Kazandı")
                setScore([score[0], score[1] + 1])
                setTimeout(modalCome, 1000);
            }
            

        } else if (gameState.every((el) => el !== "")) {
            setWinnerPlayer("Berabere");
            setTimeout(modalCome, 1000);

        }
    }, [gameState])

    useEffect(()=>{
        localStorage.setItem("score",JSON.stringify(score))
    },[score])


    return (
        <div className="container">
            <Particles options={particlesOptions} init={particlesInit} />

            <p className="heading-text">Tic Tac Toe</p>
            <div className='scoreBoard'>
            
                <div className='fw-600'>Player X <br></br> {score[0]}</div>
                <div className='fw-600'>Player 0 <br></br> {score[1]}</div>
            </div>

            <div className='main'>
            <div className='kapsayıcı'>
            <div className={modal} onClick={() => { setModal("hidden") }}> <div>{winnerPlayer} </div></div>
                <div>
                
                    <div className="row jc-center">
                        <Area className="b-bottom-right" onClick={() => onUserClicked(0)} state={gameState[0]} />
                        <Area className="b-bottom-right" onClick={() => onUserClicked(1)} state={gameState[1]} />
                        <Area className="b-bottom" onClick={() => onUserClicked(2)} state={gameState[2]} />
                    </div>
                    <div className="row jc-center">
                        <Area className="b-bottom-right" onClick={() => onUserClicked(3)} state={gameState[3]} />
                        <Area className="b-bottom-right" onClick={() => onUserClicked(4)} state={gameState[4]} />
                        <Area className="b-bottom" onClick={() => onUserClicked(5)} state={gameState[5]} />
                    </div>
                    <div className="row jc-center">
                        <Area className="b-right" onClick={() => onUserClicked(6)} state={gameState[6]} />
                        <Area className="b-right" onClick={() => onUserClicked(7)} state={gameState[7]} />
                        <Area onClick={() => onUserClicked(8)} state={gameState[8]} />
                    </div>
                </div>
            </div>
            </div>

            <button className="clear-button" onClick={clearGame}>Clear Game</button>
            <p className="fc-aqua fw-600">by Umut Can Yılmaz</p>


        </div>

    );
}

export default App;

