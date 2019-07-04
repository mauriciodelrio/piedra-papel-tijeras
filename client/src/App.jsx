import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import Main from './Main'

const dataLayer = window.dataLayer || [];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      env: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
        // console.log(this.props.location.pathname + this.props.location.search);
        if(dataLayer){
          dataLayer.push({
            'event': 'pagina-virtual',
            'page': this.props.location.pathname,
            'pagename' : 'Prueba Octano - ' + this.props.location.pathname
          });
        }
    }
  }

  render() {
    return (
      <div>
        { this.state.env && <Main /> }
      </div>
    );
  }
}   

export default withRouter(props => <App {...props}/>);
