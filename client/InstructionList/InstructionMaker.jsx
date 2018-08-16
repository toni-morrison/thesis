import React from 'react';
import moment from 'moment';
import {
  Table,
  Button,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

export default class InstructionMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: '',
      time: [],
      start: '',
      end: '',
      dropDownTime: '',
      orgTimes: []
    };
    this.intervals = this.intervals.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  componentDidMount() {
    this.setTimes();
  }

  setTimes() {
    this.setState(
      {
        time: this.intervals(
          this.state.start || '6:00 pm',
          this.state.end || '11:45 pm'
        )
      },
      () => {
        this.setState({
          dropDownTime: this.state.start || '6:00 pm',
          orgTimes: this.state.time
        });
      }
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addItem() {
    var ddt = this.state.dropDownTime;
    var idx;
    for (var i = 0; i < this.state.time.length; i++) {
      var timeTup = this.state.time[i];
      if (timeTup.indexOf(ddt) >= 0) {
        idx = i;
      }
    }
    var newTup = [ddt, this.state.instruction];
    var clone = Array.from(this.state.time);
    clone.splice(idx, 1, newTup);
    this.setState({
      time: clone,
      instruction: ''
    });
  }

  intervals(startString, endString) {
    var start = moment(startString, 'hh:mm a');
    var end = moment(endString, 'hh:mm a');
    start.minutes(Math.ceil(start.minutes() / 15) * 15);
    var result = [];
    var current = moment(start);
    while (current <= end) {
      var timeStr = current.format('h:mm a');
      result.push([timeStr]);
      // result.push(current.format('h:mm a'));
      current.add(30, 'minutes');
    }
    return result;
  }
  onSave() {
    console.log('times:', this.state.time);
  }

  onClear() {
    this.setState({
      time: this.state.orgTimes
    });
  }

  render() {
    const times = this.state.time.map((time, idx) => {
      return (
        <tr>
          <td key={idx}>{time[0]}</td>
          <td key={idx + ' content'}>{time[1]}</td>
        </tr>
      );
    });

    const dropTimes = this.state.time.map((time, idx) => {
      return <option key={idx}>{time[0]}</option>;
    });
    const startTimes = this.intervals('00:00', '23:45').map((time, idx) => {
      return <option key={idx}>{time}</option>;
    });
    const endTimes = this.intervals('00,00', '23:45').map((time, idx) => {
      return <option key={idx}>{time}</option>;
    });
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>{times}</tbody>
        </Table>

        <div id="full-list">
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Start Time</ControlLabel>
            <FormControl
              name="start"
              value={this.state.start}
              onChange={this.handleChange}
              componentClass="select"
              placeholder="select"
            >
              <option value="none">Start Time</option>
              {startTimes}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>End Time</ControlLabel>
            <FormControl
              name="end"
              value={this.state.end}
              onChange={this.handleChange}
              componentClass="select"
              placeholder="select"
            >
              <option value="none">End Time</option>
              {endTimes}
            </FormControl>
            <Button type="button" onClick={this.setTimes}>
              Set
            </Button>
          </FormGroup>
          <form id="instruction-list">
            <ControlLabel>Enter Instruction</ControlLabel>
            <FormControl
              name="instruction"
              type="text"
              value={this.state.instruction}
              placeholder="Enter instruction"
              onChange={this.handleChange}
            />
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Enter Time</ControlLabel>
              <FormControl
                name="dropDownTime"
                value={this.state.dropDownTime}
                onChange={this.handleChange}
                componentClass="select"
                placeholder="select"
              >
                {dropTimes}
              </FormControl>
            </FormGroup>

            <Button type="button" onClick={() => this.addItem()}>
              Add Instruction
            </Button>
            <Button type="button" onClick={() => this.onClear()}>
              Clear
            </Button>
            <Button type="button" onClick={() => this.onSave()}>
              Save
            </Button>
          </form>
        </div>
      </div>
    );
  }
}