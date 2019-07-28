import React from 'react';
import PropTypes from 'prop-types';

export default function NoMatch({ location: { pathname } }) {
  return (
    <div>
      <h3>
        No match for <code>{pathname}</code>
      </h3>
    </div>
  );
}

NoMatch.propTypes = {
  location: PropTypes.object.isRequired,
};
