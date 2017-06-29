import React, { Component } from 'react';
import {Grid, Row, Col, Button, PageHeader} from 'react-bootstrap';
import './App.css'

class AppRow extends Component {
  calcFees() {
    let { fees } = this.props.quote;
    let total = 0;
    for (let fee in fees) {
      total += fees[fee];
    }
    let text = (total < 0) ? "Cash to You" : "Cash out of Pocket";
    if (total  < 0) {
      total = total*-1;
    }
    return { total, text }
  }

  render() {
    let { quote, index } = this.props;
    let fees = this.calcFees();
    let indexClass = "App-cell-index App-cell-index-"+(index+1)
    return (
      <Row className="show-grid">
        <Col md={2} className="column">
          <span className={indexClass}></span>
          <span className="App-cell-value">{quote.loan_amount}</span>
          <span className="App-cell-label">Loan Amount</span>
        </Col>
        <Col md={2} className="column">
          <span className="App-cell-value">{quote.rate}%</span>
          <span className="App-cell-label">{quote.apr}% APR</span></Col>
        <Col md={2} className="column">
          <span className="App-cell-value">${fees.total}</span>
          <span className="App-cell-label">{fees.text}</span>
        </Col>
        <Col md={2} className="column">
          <span className="App-cell-value">${quote.principal_and_interest_payment}</span>
          <span className="App-cell-label">Monthly P&I Payment</span>
        </Col>
        <Col md={2} className="column">
          <span className="App-cell-value">${quote.monthly_savings}</span>
          <span className="App-cell-label">Monthly Savings</span>
        </Col>
        <Col md={2} className="column button-col"><Button bsStyle="success">See My rates</Button></Col>
      </Row>
    )
  }
}

class App extends Component {
  state = {
    rates: []
  };
  componentDidMount() {
    fetch('https://lush-mirror.glitch.me/api').then((resp) => {
      //convert response to JSON
      return resp.json();
    }).then((json) => {
      this.setState({ rates: json.quotes });
    })
  }

  quotes() {
    let { rates } = this.state;
    let quotes = [];
    let key = 0;
    rates.map((quote) => {
      quotes.push(<AppRow key={key} quote={quote} index={key} />);
      key++;
      return quote
    });
    return quotes
  }

  render() {
    let quotes = this.quotes();
    return (
      <div className="App">
        <PageHeader>Lenda Quotes</PageHeader>
        <Grid>
          {quotes}
        </Grid>
      </div>
    );
  }
}

export default App;
