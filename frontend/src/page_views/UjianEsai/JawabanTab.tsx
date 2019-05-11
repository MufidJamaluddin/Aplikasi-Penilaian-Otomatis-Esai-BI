import React, { Component } from "react";
import { FormGroup, Input, Col, TabPane } from 'reactstrap';

interface SoalTabAttribute 
{ 
  tabId: number;
  noSoal: number;
  idsoal: string;
  skorMax: string;
  soalEsai: string;
}

class JawabanTab extends Component<SoalTabAttribute>
{
    render()
    {
        return(
            <TabPane tabId={ this.props.tabId }>
                <FormGroup row>
                <Col className="col-sm-3">
                    <h5>Soal { this.props.noSoal } :</h5>
                </Col>    

                <Col sm="12">
                    <p>{ this.props.soalEsai }</p>
                </Col>
                <Col sm="12">
                    <Input type="textarea"  rows="3" placeholder="Input Jawaban" required/> 
                </Col>                      
                </FormGroup>
            </TabPane>
        );
    }
}

export default JawabanTab;