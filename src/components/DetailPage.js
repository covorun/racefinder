import React from 'react'
import {withRouter} from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

import { Navbar, Panel, Button } from 'react-bootstrap';



class DetailPage extends React.Component {

  render() {

    if (this.props.data.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>

          </div>
        </div>
      )
    }

    const {Race} = this.props.data
    const offersPaceGroups = this.props.paceGroups;

    return (

          <Panel header={Race.name} bsStyle="info">
            <p>{Race.city}, {Race.state}</p>

            <p>
             This race {offersPaceGroups ? 'offers' : 'does not offer'} pace groups.</p>

            <p>The terrain is {Race.surface} and the course is {Race.profile}.</p>

            <p>Register here: <a href={Race.url}>{Race.url}</a></p>


            <Button bsStyle="primary" bsSize="small" onClick={this.props.history.goBack}>Back</Button>
          </Panel>

    )
  }

  // would be nice to trigger a "deleting... -> deleted." snackbar-style notification
  // while this runs
  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.data.Race.id}})

    // post is gone, so remove it from history stack
    this.props.history.replace('/')
  }
}

const deleteMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostQuery = gql`
  query race($id: ID!) {
    Race(id: $id) {
      id
      url
      name
    }
  }
`

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const DetailPageWithData = graphql(PostQuery, {
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(DetailPage)

const DetailPageWithDelete = graphql(deleteMutation)(DetailPageWithData)

export default withRouter(DetailPageWithDelete)
