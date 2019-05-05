import React, { PureComponent } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';

class LayoutCard extends PureComponent
{
    render()
    {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardBody>
                            { this.props.children }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LayoutCard;