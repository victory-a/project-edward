import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class ViewUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            users: [],
            loading: false,
            userTOBeDeleted: ''
        }
    }

    componentDidMount() {
        this.loadUsers()
    }

    loadUsers = () => {
        this.setState({ loading: true })
        axios.get('http://localhost:4000/api/users')
            .then(response => this.setState({
                users: response.data.users,
                loading: false
            })
            )
    }

    grabUserToBeDeleted = (name) => {
        this.setState({ userTOBeDeleted: name })
    }

    resetUserToBeDeleted = () => {
        this.setState({ userTOBeDeleted: '' })
    }

    deleteUser = id => {
        axios.delete(`http://localhost:4000/api/users/delete/${id}`)
            .then(response => this.loadUsers())
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    render() {
        const { loading } = this.state;
        const { currentUser } = this.props
        let mappedUsers = this.state.users.map((user, i) => {
            return (
                <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.translationCount}</td>
                    <td><Button
                        color="danger"
                        size="sm"
                        className="mr-2"
                        disabled={user.admin || currentUser === user._id}
                        onClick={(e) => {
                            this.toggleModal();
                            this.grabUserToBeDeleted(user._id);
                        }}
                    >Delete
                        </Button>
                    </td>
                </tr>
            )
        })
        return (
            <>
                <Navbar onRouteChange={this.props.onRouteChange} onClearUser={this.props.onClearUser} />
                {
                    loading ?
                        <p>Loading</p>
                        :
                        <>
                            <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                                <ModalHeader toggle={this.toggleModal} charCode="Y" >Delete User</ModalHeader>
                                <ModalBody>Are you sure you want to delete user</ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="primary"
                                        onClick={() => { this.toggleModal(); this.deleteUser(this.state.userTOBeDeleted) }}>
                                        Yes
                                </Button>
                                    <Button color="secondary" onClick={() => { this.toggleModal(); this.resetUserToBeDeleted() }}>No</Button>
                                </ModalFooter>
                            </Modal>
                            <div className="container ">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Translation Count</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mappedUsers}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                }
            </>
        )
    }
}


export default ViewUsers;