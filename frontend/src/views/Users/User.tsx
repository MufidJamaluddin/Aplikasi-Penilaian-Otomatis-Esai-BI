import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'
import { RouteComponentProps } from 'react-router';

class User extends Component<RouteComponentProps<any>>
{
  private entries(obj:any) : any[]
  {
    let ownProps = Object.keys(obj);
    let resArray = new Array(ownProps.length);

    for(let i=0; i<ownProps.length; i++) 
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  }

  public render() : JSX.Element
  {
    const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    const userDetails = user ? this.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;