import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, CardGroup,  ModalBody, ModalFooter, ModalHeader, Input, Button, Card, CardBody, CardHeader, Col, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import { RouteComponentProps } from 'react-router-dom';
import Countdown from "react-countdown-now";
import JawabanTab from "./JawabanTab";
import { initDataSoal } from './../../models/SoalData';
import { getDataUjian } from './../../models/UjianData';
import DataSoal from "./../../models/item_model";
import DataUjian from "./../../models/item_model";
import { Ujian } from '../../admin_views';

interface UjianEsaiState 
{ 
  activeTab: number; 
  success:boolean; 
  modal: boolean;
  listsoal: Array<DataSoal>; 
  ujian: Partial<DataUjian>;
}

interface RouteParam { idujian:string; }

interface UjianEsaiAttribute { className: string; }

class UjianEsai extends Component<UjianEsaiAttribute & RouteComponentProps<RouteParam>, UjianEsaiState>
{
  private idujian:string;

	constructor(props:any) 
	{
		super(props);
		
    this.state = {
      activeTab: 0,
			success: false,
      modal: false,
      listsoal: [],
      ujian:{durasi:'0'}
    };
    
    this.idujian = props.match.params.idujian;

    this.modal= this.modal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSubmitUjian = this.toggleSubmitUjian.bind(this);
  }

  componentDidMount()
  {
    getDataUjian(this.idujian).then(data=>{
      this.setState({ ujian: data });
    });

    initDataSoal(this.idujian).then(list => {
      this.setState({ listsoal: list });
    });
  }


	public modal() : void
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
  
	public toggleSubmitUjian() : void 
	{
    this.setState({
      success: !this.state.success,
    });
  }

  toggle(tab:any) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  renderTimer(data:any)
  {
    return (<span className="h3">{data.hours}:{data.minutes}:{data.seconds}</span>)
  }
  
	public render() : JSX.Element
	{
    var ujian = this.state.ujian;

    return (
        <Container className="p-4">
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
                    <CardHeader>
                      <Row>
                        <Col xs="9">
                          <dd className="col-sm-12 text-left"><b>{ujian.namaMapel||''}</b></dd>
                          <dd className="col-sm-12 text-left"><b>{ujian.namaUjian||''}</b></dd>
                        </Col>
                        <Col xs="3">
                          <dd className="col-sm-12 text-right">
                            <b><Countdown date={Date.now() + 3600000} renderer={this.renderTimer}/></b>
                          </dd>
                        </Col>
                      </Row>
                    </CardHeader>
                        
                    <CardBody>
                      <Row>
                        <Col xs="12">
                          <TabContent activeTab={this.state.activeTab}>
                          {
                            this.state.listsoal.map((soal,index)=> {
                              return (
                                <JawabanTab
                                  key={index}
                                  tabId={index}
                                  noSoal={index+1}
                                  idsoal={soal.idsoal}
                                  skorMax={soal.skorMax}
                                  soalEsai={soal.soalEsai}
                                  />
                              )
                            })
                          }
                          </TabContent>
                        </Col>

                        <Col className="col-sm-12 text-center">
                        {
                          this.state.listsoal.map((soal,index)=>{
                            return(
                              <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(index)} active={this.state.activeTab === index} key={index}>
                              {index+1}
                              </Button>     
                            )
                          })
                        }         
                        </Col>

                              <Col className="col-sm-12 text-right">
                              <Button  color="success"  onClick={this.toggleSubmitUjian} >Submit Ujian</Button>
                              
                                <Modal isOpen={this.state.success} toggle={this.toggleSubmitUjian} className={'modal-success ' + this.props.className}>
                                        <ModalHeader toggle={this.toggleSubmitUjian}>Submit Ujian</ModalHeader>
                                        <ModalBody>
                                        
                                                        <p>Apakah anda yakin ingin menyelesaikan ujian ini ?</p>
                                                        <p>Sebelum submit ujian kami sarankan check kembali jawaban anda </p>			  
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.toggleSubmitUjian}>Tidak</Button>
                                            <Link to="./bukanujian"><Button color="success" onClick={this.toggleSubmitUjian}>Ya</Button></Link>
                                        </ModalFooter>
                                        </Modal>
                              </Col>
              
                      </Row>
                    </CardBody>
                    
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>

    );
  }
}

export default UjianEsai;