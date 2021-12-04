import React from "react";
import axios from "axios";

export class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ""
        }
        this.load()
    }

    load = async () => {
        const variable = await axios.get('http://localhost:8080/group')
        console.log(variable)
        this.setState({
            data: variable.data
        })
    }

    render() {
        return (
            <div>
                <div className="tittleContainer">
                    <div className="mainTitle">TIME TABLE</div>
                    <div className="subTitle">Санкт-Петербургский Государственный Университет</div>
                </div>
                <div className="centered">
                    <div className="box">
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeText</div>
                        <div>SomeTe2xt</div>
                    </div>
                </div>
                <div className="bottomTitle">
                    выполнено: Малиновский Илья Владимирович
                </div>
            </div>
        );
    }
}