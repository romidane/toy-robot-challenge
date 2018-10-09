import React from 'react';

function Cell(props) {
  const { width, height } = props;

  return (
    <div style={{ width, height }} className="app-grid-cell">
    </div>
  )
}

export default Cell;