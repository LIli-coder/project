import React from 'react';
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import validator from 'validator';



import { Button, Modal, Table } from 'react-bootstrap';

class MyTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            phone: "",
            show: false,
            data: null,
            EmailError: "",
            PhoneError: "",
            successMessage: null,
            jsonData: [],
            formData: {
                id: "",
                age: "",
                phone: "",
                name: "",
                surname: "",
                email: "",
               

            },
        }


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


    showModal = () => {
        this.setState({
            show: true
        });
    }

    hideModal = () => {
        this.setState({
            show: false,

        })
    }

    removeItem = (id) => {
        const { data } = this.state;
        const removedArray = data.filter(v => { return v.id !== id });
        this.setState({
            data: removedArray
        })
    }

    addItem = (newData) => {


        newData.id = this.makeId(12);
        const { data } = this.state;
        console.log(data);
        data.push(newData);
        this.setState({
            data,
            newData

        })

    }

    // editItem = (id, editedData) => {
    //     if (this.checkEmailIxists(this.state.formData.email)) {
    //         this.state.EmailError = 'welcome';
    //         //alert('User already Exist');
    //     } else { //false
    //         this.state.EmailError = 'Did You forget Your Email?';
    //         //alert("sign in");
    //     }
    //     console.log((this.checkEmailIxists(this.state.formData.email)));
    //     const { data } = this.state;
    //     const editedArray = data.map(v => {
    //         if (v.id === id) {
    //             return editedData;
    //         } else {
    //             return v;
    //         }
    //     });
    //     this.setState({
    //         data: editedArray,
    //     })
    // }


    _onSave = (event) => {
        if (this.checkEmailIxists(this.state.formData.email)) {
            this.state.EmailError = 'user already exist';
            //alert('User already Exist');
        } else {//false
            this.state.EmailError = "sign in";
            //alert("sign in");
        }
        event.preventDefault();
        //this.checkEmailIxists();
        // if (this.state.checkIfExists) {

        //     alert("user exists");
        // } else {
        //     alert("sucess ");
        // } 
        console.log((this.checkEmailIxists(this.state.formData.email)));


        const { formData } = this.state;

        console.log(formData);
        this.setState({
            formData: {},

        });
        //id exists edit record
        if (formData.id) {
            this.editItem(formData.id, formData);
            //new record add into state
        } else {
            this.addItem(formData);
        }
    }


    _onEdit = (formData) => {

        this.setState({
            formData
        })
        this.showModal();
    }

    
    makeId = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        //alert(JSON.stringify(formData, null, 2));
    }


    // handleSubmit = (e, formData, inputs, index) => {
    //     e.preventDefault();
    //     alert(formData.email);
    //     console.log(this.state.data);
    //     {
    //         this.state.data.map((user, index) => {
    //             return (console.log(user.email));

    //         })
    //     }
    // }
    checkEmailIxists = (email) => {
        // const { formData , data  } = this.state;
        // if (formData.email == this.state.checkIfExists ) {

        //     alert("fail");
        // } else {
        //     alert("sucess");
        // }
        const checkIfExists = this.state.data.filter(function (el) {
            return el.email === email;
        });
        return checkIfExists.length;

    }

    

 


// emailIsUnique = () => {
//     const { formData, compareEmail } = this.state;
//     let emailValue = this.state.compareEmail;
//     for (let i = 0; i < formData.length; i++) {
//         if (emailValue === formData[i].email) {
//             alert("user exists")
//             return false
//         } else {
//             alert("sucess")
//             this.setState({
//                 emailValue
//             })
//         }
//     }
// }


render() {
    const { data, show, formData } = this.state;
    if (data === null) {
        return (<></>);
    }


    return (
            < div >
                <div>
                
                    
                    <Table striped bordered hover>
                        
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Settings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td><b><Link to={`/data/${index + 1}`}>{user.name}</Link></b></td>
                            
                                        
                                        <td><b>{user.surname}</b></td>
                                        <td>{user.age}</td>
                                        <td><b>{user.email}</b></td>
                                        <td><b>{user.phone}</b></td>
                                       
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                                onClick={() => this._onEdit(user)}
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
                    <Button className="button is-danger" onClick={() => this.showModal()}>
                        <i className="fa fa-trash-o"></i>Add
                   </Button>
                </div >
        <Modal
            show={show}
            onHide={this.hideModal}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                    <div className="form-group">
                        <label htmlFor="Name">First name</label>
                        <TextInput name="name" id="firstName" required
                            value={formData.name}
                            onChange={e => {
                                this.setState({
                                    formData: {
                                        ...formData,
                                        name: e.target.value
                                    }
                                })
                            }}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="Surname">Surname</label>
                        <TextInput name="surname" id="surname" required
                            value={formData.surname}
                            onChange={e => {
                                this.setState({
                                    formData: {
                                        ...formData,
                                        surname: e.target.value
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Age">Age</label>
                        <TextInput name="Age" id="age" required
                            value={formData.age}
                            onChange={e => {
                                this.setState({
                                    formData: {
                                        ...formData,
                                        age: e.target.value
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <TextInput name="email" id="email" type="email"
                            validator={validator.isEmail}
                            errorMessage={{ validator: "Please enter a valid email" }}
                            value={formData.email}
                            onChange={e => {
                                this.setState({
                                    formData: {
                                        ...formData,
                                        email: e.target.value
                                    }
                                })
                            }}

                        />
                        <span style={{ fontSize: 16, color: "red" }}>{this.state.EmailError}</span>
                    </div>


                    <div className="form-group">
                        <label htmlFor="Phone">Phone</label>
                        <TextInput name="phone" id="phone" type="text"
                            pattern="^-?[0-9]\d*\.?\d*$"
                            errorMessage={{ required: "Phone is required", pattern: "Please enter valid phone number" }}
                            value={formData.phone}
                            onChange={e => {
                                this.setState({
                                    formData: {
                                        ...formData,
                                        phone: e.target.value
                                    }
                                })
                            }}
                        />
                        <span style={{ fontSize: 16, color: "green" }}>{this.state.PhoneError}</span>
                    </div>


                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </ValidationForm>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.hideModal}>
                    Cancel
                        </Button>
                <Button type="submit" value="Submit" onClick={this._onSave}>
                    Save
                        </Button>
            </Modal.Footer>
        </Modal>
            </div >
        )
    }               
}

export default MyTable;