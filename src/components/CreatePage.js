import React from 'react'
import { withRouter } from 'react-router-dom'
import { gql, graphql} from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'

class CreatePage extends React.Component {

  state = {
    url: '',
    name: '',
    city: '',
    state: '',
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel='Add Race'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className='pa4 flex justify-center bg-white'>
          <div style={{maxWidth: 400}} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={e => this.setState({name: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.url}
            placeholder='URL'
            onChange={e => this.setState({url: e.target.value})}
          />

            <input
              className='w-100 pa3 mv2'
              value={this.state.city}
              placeholder='City'
              onChange={e => this.setState({city: e.target.value})}
            />
            <input
              className='w-100 pa3 mv2'
              value={this.state.state}
              placeholder='State'
              onChange={e => this.setState({state: e.target.value})}
            />
            {this.state.url &&
              this.state.name &&
              this.state.city &&
              this.state.state &&
              <button
              onClick={this.handlePost} bsStyle="secondary" bsSize="large"
              >
                Add
              </button>}
          </div>
        </div>
      </Modal>
    )
  }

  handlePost = async () => {
    console.log(this.state);
    console.log(this.props);
    const {url, name, city, state} = this.state

    await this.props.addPost({variables: {url, name, city, state}})

    window.location.pathname = '/'
  }
}

const addMutation = gql`
  mutation addPost($url: String!, $name: String!, $city: String!, $state: String!) {
    createPost(url: $url, name: $name, city: $city, state: $state) {
      id
      name
      url
      city
      state
    }
  }
`

const PageWithMutation = graphql(addMutation, {name: 'addPost'})(CreatePage)

export default withRouter(PageWithMutation)
