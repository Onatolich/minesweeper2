import React from 'react';
import PropTypes from 'prop-types';
import bembi from 'bembi';
import './Cell.scss';

export default function Cell(props) {
  const {
    risk,
    isMine,
    isOpen,
    isMarked,
    ...rest
  } = props;

  let modifiers = {
    marked: isMarked,
  };

  if (isOpen) {
    modifiers = {
      ...modifiers,
      open: isOpen,
      mine: isMine,
    };
  }

  return (
    <div {...rest} className={bembi('Cell', modifiers)}>
      <div className="Cell__Content">
        {isOpen && !!risk && risk}
      </div>
    </div>
  );
}

Cell.propTypes = {
  risk: PropTypes.number,
  isMine: PropTypes.bool,
  isOpen: PropTypes.bool,
  isMarked: PropTypes.bool,
};

Cell.defaultProps = {
  risk: 0,
};
