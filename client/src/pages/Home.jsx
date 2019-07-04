import React, { Component } from "react";
import { Container, Header, Table, Grid, Icon, Input, Select, Button, Form } from 'semantic-ui-react'
//Login
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: ['',''],
      step: 'init',
      idChange: false,
      round: 0,
      userOne: {},
      userTwo: {},
      win1: 0,
      win2: 0,
      curr: '',
      winRound: '',
      currMoveOne: '',
      currMoveTwo: '',
      selected: '',
      draw: false,
      rounds: [],
      opts: [
        { key: '', value: '', text: 'Select move', selected: true, disabled: true },
        { key: 'rock', value: 'rock', text: 'rock' },
        { key: 'scissors', value: 'scissors', text: 'scissors' },
        { key: 'paper', value: 'paper', text: 'paper' },
      ],
      moves: [
        {move: 'paper', kills: 'rock'},
        {move: 'rock', kills: 'scissors'},
        {move: 'scissors', kills: 'paper'},
      ]
    };

    this.setParams = this.setParams.bind(this);
    this.confirm = this.confirm.bind(this);
    this.nextMove = this.nextMove.bind(this);
    this.changeSelectedValue = this.changeSelectedValue.bind(this);
    this.again = this.again.bind(this);
    this.draw = this.draw.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  setParams(e){
    const name = e.target.name;
    let data = this.state.nickname;
    if(name === 'one') {
      data[0] = e.target.value;
    }
    if(name === 'two') {
      data[1] = e.target.value;
    }
    this.setState({nickname: data})
  }

  confirm(e){
    e.preventDefault();
    this.createUser(0);
    this.createUser(1);
    this.setState({step: 'game', round: 1, curr: 'one'});
  }
  draw(){
    this.setState({draw: false, curr: 'one'});
  }
  again(e){
    e.preventDefault();
    this.createUser(0, this.state.winRound);
    this.createUser(1, this.state.winRound);
    this.createGame(this.state.rounds);
    this.setState({step: 'game', round: 1, curr: 'one', rounds:[]});
  }
  nextMove(e){
    if(this.state.curr === 'one') {
      this.setState({
        curr: 'two', 
        currMoveOne: this.state.selected, 
        idChange: !this.state.idChange
      })
    }
    if(this.state.curr === 'two') {
      if(this.state.selected === this.state.currMoveOne) {
        this.setState({draw: true});
      } else {
        if(this.state.round <= 3) {
          this.state.moves.map((m) =>{
            if(m.move === this.state.selected && m.kills === this.state.currMoveOne){
              let rounds = this.state.rounds;
              let wRound = {
                round: this.state.round,
                winner: this.state.userTwo.nickname,
                move: this.state.selected
              }
              rounds.push(wRound);
              this.setState({
                step: this.state.round === 3 ? 'finish' : 'result', 
                round: this.state.round + 1, 
                currMoveOne: '', 
                win2: this.state.win2 + 1, 
                idChange: !this.state.idChange,
                curr: 'one',
                rounds: rounds
              })
            }
            if(this.state.currMoveOne === m.move && m.kills === this.state.selected) {
              let rounds = this.state.rounds;
              let wRound = {
                round: this.state.round,
                winner: this.state.userOne.nickname,
                move: this.state.selected
              }
              rounds.push(wRound);
              this.setState({
                step: this.state.round === 3 ? 'finish' : 'result', 
                round: this.state.round + 1, 
                currMoveOne: '', 
                win1: this.state.win1 + 1, 
                idChange: !this.state.idChange,
                curr: 'one',
                rounds: rounds
              })
            }
          })
        }
        if(this.state.round === 3) {
          if(this.state.win1 > this.state.win2) {
            let u1 = this.state.userOne
            u1.winners = u1.winners + 1;
            this.setState({
              step: 'finish', 
              userOne: u1, 
              winRound: this.state.userOne.nickname, 
              idChange: !this.state.idChange,
            });
          } else {
            let u2 = this.state.userTwo
            u2.winners = u2.winners + 1;
            this.setState({
              step: 'finish', 
              userTwo: u2, 
              winRound: this.state.userTwo.nickname, 
              idChange: !this.state.idChange,
            });
          }
        }
      }
    }
  }
  changeSelectedValue(e, data) {
    this.setState({selected: data.value})
  }
  createUser(position, result){
    let self = this;
    let win = false;
    if(self.state.nickname[position] === result) {
      win = true
    }
    fetch(process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/users/' : 'http://localhost:8080/users/', {
        method: 'POST',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname: self.state.nickname[position], win: win  })
      })
      .then( ( response ) => response.json() )
      .then( ( data ) => {
        if(position === 0) {
          this.setState({userOne: data})
        }
        if(position === 1) {
          this.setState({userTwo: data})
        }
        console.log("user: ", data);
      }); 
  }

  createGame(results){
    let self = this;
    fetch(process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/game/' : 'http://localhost:8080/game/', {
        method: 'POST',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerOne: self.state.userOne._id, playerTwo: self.state.userTwo._id,  winner: self.state.winRound, results: results })
      })
      .then( ( response ) => response.json() )
      .then( ( data ) => {
        console.log("gameSet", data);
      }); 
  }

  render() {
    let resultsRows = []
    if(this.state.rounds.length > 0) {
      resultsRows  = this.state.rounds.map((round, ind)=>{
        return (<Table.Row>
        <Table.Cell>{round.round}</Table.Cell>
        <Table.Cell>{round.winner}</Table.Cell>
      </Table.Row>)
      })
    } 
    return (
      <div>
        <Container textAlign="center" className="pt100">
          <Header as="h1">Rock, Paper or Scissors</Header>
          {this.state.step === 'init' &&
            <React.Fragment>
              <Header>Enter player's name:</Header>
              <Grid.Row className="pt20">
                <Input 
                  label='Player One' 
                  placeholder='Nickname' 
                  name="one" 
                  onChange={this.setParams} 
                  value={this.state.nickname[0]}
                />
              </Grid.Row>
              <Grid.Row className="pt20">
                <Input 
                  label='Player Two' 
                  placeholder='Nickname' 
                  name="two" 
                  onChange={this.setParams} 
                  value={this.state.nickname[1]} 
                />
              </Grid.Row>
              <Grid.Row className="pt20">
                <Button icon labelPosition='right' onClick={this.confirm}>
                  Start!
                  <Icon name='right arrow' />
                </Button>
              </Grid.Row>
            </React.Fragment>
          }
          {this.state.draw &&
            <React.Fragment key={this.state.idChange}>
            <Header>Draw!</Header>
            <Grid.Row className="pt20">
              <Button icon labelPosition='right' onClick={this.draw}>
                Again
                <Icon name='right arrow' />
              </Button>
            </Grid.Row>
          </React.Fragment>
          }
          {this.state.step === 'game' && this.state.userOne && this.state.userTwo && !this.state.draw &&
            <React.Fragment key={this.state.idChange}>
              <Header>Player {this.state.curr}</Header>
              <Grid.Row className={`pt20 ${this.state.idChange}`}>
                <Form.Field 
                  control={Select} 
                  placeholder='Select move' 
                  options={this.state.opts} 
                  onChange={this.changeSelectedValue}
                />
              </Grid.Row>
              <Grid.Row className="pt20">
                <Button icon labelPosition='right' onClick={this.nextMove}>
                  Next
                  <Icon name='right arrow' />
                </Button>
              </Grid.Row>
            </React.Fragment>
          }
          {this.state.step === 'result' && this.state.userOne && this.state.userTwo && !this.state.draw &&
            <React.Fragment key={this.state.idChange}>
              <Header>Player {this.state.curr}</Header>
              <Grid columns="2">
                <Grid.Row>
                  <Grid.Column width="8" floated="left">
                    <Grid.Row className={`pt20 ${this.state.idChange}`}>
                      <Form.Field 
                        control={Select} 
                        placeholder='Select move' 
                        options={this.state.opts} 
                        onChange={this.changeSelectedValue}
                      />
                    </Grid.Row>
                    <Grid.Row className="pt20">
                      <Button icon labelPosition='right' onClick={this.nextMove}>
                        Next
                        <Icon name='right arrow' />
                      </Button>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column width="8" floated="left">
                    <Header>Results</Header>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Round</Table.HeaderCell>
                          <Table.HeaderCell>Winner</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {resultsRows}                        
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </React.Fragment>
          }
          {this.state.step === 'finish' && 
            <React.Fragment>
              <Grid columns="2">
                <Grid.Row>
                  <Grid.Column width="8" floated="left">
                    <Header>Winner: {this.state.winRound}</Header>
                    <Grid.Row className="pt20">
                      <Button icon labelPosition='right' onClick={this.again}>
                        Again
                        <Icon name='right arrow' />
                      </Button>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column width="8" floated="left">
                    <Header>Results</Header>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Round</Table.HeaderCell>
                          <Table.HeaderCell>Winner</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {resultsRows}                        
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </React.Fragment>
          }
        </Container> 
      </div>
    );
  }
}   