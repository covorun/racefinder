import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import { Navbar, Panel, Button, Glyphicon} from 'react-bootstrap';





class Race extends React.Component {


  render() {

    const title = ( <h3><a href={`${this.props.url}`}>{this.props.name}</a></h3>);

    return (
      <Panel header={title} bsStyle="info">
          <p>{this.props.city}, {this.props.state}</p>
          
          <Button bsStyle="info" bsSize="small" href={`/race/${this.props.id}`}>View more details</Button>
          </Panel>
    )
  }
  //<span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>

  // not currently used.
  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.race.id}})
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

const PostWithMutation = graphql(deleteMutation)(Race)

export default PostWithMutation
