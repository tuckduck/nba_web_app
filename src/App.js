import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Row, Col} from 'react-bootstrap'
import { SearchForm, ToggleSwitch, PageNavigator, NbaCardGrid} from './Components'
import React from 'react';

//import ToggleSwitch from './Components'

/**
 * Dispatcher Object to hold all the references, and handle the interaction between 
 * components.
 */
class dispatcher {
  constructor() {
    this.active = false;
    this.searchBarRef = React.createRef();
    this.viewSliderRef= React.createRef();
    this.displayRef   = React.createRef();
    this.pageNavRef   = React.createRef();
  }
  newSearch() {
    this.pageNavRef.setState({page:1});
  }
  search(){
    this.displayRef.getInfo(this.searchBarRef.state.value, this.viewSliderRef.state.checked ? 12 : 9, this.pageNavRef.state.page, this.viewSliderRef.state.checked);
  }
  
  init() {
    this.active = true;
  }
}
/**
 * Main app component. Creates the subcomponent and puts references to them into the dispatcher.
 */
export default class App extends React.Component {
  disp = new dispatcher();
  render () {
    return (
      <div>
        <script>window.current_players=null</script>
        <Container fluid className="p-3">
          <Row md={2} className="p-3">
            <Col md={6}><SearchForm ref={node => this.disp.searchBarRef = node} disp={this.disp}/></Col>
            <Col md={6}><ToggleSwitch ref={node => this.disp.viewSliderRef = node} disp={this.disp}/></Col>
          </Row>
          <Row md={9} className="p-3">
            <NbaCardGrid ref={node => this.disp.displayRef = node} disp={this.disp}/>
          </Row> 
          <Row md={1} className="p-3"><PageNavigator ref={node=> this.disp.pageNavRef = node} disp={this.disp}/></Row>
        </Container>
      </div>
    );
  }
}

