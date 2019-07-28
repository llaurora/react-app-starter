import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import * as loginAction from '../../../../redux/Login/loginAction';

@connect(
  null,
  dispatch => bindActionCreators({ ...loginAction }, dispatch),
)
export default class Aside extends Component {
  static propTypes = {
    changeLoginState: PropTypes.func,
    history: PropTypes.object.isRequired,
  };

  static defaultProps = {
    changeLoginState: () => {},
  };

  goLogOff = () => {
    this.props.changeLoginState('CLEAR_LOGIN_STATE');
    this.props.history.replace('/');
  };

  render() {
    return (
      <div id="asideArea">
        <ul>
          <li>侧边导航栏</li>
          <li>
            <NavLink exact to="/pageone" activeClassName="activeLink">
              第一页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagetwo" activeClassName="activeLink">
              第二页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagethree" activeClassName="activeLink">
              第三页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagefour" activeClassName="activeLink">
              第四页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagefive" activeClassName="activeLink">
              第五页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagesix" activeClassName="activeLink">
              第六页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pageseven" activeClassName="activeLink">
              第七页
            </NavLink>
          </li>
        </ul>
        <span onClick={this.goLogOff}>退出登录</span>
      </div>
    );
  }
}
