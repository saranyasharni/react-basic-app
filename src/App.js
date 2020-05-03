import React from 'react';
import Footer from './components/footer.jsx';
import './App.css';

import appUniversal from './app-universal';

const getChildElements = (PassedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <PassedComponent />
        </div>
      )
    }
  }
}

export default function App() {
  const Element = getChildElements(appUniversal)
  return (
  	<div>
    <Element />

    <Footer />
    </div>
  );
}

