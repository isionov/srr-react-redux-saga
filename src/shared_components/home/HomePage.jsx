import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhrase, saySmthAction } from '../../modules/home';
import { renderRoutes } from "react-router-config";
import styled from 'styled-components';

const StyledDiv = styled.div`color: red;`
class HomeComponent extends Component {
  // componentDidMount() {
  //   const { saySmthAction } = this.props;

  //   saySmthAction('Привет с клиента didMount');
  // }

  // componentDidUpdate() {
  //   const { saySmthAction } = this.props;

  //   saySmthAction('Привет с клиента didUpdate');
  // }

  render() {
    const { phrase, route } = this.props;

    return (
      <div>
        <StyledDiv>Привет из дома!!!</StyledDiv>
        <div>{ phrase }</div>
        { renderRoutes(route.routes) }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  phrase: getPhrase(state)
});

const mapDispatchToProps = {
  saySmthAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);