import React from "react";
import {Square} from "./square"

export class Board extends React.Component {
    renderSquare(i, j) {

        function check(x, y, array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][0] === x && array[i][1] === y)
                    return true
            }
            return false
        }

        let color = "black";
        if (check(i, j, this.props.line))
            color = "red"
        return <Square
            color={color}
            key={i * 3 + j}
            value={this.props.squares[i][j]}
            onClick={() => {
                this.props.onCLick(i, j)
            }}
        />;
    }

    render() {
        const map = () => {
            let table = []
            for (let i = 0; i < 3; i++) {
                let row = []
                for (let j = 0; j < 3; j++) {
                    row.push(this.renderSquare(i, j))
                }
                table.push(
                    <div className="board-row" key={i}>{row}</div>
                )
            }
            return table
        }
        return (
            <div>
                {map()}
            </div>
        );
    }
}