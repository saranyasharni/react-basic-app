import React, {Component} from 'react';
import Home from './pages/home.jsx'; 
import ContactUs from './pages/contact-us.jsx'; 
import Restaurant from './pages/restaurant.jsx';
import {BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";

class appUniversal extends Component {
  render() {
    const styleLi =  {
    textDecoration: 'none',
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px'
  }

  const listItems = [
    {
      link:'/',
      text:'Home' 
    },
    {
      link:'/contact',
      text:'Contact Us' 
    }, 
    {
      link:'/listing',
      text:'Restaurant'
    } 
  ];

  return (
    <Router>
    <nav>
      <ul className = "nav-links">
        {
          listItems.map((link, i) => {
            return (<li key = {i}><Link style={styleLi} to = {link.link}>{link.text}</Link></li>)
          })
        }
      </ul>
    </nav>
      <Switch>
        <Route exact path="/" component = {Home} />
        <Route path="/contact" component = {ContactUs} />
        <Route path="/listing" component = {Restaurant} />        
      </Switch>
      </Router>
    );
  }
} 

export default appUniversal;