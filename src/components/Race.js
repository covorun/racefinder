import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'



class Race extends React.Component {
  render() {
    return (

      <div>
      <Link
        className='bg-white ma3 box post flex flex-column no-underline br2'
      to={`/race/${this.props.id}`}
        >
        <div className='items-center black-80 fw3 description'>
          <h2><a href={`${this.props.url}`}>{this.props.name}</a></h2>
          {this.props.city}, {this.props.state}<br />
          <a href={`/race/${this.props.id}`}>View more details</a>

        </div>
      </Link>
      </div>
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
