import React from 'react'
import { Link } from 'react-router-dom'
import Race from '../components/Race'
import { gql, graphql } from 'react-apollo'
import { Glyphicon, Panel, Button } from 'react-bootstrap';
import {InstantSearch, SearchBox, Menu, Hits, Highlight, Pagination, RefinementList, ClearAll, CurrentRefinements} from 'react-instantsearch/dom';
import 'react-instantsearch-theme-algolia/style.scss';

class BestBuy extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.data.refetch()
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    let blurClass = ''

    if (this.props.location.pathname !== '/') {
      blurClass = ' blur'
    }

    return (
      <div className={'w-100 flex justify-center pa6' + blurClass}>
        <div className='w-100 flex flex-wrap br2' style={{maxWidth: 1150}}>


                  <InstantSearch
                  appId="latency"
  apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
  indexName="bestbuy"
                  >
                    <Search />

                  </InstantSearch>


          {this.props.data.allRaces.map(race => (
            <Race
              key={race.id}
              id={race.id}
              name={race.name}
              url={race.url}

              refresh={() => this.props.data.refetch()}
            />
          ))}
        </div>
        {this.props.children}

        <Button href='/create'>
          <Glyphicon glyph="plus" aria-hidden="true" /> Add a Race
        </Button>
      </div>
    )
  }
}

const FeedQuery = gql`query allRaces {
  allRaces(orderBy: createdAt_DESC) {
    id
    name
    url
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(BestBuy)

const Search = () => {
    return( <div className="container">
      <CurrentRefinements/>
      <ClearAll/>
      <SearchBox />
      <Menu attributeName="category" defaultRefinement="Headphones" />


      <Hits hitComponent={Product} />
      <Pagination />
    </div>)
};

const Product = (props) => {
    return(<div style={{marginTop: '10px'}}>
<h4>Hits here!</h4>
      <span className="hit-name">
        <Highlight attributeName="name" hit={this.hit} />
      </span>
    </div>)
};



export default ListPageWithData
