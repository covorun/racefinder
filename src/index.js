import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewApp from './components/NewApp';

import ListPage from './components/ListPage'
import Single from './components/Single'
import CreatePage from './components/CreatePage'
import BestBuy from './components/BestBuy'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'


import { Navbar, Panel, Button } from 'react-bootstrap';
import './index.css';


import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();



const networkInterface = createNetworkInterface({
// __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'https://api.graph.cool/simple/v1/cj62vxed80nvk0169kjy0pmng'
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={ListPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/race/:id' component={Single} />
        <Route path='/example' component={BestBuy} />
        <Route path='/routertest' component={NewApp} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
