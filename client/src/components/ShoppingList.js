import React, { Component } from 'react'
import { Container, Button, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import { loadUser } from '../actions/authActions'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getItems()
    this.props.loadUser()
  }

  onDeleteClick = id => {
    this.props.deleteItem(id)
  }

  render() {
    const { items } = this.props.item
    const { isAuthenticated, user } = this.props.auth

    return (
      <Container>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>User</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items && user ? (
              items.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.user.name}</td>
                  <td>
                    {isAuthenticated && item.user.name === user.name ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, item._id)}
                      >
                        &times;
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <Spinner />
            )}
          </tbody>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getItems, deleteItem, loadUser }
)(ShoppingList)
