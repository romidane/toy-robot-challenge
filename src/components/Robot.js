import React from 'react';
import classNames from 'classnames';

import { SOUTH, WEST, EAST} from '../constants';

export default function Robot({ position, width, height, offset }) {
  const robotClasses = classNames({
    fas: true,
    'fa-robot': true,
    'fa-rotate-90': position.facing === EAST,
    'fa-rotate-180': position.facing === SOUTH,
    'fa-rotate-270': position.facing === WEST,
  });
  const robotXPosition = (offset * position.x) - (width / 2);
  const robotYPosition = -Math.abs((offset * position.y) - (height / 2));

  const x = position.x === 0 ? 0 : robotXPosition;
  const y = position.y === 0 ? 0 : robotYPosition;

  const robotStyles = {
    transform: `translate(${x}px, ${y}px)`,
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <span
      className="app-robot"
      style={robotStyles}
    >
      <i className={robotClasses}></i>
    </span>
  )
}
