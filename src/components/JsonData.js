
import React from 'react';
import Item from "./Item";
import {
    Button,
    Modal,
    Form,
    Row,
    Col,
    Table,
} from 'react-bootstrap';

class JsonData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           
            id: "",
            data: {},
           
            jsonData: [],
            show: false,
            formData: {
                id: "",
                age: "",
                phone: "",
                name: "",
                surname: ""
            },

        };
    }
    componentDidMount() {
        fetch('http://localhost:3000/data/JsonData.json')
            .then((response) => {
                return response.json();
            })
            .then((myData) => {
                this.setState({
                    jsonData: myData
                });
            });
    }
    removeItem(id) {
        const { jsonData } = this.state;
        delete jsonData[id];
        this.setState({
            jsonData

        });
    }
    showModal = (id) => {


        const { jsonData } = this.state;
        this.setState({
            show: true,
            data: jsonData[id],


        });
        console.log(this.state.data, 'tete');
    }


    hideModal = () => {
        this.setState({ show: false })
    }
    // handleChange = event => {
    //     let { formData } = this.state;
    //     formData[event.target.name] = event.target.value;
    //     formData[event.target.name] = event.target.value;
    //     this.setState({ formData });
    // };

    handleChange = (event) => {
        let { data } = this.state;
        data[event.target.id] = event.target.value;
        data[event.target.age] = event.target.value;
        data[event.target.name] = event.target.value;
        data[event.target.surname] = event.target.value;
        data[event.target.phone] = event.target.value;
        this.setState({ data });
    }

    add = () => {
        const { jsonData, formData, updateData, data } = this.state;
        // jsonData.push(formData);
        console.log(jsonData);
        console.log(data, 'hcaxik');


        Array.prototype.splice.apply(jsonData, [0, data.length].concat(data));
        console.log(jsonData, 'klklkl')
        this.setState({
            jsonData,
            updateData: data,
            show: false
        });

    }


    render() {
        const { jsonData, show, data, updateData } = this.state;
        return (
            <>
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
                        {jsonData.length > 0 ? jsonData.map((user, index) => {
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
                                            onClick={() => this.showModal(index)}


                                        >
                                            Edit
                                        </button>
                                        <Button className="button is-danger" onClick={() => this.removeItem(user.id)}>
                                            <i className="fa fa-trash-o"></i>Delete
                                    </Button>

                                    </td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={this.showModal}>
                    Custom Width Modal
                </Button>

                <Modal

                    show={show}
                    onHide={this.hideModal}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Custom Modal Styling
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col sm="12">
                                    <Form.Control type="number" value={data.id} name="id" onChange={this.handleChange} />
                                </Col>
                                <br /><br />
                                <Col sm="12">
                                    <Form.Control type="number" value={data.age} name="age" onChange={this.handleChange} />
                                </Col>
                                <br /><br />
                                <Col sm="12">
                                    <Form.Control type="text" value={data.name} name="name" onChange={this.handleChange} />
                                </Col>
                                <br /><br />
                                <Col sm="12">
                                    <Form.Control type="text" value={data.surname} name="surname" onChange={this.handleChange} />
                                </Col>
                                <br /><br />
                                <Col sm="12">
                                    <Form.Control type="text" value={data.phone} name="phone" onChange={this.handleChange} />
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.hideModal}>
                            Cancel
                        </Button>
                        <Button type="submit" value="Submit" onClick={this.add}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default JsonData;