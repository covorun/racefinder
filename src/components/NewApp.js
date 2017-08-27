import React, { Component } from 'react';
import {
  InstantSearch,
  HierarchicalMenu,
  Highlight,
  Hits,
  Menu,
  Pagination,
  PoweredBy,
  StarRating,
  RefinementList,
  SearchBox,
  ClearAll,
} from 'react-instantsearch/dom';
import { Glyphicon, Panel, Button } from 'react-bootstrap';
import 'react-instantsearch-theme-algolia/style.css';
import PropTypes from 'prop-types';
import qs from 'qs';

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;


const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';

class NewApp extends Component {
  constructor(props) {
    super(props);
    this.state = { searchState: qs.parse(props.location.search.slice(1)) };
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  onSearchStateChange(searchState) {
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
        searchStateToUrl(this.props, searchState),
        searchState
      );
    }, updateAfter);
    this.setState({ searchState });
    console.log(this.props);
  }

  render() {
    return (
      <InstantSearch
        appId="YK5VY15RTR"
        apiKey="f37057097bc9e803ba420a539f18bd49"
        indexName="Race"
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange.bind(this)}
        createURL={createURL}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <SearchBox />
            <PoweredBy />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '0px 20px' }}>
              <p>Location</p>
              <HierarchicalMenu
                id="location/st"
                attributes={['location/st', 'location/city']}
              />
              <p>Range Ratings</p>
              <StarRating attributeName="rating" max={6} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ClearAll />
              </div>
              <div>
                    <Hits hitComponent={Product} />
              </div>
              <div style={{ alignSelf: 'center' }}>
                <Pagination showLast={true} />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    );
  }
}

NewApp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};


const Product = ({hit}) => {
    return(<Panel>
      <div className="hit-name"><Highlight attributeName="title" hit={hit} /></div>
      <div className="hit-location"><Highlight attributeName="location/city" hit={hit} />,
      <Highlight attributeName="location/st" hit={hit} /></div>
      <div className="hit-url"><a href={hit.url}>{hit.url}</a><br />
      <Button href={`/race:${hit.objectID}`}>View More</Button>
      </div>

    </Panel>)
};


export default NewApp;
