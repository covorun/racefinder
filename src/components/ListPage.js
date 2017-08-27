import React from 'react'
import { Link } from 'react-router-dom'
import Race from '../components/Race'
import { gql, graphql } from 'react-apollo'
import { Navbar, Panel, Button, Glyphicon } from 'react-bootstrap';



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

          {this.props.data.allRaces.map(race => (
            <Race
              key={race.id}
              id={race.id}
              name={race.name}
              url={race.url}
              city={race.city}
              state={race.state}
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
    city
    state
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(ListPage)

export default ListPageWithData
