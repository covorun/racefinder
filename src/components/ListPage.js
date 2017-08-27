import React from 'react'
import { Link } from 'react-router-dom'
import Race from '../components/Race'
import { gql, graphql } from 'react-apollo'
<<<<<<< HEAD
<<<<<<< HEAD
import { Navbar, Panel, Button, Glyphicon } from 'react-bootstrap';


=======
import { Glyphicon, Panel, Button } from 'react-bootstrap';
import {InstantSearch, SearchBox, Toggle, PoweredBy, HierarchicalMenu, Hits, Highlight, Pagination, RefinementList, ClearAll, CurrentRefinements} from 'react-instantsearch/dom';
import 'react-instantsearch-theme-algolia/style.scss';
>>>>>>> fix-racefinder

=======
import { Glyphicon, Panel, Button } from 'react-bootstrap';
import {InstantSearch, SearchBox, Toggle, PoweredBy, HierarchicalMenu, Hits, Highlight, Pagination, RefinementList, ClearAll, CurrentRefinements} from 'react-instantsearch/dom';
import 'react-instantsearch-theme-algolia/style.scss';
import { Navbar, Panel, Button, Glyphicon } from 'react-bootstrap';

>>>>>>> b8956845ac7dc2848ae9e60b22ad4d6cd935205b
class ListPage extends React.Component {

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
                  appId="YK5VY15RTR"
      apiKey="f37057097bc9e803ba420a539f18bd49"
      indexName="Race"
                  >
                    <Search />
                    <PoweredBy />
                  </InstantSearch>

        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        {this.props.children}
=======
>>>>>>> fix-racefinder
=======
        {this.props.children}

>>>>>>> b8956845ac7dc2848ae9e60b22ad4d6cd935205b

        <Button href='/create'>
          <Glyphicon glyph="plus" aria-hidden="true" /> Add a Race
        </Button>
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> fix-racefinder
=======

>>>>>>> b8956845ac7dc2848ae9e60b22ad4d6cd935205b
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
})(ListPage)

const Search = () => {
    return( <div className="container">

    <Panel>


      <SearchBox />
      <ClearAll/>
      <CurrentRefinements/>
      <Toggle
              attributeName="location/st"
              label="Washington"
              value={'Washington State'}
            />


      <Hits hitComponent={Product} />
      <Pagination />
      </Panel>
    </div>)
};



const Product = ({hit}) => {



    return(<Panel>
      <div className="hit-name"><Highlight attributeName="title" hit={hit} /></div>
      <div className="hit-name"><Highlight attributeName="courseDescription" hit={hit} /></div>
    
      <div className="hit-url"><Highlight attributeName="location/city" hit={hit} />, <Highlight attributeName="location/st" hit={hit} /></div>
      <div className="hit-url"><a href={hit.url}>{hit.url}</a><br />
      <Button href={`/race:${hit.objectID}`}>View More</Button>
      </div>

    </Panel>)
};




export default ListPageWithData
