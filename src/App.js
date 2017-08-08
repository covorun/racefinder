import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

//import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
//import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
//import { typeDefs } from './schema';

//const schema = makeExecutableSchema({ typeDefs });
//addMockFunctionsToSchema({ schema });


const client = new ApolloClient({
  networkInterface: createNetworkInterface('https://api.graph.cool/simple/v1/cj62vxed80nvk0169kjy0pmng'),
});




function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}


const ChannelsList = ({ data: {loading, error, allRaces }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <div>
    {
      allRaces.map( ch =>
        <div key={ch.id}>
            Name: <a href={ch.url}>{ch.name}</a><br />
            {ch.city},{ch.state}
        </div> ) }
  </div>;
};

//from graphcool docs



const channelsListQuery = gql`
  query channelsListQuery {
    allRaces{
      id
      name
      url
      city
      state
    }
  }
`;


// Create a component named MessageComponent
var MessageComponent = React.createClass({
  render: function() {
    return (
      <div>{this.props.message}</div>
    );
  }
});



const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Here we go!</h2>
          </div>
          <ChannelsListWithData />
          <MessageComponent />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
