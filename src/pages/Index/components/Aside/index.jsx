import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthorizedRender } from '@/components/Authorized';
import styles from './index.scss';

@connect()
@withRouter
export default class Aside extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  goLogOff = () => {
    const { dispatch, history } = this.props;
    dispatch({ type: 'CLEAR_LOGIN_STATE' });
    history.replace('/');
  };

  render() {
    return (
      <div id={styles.asideArea}>
        <ul>
          <li>侧边导航栏</li>
          <li>
            <AuthorizedRender authority={['pageone']}>
              <NavLink exact to="/pageone" activeClassName={styles.activeLink}>
                第一页
              </NavLink>
            </AuthorizedRender>
          </li>
          <li>
            <NavLink exact to="/pagetwo" activeClassName={styles.activeLink}>
              第二页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagethree" activeClassName={styles.activeLink}>
              第三页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagefour" activeClassName={styles.activeLink}>
              第四页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagefive" activeClassName={styles.activeLink}>
              第五页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pagesix" activeClassName={styles.activeLink}>
              第六页
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/pageseven" activeClassName={styles.activeLink}>
              第七页
            </NavLink>
          </li>
        </ul>
        <span onClick={this.goLogOff}>退出登录</span>
      </div>
    );
  }
}
