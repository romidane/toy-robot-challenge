import React, { Component } from 'react';
import { connect } from "react-redux";
import uuid from 'uuid/v4';
import serializeForm from 'form-serialize';

import {
  move,
  left,
  right,
  place,
  report,
  log,
} from '../redux/actions';


class Console extends Component {
  parseCommand(command) {
    const cleanCommand = command.replace(/\s/g, '');
    const matchCommandArgsRegex =  /\w+\(([A-Za-z,0-9"']*)\)/gi;

    const result = matchCommandArgsRegex.exec(cleanCommand);

    if (!result) return { command: '', args: []};

    return {
      command: cleanCommand,
      args: result[1].split(',')
    }
  }

  runCommand({ command, args }) {
    const matchPlaceCommandRegex = /place\(\d+,\d+,("|')?\w+("|')?\)/g;

    if (command === 'move()') {
      return this.props.move();
    }

    if (command === 'left()') {
      return this.props.left();
    }

    if (command === 'right()') {
      return this.props.right();
    }

    if (command === 'report()') {
      return this.props.report(this.props.currentPosition);
    }

    if (command.match(matchPlaceCommandRegex)) {
      return this.props.place(...args)
    }

    return this.props.log('Invalid command');
  }

  handleSubmit(event) {
    event.preventDefault();

    const { command } = serializeForm(event.target, { hash: true });

    this.props.log(command);

    const commandToRun = this.parseCommand(command);

    this.runCommand(commandToRun);

    event.target.reset();
  }

  renderLog() {
   return (
    <ul className="app-shell-body">
      {this.props.logs.map((logItem) => {
        return <li key={uuid()}>{logItem}</li>
      })}
    </ul>
   )
  }

  render() {
    return (
      <div className="app-console">
        <div className="app-shell-top-bar">
          <span>Console</span>
        </div>
          <form className="app-console__form" onSubmit={(event) => this.handleSubmit(event)}>
            <input autoFocus placeholder="Type a command" type="text" name="command" />
          </form>
          {this.renderLog()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  logs: state.log,
  currentPosition: state.grid.currentPosition
});

export default connect(mapStateToProps, {
  move,
  left,
  right,
  report,
  place,
  log
} )(Console);