import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhrase, saySmthAction } from '../../modules/home'
import { sendAction } from '../../store';

class HomeComponent extends Component {
  static getInitialProps() {
    sendAction(saySmthAction('Привет с сервера'));
  }

  componentDidUpdate() {
    const { saySmthAction } = this.props;

    saySmthAction('Привет с клиента');
  }

  render() {
    const { phrase } = this.props;

    return (
      <div>
        Привет, Мир!!! { phrase }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  phrase: getPhrase(state),
});

const mapDispatchToProps = {
  saySmthAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);