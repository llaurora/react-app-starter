import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import globalLoading from '@/asset/images/globalLoading.gif';
import styles from './index.scss';

function Loading({ scope }) {
  return (
    <div
      className={classnames(styles.loadingWrapper, {
        [styles.globalLoading]: scope === 'global',
        [styles.localLoading]: scope === 'local',
      })}
    >
      <img src={globalLoading} alt="加载中..." />
    </div>
  );
}

Loading.propTypes = {
  scope: PropTypes.string,
};

Loading.defaultProps = {
  scope: 'local',
};

export default memo(Loading);
