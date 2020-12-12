import React from 'react';




export default function Item(props) {
    return props.skils.map(skil => skil.name + ', ')
};
import React from 'react';

import {
    Button,
    Modal,
    Form,
    Row,
    Col,
    Table,
} from 'react-bootstrap';

class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: [],
            editedData:[],
            jsonData:[],
            formData: {
                "id": null,
                "age": null,
                "phone": null,
                "name": null,
                "surname": null
            }
        }
    }
    showModal = () => {
        this.setState({ show: true })
       
    }
    
    hideModal = () => {
        this.setState({ show: false })
    }
    componentDidMount() {
        fetch('http://localhost:3000/data/JsonData.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    data
                });
            });
    }

    removeItem = (id) => {
        const { data } = this.state;
        const removedArray = data.filter(v => { return v.id !== id });
        this.setState({
            data: removedArray
        })
    }

    addItem = () => {
        const newData = {
            "id": "8",
            "age": "0001",
            "phone": "donut",
            "name": "Jan",
            "surname": "Cake"
        }
        const { data, formData } = this.state;
        data.push(newData);
        this.setState({
            data
        })
    }

    editItem = (id) => {

        const editedData = {
            id,
            "age": "1111111111111111",
            "phone": "dsadsadsadsadsad",
            "name": "Jadadasdsadsadn",
            "surname": "Cadasdsadsadasdake"
        }

        const editedArray = data.map(v => {
            if (v.id === id) {
                return editedData;
            } else {
                return v;
            }
        });
        const { data, formData, } = this.state;
        formData.push(editedData);
        this.setState({
            show:true,
            data: editedArray
           
        })
    }


    render() {
        const { data , show} = this.state;
        
        if (data.length === 0 ) {
            return (<></>);
        }
        return (
             <div>
                <Table striped bordered hover>
                    <thead>
                         <tr>
                                <th>Id</th>
                                <th>Age</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Phone</th>
                                <th>Settings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.age}</td>
                                        <td><b>{user.name}</b></td>
                                        <td><b>{user.surname}</b></td>
                                        <td><b>{user.phone}</b></td>
                                        <td>
                                        <button
                                                className="btn btn-primary"
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                                onClick={() => this.editItem(user.id)}
                                            >
                                                Edit
                                        </button>
                                            <Button className="button is-danger" onClick={() => this.removeItem(user.id)}>
                                                <i className="fa fa-trash-o"></i>Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Button className="button is-danger" onClick={() => this.addItem()}>
                        <i className="fa fa-trash-o"></i>Add
                    </Button>
                </div>
            )
        }
    }
export default MyTable;