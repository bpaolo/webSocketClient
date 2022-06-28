// import ReactDom from 'react-dom';
import { createRoot } from "react-dom/client";
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

export default class App extends Component {
    
    constructor(props, context){
        super(props, context);
        this.state = { 
            processes : [],
            memoria : {}
        }
    }

    componentDidMount(){
        client.onopen = (connection) => {
            console.log('WebSocket Client Connected');
        }

        client.onmessage = (message) => {
            const {processes,memoria} = JSON.parse(message.data);
            console.log('KLLLL'+ processes + memoria)
            this.setState({processes,memoria })
        }
    }

    renderProcesse(process){
        return (
            
            <table>
            <tr>
              <th>pid</th>
              <th>nome</th>
              <th>cpu</th>
            </tr>
            <tr>
              <td>{process.pid}</td>
              <td>{process.name}</td>
              <td>{process.cpu}</td>
            </tr>
         </table>   
        )
    }   
    renderMemoria(memoria){
        return (
            <div>
                <div>Memoria Total:{memoria.totalMemMb}</div>
                <div>Memoria Usada:{memoria.usedMemMb}</div>
                <div>Memoria Disponível:{memoria.freeMemMb}</div>
            </div>
        )
    }   

    render() {
        const{ processes,memoria } = this.state;
        return (
            <div>
                <div><h1>Processos:</h1></div>
                <div>
                    {processes.map(this.renderProcesse)}
                </div>
            
                <div><h1>Memoria:</h1></div>
                <div>
                    {this.renderMemoria(memoria)}
                </div>
            </div>
        )
    }
    
    
}

root.render(<App />)