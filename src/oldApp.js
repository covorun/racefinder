import React, { Component } from 'react';
 import logo from './logo.svg';
 import './App.css';
const ChannelsList = () =>
     (<ul>
       <li>Channel 1</li>
       <li>Channel 2</li>
     </ul>);
class App extends Component {
   render() {
     return (
       <div className="App">
         <div className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h2>Welcome to ohhhh. this is not live</h2>
         </div>
         <ChannelsList />
       </div>
     );
   }
 }
export default App;
