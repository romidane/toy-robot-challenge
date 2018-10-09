import React from 'react';


export default function Instructions() {
  return (
    <div className="app-instructions">
      <div className="app-shell-top-bar">
        <span>Input Commands</span>
      </div>
      <div className="app-shell-body">
        <h3 className="app-instructions__heading-bravo">place(x, y, facing)</h3>
        <p className="app-instructions__text">
          x and y are integers that relate to a location on the grid.
          Values that are outside the boundary of the grid should not be allowed.
          facing is a string referencing the direction the robot is facing. Values NORTH, SOUTH, EAST or WEST are allowed.
        </p>

        <h3 className="app-instructions__heading-bravo">move()</h3>
        <p className="app-instructions__text">
          Moves the robot 1 grid unit in the direction it is facing unless that movement
          will cause the robot to fall off the grid.
        </p>

        <h3 className="app-instructions__heading-bravo">left()</h3>
        <p className="app-instructions__text">Rotate the robot 90° anticlockwise / counterclockwise.</p>

        <h3 className="app-instructions__heading-bravo">right()</h3>
        <p className="app-instructions__text">Rotate the robot 90° clockwise.</p>

        <h3 className="app-instructions__heading-bravo">report()</h3>
        <p className="app-instructions__text">Outputs the robot's current grid location and facing direction.</p>
      </div>
    </div>
  )
}