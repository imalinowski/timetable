import React from "react";

export function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()} style={{color: props.color}}>
            {props.value}
        </button>
    );
}