import React from "react";
import {Board} from "./board"
import axios from "axios";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(3).fill(null)
                    .map(() => Array(3).fill(null)),
                step: {
                    player: null,
                    x: null,
                    y: null
                }
            }],
            isNext: true,
            stepNumber: 0,
            step: {
                player: null,
                x: null,
                y: null
            }
        }
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[this.state.stepNumber]
        const squares = current.squares.map(a => [...a])
        if (calculateWinner(squares) || squares[i][j])
            return
        squares[i][j] = this.state.isNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
                step: {
                    player: squares[i][j],
                    x: j,
                    y: i
                }
            }]),
            isNext: !this.state.isNext,
            stepNumber: history.length,
            step: {
                player: squares[i][j],
                x: j,
                y: i
            },
            order: false
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        let status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
        const winner = calculateWinner(current.squares);
        if (this.state.stepNumber === 9)
            status = "Ничья"
        if (winner) status = 'Winner  > ' + winner.player

        const moves = history.map((item, index) => {
            const step = this.state.history[index].step
            const desc = index ?
                'Go to move #' + index + " x:" + step.x + " y:" + step.y + " player:" + step.player :
                'Go to game start';
            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}
                            style={{fontWeight: (index === this.state.stepNumber) ? "bold" : ""}}
                    >{desc}</button>
                </li>
            )
        })
        if (this.state.order)
            moves.reverse()
        let line = [[-1, -1], [-1, -1], [-1, -1]]
        if (winner)
            line = winner.line
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        line={line}
                        squares={current.squares}
                        onCLick={(i, j) => this.handleClick(i, j)}
                    />
                    <button onClick={() => {
                        this.setState({
                            order: !this.state.order
                        })
                    }}> По возрастанию / убыванию
                    </button>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    /**
     * 00 01 02 | 0 1 2
     * 10 11 12 | 3 4 5
     * 20 21 22 | 6 7 8
     * */
    const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [[ai, aj], [bi, bj], [ci, cj]] = lines[i]
        if (squares[ai][aj] && squares[ai][aj] === squares[bi][bj] && squares[ai][aj] === squares[ci][cj])
            return {
                player: squares[ai][aj],
                line: lines[i]
            }
    }
    return null
}