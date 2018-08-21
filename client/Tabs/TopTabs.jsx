import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import UserTabs from './UserTabs.jsx';
import SitterTabs from './SitterTabs.jsx';

export default class TopTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    if (!this.props.user) {
      return null;
    } else {
        return (
          <Tab.Container id="top-tabs" defaultActiveKey="first">
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="tabs" className="nav-justified">
                  <NavItem eventKey="first">USER</NavItem>
                  <NavItem eventKey="second">SITTER</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation={false}>
                  <Tab.Pane eventKey="first">
                    <br />
                    <br />
                    <UserTabs user={this.props.user}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <br />
                    <br />
                    <SitterTabs user={this.props.user}/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        );

    }
  }
}
