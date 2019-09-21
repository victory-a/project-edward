import React, { Component } from 'react';
import Navbar from './Navbar';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';


class ViewUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            users: [],
            loading: false
        }
        this.loadUsers = this.loadUsers.bind(this);
    }

    componentDidMount() {
        this.loadUsers()
    }

    async loadUsers () {
        this.setState({loading: true})
        try {
            const response = await fetch('http://localhost:4000/users')
            const jsonData = await response.json();
            const data = await jsonData
            this.setState({users: data, loading: false })
            console.log('users loaded')
        }
        catch (err) {
            // this.setState({users: data , loading: false})
            console.log(err)
        }   
    }

    grabUserToBeDeleted = (name) => {
        this.setState({ userTOBeDeleted: name })
        console.log(name)
    }

    deleteUser = name => {
        fetch(`http://localhost:4000/delete/${name}`,{
            method: 'delete',
            headers: { "Content-Type" : "application/json"}
        }).then(res => {
            this.loadUsers();
        }) 
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    render() {
        const { loading } = this.state;
        let mappedUsers = this.state.users.map((user,i) => {
            return (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{user.name}</td>
                    <td>{user.translationCount}</td>
                    <td><Button 
                            color="danger" 
                            size="sm" 
                            className="mr-2" 
                            disabled={!this.props.isUserAdmin}
                            onClick={(e) => {
                                this.toggleModal(); 
                                this.grabUserToBeDeleted(user.name);
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
                    loading  ?
                        <p>Loading</p>
                    :
                    <>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                            <ModalHeader toggle={this.toggleModal} charCode="Y" >Delete User</ModalHeader>
                            <ModalBody>Are you sure you want to delete user</ModalBody>
                            <ModalFooter>
                                <Button 
                                    color="primary" 
                                    onClick={() => {this.toggleModal(); this.deleteUser(this.state.userTOBeDeleted)}}>
                                        Yes
                                </Button>
                                <Button color="secondary" onClick={() => {this.toggleModal();}}>No</Button>
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