import React, {Component} from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import {SearchIcon} from '@primer/octicons-react'
import Switch from 'react-switch'
import logo from './logo.jpeg'


/**
 * Component for the search bar
 * 
 * Takes the dispatcher as prop
 */
class SearchForm extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.disp = props.disp;
      this.componentRef = React.createRef();
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      console.log("search button handler");
      this.disp.newSearch();
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <button>
            <SearchIcon />
          </button>
          <input type='text' value={this.state.value} onChange={this.handleChange} placeholder='player name (first or last)' />
        </form>
      );
    }
  }
/**
 * Component for the card/list switch
 * 
 * Takes the dispatcher as prop
 */
class ToggleSwitch extends Component {
  constructor(props) {
    super();
    this.state = { checked: false };
    this.disp = props.disp;
    this.handleChange = this.handleChange.bind(this);
  }
  //reset the page navigator and do search
  componentDidUpdate(prevProps, prevState) {
    this.disp.newSearch();
  }
  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    //console.log(this.state.checked);
    return (
      <label>
        <Switch 
          onChange={this.handleChange} 
          checked={this.state.checked} 
          checkedIcon={<div 
                          style={{
                            display: "flex",
                            position: "relative",
                            right: -15,
                            justifyContent: "right",
                            alignItems: "center",
                            width: "80%",
                            height: "100%",
                            fontSize: 19
                          }}>List</div>}
          uncheckedIcon={<div 
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "65%",
                            height: "100%",
                            fontSize: 19
                          }}>Card</div>}
          width={80}/>
      </label>
    );
  }
}
/**
 * Component for pagination
 * 
 * Takes the dispatcher as prop
 */
class PageNavigator extends Component {
  constructor (props) {
    super()
    this.state = { page : 1 };
    this.disp = props.disp;
    this.incPage = this.incPage.bind(this);
    this.decPage = this.decPage.bind(this);
    this.componentRef = React.createRef();
  }
  //update the state of the view
  componentDidUpdate(prevProps, prevState) {
    this.disp.search();
  }
  incPage(event) {
    //console.log('incPage');
    var nextPage = this.state.page + 1;
    this.setState({page:nextPage});
  }
  decPage(event) {
    //console.log('decPage');
    if (this.state.page > 1) {
      var lastPage = this.state.page - 1;
      this.setState({page:lastPage});
    }
  }
  render() {
    return (
      <Container fluid className="p-3">
        <Row md={1} className="p-3">
          <Col md={3} />
          <Col md={2}>
            <button onClick={this.decPage}>Back</button>
          </Col>
          <Col md={2}>Page {this.state.page} </Col>
          <Col md={2}>
            <button onClick={this.incPage}>Next</button>
          </Col>
        </Row>
      </Container>
    )
  }

}
/**
 * Format text for card view
 * @param info player info object 
 * @returns formatted player card text
 */
function formatCardText(info) {
  //console.log(info.height_feet == null);
  return (
    <Card.Text>
      Name: {info.first_name + " " 
      + info.last_name}<br />
      Height: {(info.height_feet == null) ? "Unknown" : info.height_feet+ "'"+ info.height_inches+"\""}<br />
      Position: {(!info.position || info.position.length === 0) ? "Unknown" : info.position} <br />
      Team: {(info.team == null) ? "Unknown" : info.team.full_name}
    </Card.Text>
  )
}
/**
 * Generate the list view html
 * @param info_list list of player info objects 
 * @returns string of html for the list view
 */
function generate_list(info_list) {
  return '<ul>' + info_list.map(function (player) { 
    return '<li>' + format_list_entry(player) + '</li>'}).join('') + '</ul>';
}
/**
 * Format a player list entry
 * @param info player info object 
 * @returns formatted string
 */
function format_list_entry(info) {
  var output = "";
  output += "Name: " + info.first_name + " " + info.last_name + " <pre> "
  + "Height: " + ((info.height_feet == null) ? "Unknown <br>" : info.height_feet+ "' "+ info.height_inches+"\" <br>")
  + "Position: " + ((!info.position || info.position.length === 0) ? "Unknown <br>" : info.position + " <br> ")
  + "Team: " + ((info.team == null) ? "Unknown" : info.team.full_name);
  return output
}
/**
 * Component containing the player display. Is either a grid of cards, or a list,
 * depending on the view state it is in.
 * 
 * Takes the dispatcher as a prop
 */
class NbaCardGrid extends Component {
  constructor(props) {
    super();
    this.state = { players_info_list : [], viewIsList : false};
    this.disp = props.disp;
    this.teamColorMap = {
      "Atlanta Hawks":"danger",
      "Boston Celtics": "success",
      "Brooklyn Nets" : "secondary",
      "Charlotte Hornets" : "info",
      "Chicago Bulls" : "danger",
      "Cleveland Cavaliers" : "warning",
      "Dallas Mavericks" : "primary",
      "Denver Nuggets" : "info",
      "Detroit Pistons" : "primary",
      "Golden State Warriors" : "info",
      "Houston Rockets" : "danger",
      "Indiana Pacers" : "warning",
      "Los Angeles Clippers" : "light",
      "Los Angeles Lakers" : "warning",
      "Memphis Grizzlies" : "primary",
      "Miami Heat" : "danger",
      "Milwaukee Bucks" : "success",
      "Minnesota Timberwolves" : "info",
      "New Orleans Pelicans" : "danger",
      "New York Knicks" : "primary",
      "Oklahoma City Thunder" : "info",
      "Orlando Magic" : "primary",
      "Philadelphia 76ers" : "light",
      "Phoenix Suns" : "warning",
      "Portland Trail Blazers" : "dark",
      "Sacramento Kings" : "dark",
      "San Antonio Spurs" : "secondary",
      "Toronto Raptors" : "danger",
      "Utah Jazz" : "warning",
      "Washington Wizards" : "primary"
    }
    this.componentRef = React.createRef();
  }
  //janky way of injecting the list
  componentDidUpdate(prevProps, prevState) {
    if (this.state.viewIsList) {
      document.getElementById('list').innerHTML = generate_list(this.state.players_info_list);
    }
  }
  //method to fetch new players, causes state change thus re-render
  getInfo(term, per_page, page, isList) {
    console.log("Requesting player info with search '" + term + "' and page " + page.toString());
    fetch('https://www.balldontlie.io/api/v1/players?' + 
    new URLSearchParams({
        page:page,
        per_page:per_page,
        search:term
        }), 
        {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            //console.log(data['data'].length.toString() + " players received");
            this.setState({ players_info_list : data['data'], viewIsList : isList})
        });
  }
  //render the players view
  render() {
    //if in card mode
    return !this.state.viewIsList ? 
    (
      <Container fluid className="p-3">
        <Row md={3} className="p-3">
          <Col md={4}>
            <>
            {this.state.players_info_list.length ? (
              <Card bg={this.teamColorMap[this.state.players_info_list[0].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[0].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[0])}
                </Card.Body>
              </Card>
            ) : "No players to display"}
            </>
          </Col>
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 1 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[1].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[1].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[1])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 2 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[2].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[2].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[2])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
        </Row> 
        <Row md={3} className="p-3">
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 3 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[3].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[3].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[3])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 4 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[4].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[4].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[4])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 5 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[5].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[5].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[5])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
        </Row> 
        <Row md={3} className="p-3">
        <Col md={4}>
            <>
            {this.state.players_info_list.length > 6 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[6].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[6].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[6])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 7 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[7].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[7].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[7])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
          <Col md={4}>
            <>
            {this.state.players_info_list.length > 8 && (
              <Card bg={this.teamColorMap[this.state.players_info_list[8].team.full_name]} 
                    style={{ width: '18rem' }}
                    text={this.teamColorMap[this.state.players_info_list[8].team.full_name] == 'dark' ? "light" : "dark"}>
                <Card.Img src={logo}/>
                <Card.Body>
                  {formatCardText(this.state.players_info_list[8])}
                </Card.Body>
              </Card>
            )}
            </>
          </Col>
        </Row> 
      </Container>
    ) : //ternary else for list mode
    (
      <div id='list'></div> //insert blank div to be injected
    )
  }
}
  

export {SearchForm, ToggleSwitch, PageNavigator, NbaCardGrid}