import React, {Component} from 'react';
import axios from 'axios';

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name : '',
      email : '',
      contactnumber : '',
      password:'',
      sent:false,
      file:'',
      errors: {
        fullName: '',
        email: '',
        contactnumber: '',
        password:'',
        file: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
  
    const {name, value}  = event.target;

    this.setState({ 
      [name]: value
    });

    let errors = this.state.errors;
    switch (name) {
      case 'name':
      errors.fullName = (value.length < 6 || value.length === '')? 'Name must be graterthan 6 character!' : '';
      break; 

      case 'email':
      errors.email = (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || value.length === '') ? '' : 'Please Enter a valid mail!';
      break;

      case 'contactnumber':
      errors.contactnumber =  '';

      if (value.length < 10 || value.length === '') {
        errors.contactnumber = 'Contact Number must be more than 10';
      }
      if (value.length > 15) {
        errors.contactnumber =  'Contact Number must be less than 15'; 
      }

      break;
      case 'password':
      errors.password = (value.length < 6 || value.length === '')? 'password is too short! Plese enter more than 6 characters' : '';
      break;

    }
    this.setState({errors, [name]: value});
  } 

  onChangeFile(event) {

    let file = event.target.files;
    
    if (!file[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {

      this.state.errors.file = 'Only jpeg,png and jpg accepted';

      this.setState({file:this.state.errors.file})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    
    let data = {
      name : this.state.name,
      email : this.state.email,
      contactnumber : this.state.contactnumber,
      password: this.state.password
    }
    let errors = this.state.errors;
    
    if (data.name === '') {
      errors.fullName = 'Name must be filled out';
    }
    
    if (data.email === '') {
      errors.email = 'Email must be filled out';
    }

    if (data.password === '') {
      errors.password = 'Password should be filled out';
    }
    
    this.setState({errors});
    let emptyErrors = this.state.errors;
    
    if (emptyErrors.fullName === '' && emptyErrors.email === '' && emptyErrors.password === '' && emptyErrors.file === '') {
      axios.post('/show', data).then( res => {
      this.setState({ sent: true })
      })
      .catch( () => {
      console.log('Message not sent')
      this.resetForm();
      })  
    } else {
      console.log('Invalid form');
      return false;
    }
    
  }

  resetForm() { 
    this.setState({name: "", email: "", contactnumber: "", password:"", file: ""})
  }

  render() {
    const errors = this.state.errors;
    
    return (
        <form className = "contact-form" onSubmit={this.handleSubmit}>
        <h2>Contact Us</h2>
        <div className= "form-group">
        <input type="text" className = "form-control" placeholder= "Enter Your Name" name ="name" value={this.state.name} onChange={this.handleChange} />
        
        <span className='error'>{ errors.fullName.length> 0 ? errors.fullName : ''}</span>
        </div
        >
        <div className= "form-group">
        
        <input type="email" className = "form-control" placeholder= "Enter Your Mail" name = "email" value={this.state.email} onChange={this.handleChange} />
        <span className='error'>{ errors.email.length> 0 ? errors.email : ''}</span>
        </div>
        <div className= "form-group">
        
        <input type="password" className = "form-control" placeholder= "Enter Your Password" name= "password" value= {this.state.password} onChange = {this.handleChange} />
        <span className='error'>{ errors.password.length> 0 ? errors.password : ''}</span>
        </div>
        <div className= "form-group">
        
        <input type="number" className = "form-control" placeholder= "Enter Your Contact" name= "contactnumber" value= {this.state.contactnumber} onChange = {this.handleChange} />
        <span className='error'>{ errors.contactnumber.length> 0 ? errors.contactnumber : ''}</span>
        </div>
        <div className= "form-group">
        <input type="file" className = "form-control" onChange = {this.onChangeFile}/>
        <span className='error'>{ errors.file.length> 0 ? errors.file : ''}</span>
        </div>
        <br/>
        <input type="submit" value="Submit" />
      </form>   
    );
  }
}

export default ContactUs;