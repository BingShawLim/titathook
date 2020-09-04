import React, { useState } from 'react';
import Board from './Broad'
import {calculateWinner} from '../helpers'

const styles = {
    width: '200px',
    margin: '20px auto',
}

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNum, setStepNum] = useState(0)
    const [xIsNext, setXisNext] = useState(true)
    const winner = calculateWinner(history[stepNum])


    const handleClick = i => {
        const timeInHistory = history.slice(0,stepNum +1);
        const current = timeInHistory[stepNum];
        const squares =[...current];

        if (winner || squares[i]) return;
        squares[i] = xIsNext ? "X":"O";

        setHistory([...timeInHistory, squares])
        setStepNum(timeInHistory.length)
        setXisNext(!xIsNext)
    }

    const jumpTo = step => {
        setStepNum(step);
        setXisNext(step %2 === 0)
    }



    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move#${move}` : 'Go to start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })        
    )


    return (
        <>
            <Board squares={history[stepNum]} onClick={handleClick} />
            <div style= {styles}>
             <p>{winner ? `${winner !== 'draw'? `Winner: ${winner}` : 'DRAW' }` : `Next Player: ${xIsNext ? "X":"O"}`}</p>
             {renderMoves()}
            </div>
        </>
    )
};

export default Game;