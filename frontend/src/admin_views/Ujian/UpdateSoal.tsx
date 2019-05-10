import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader, Badge, Input, Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import SoalTab from './SoalTab';
import { initDataSoal, updateDataSoal } from './../../models/SoalData';
import DataSoal from './../../models/item_model';

interface ModalState { submit:boolean; batal: boolean; }

interface UpdateSoalStateModel 
{ 
  soalTab: number; 
  modal: ModalState;
  listsoal: Array<DataSoal>;
}

interface UpdateSoalPropsModel { className?: string; }

interface RouteParam { idujian:string; }

/**
 * Kelas untuk Update Soal
 */
class UpdateSoal extends Component<UpdateSoalPropsModel & RouteComponentProps<RouteParam>, UpdateSoalStateModel>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian: string;

  /**
   * Konstruktor
   */
  constructor(props:any) 
  {
    super(props);
    this.state = {
      soalTab: 1,
      modal: {
        submit: false,
        batal: false
      },
      listsoal: []
    };
    
    this.idujian = props.match.params.idujian;

    this.toggleSubmitSoal = this.toggleSubmitSoal.bind(this);
    this.toggleBatalUjian = this.toggleBatalUjian.bind(this);
    this.toggleSoal = this.toggleSoal.bind(this);
  }

  componentDidMount()
  {
    initDataSoal(this.idujian).then(list => {
      this.setState({ listsoal: list });
    });
  }
 
 	public toggleSubmitSoal() : void 
 	{
    let modal = this.state.modal;
    modal.submit = !modal.submit;
    this.setState({ modal: modal });
  }
  
 	public toggleBatalUjian() : void
 	{
    let modal = this.state.modal;
    modal.batal = !modal.batal;
    this.setState({ modal: modal });
  }
  
  toggleSoal(tab:any) 
  {
    if (this.state.soalTab !== tab) {
      this.setState({
        soalTab: tab
      });
    }
  }
  public render() : JSX.Element 
  {
    return (
      <div className="animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" lg="12">

            <Card>
              <CardHeader>
                <h4 className="text-center">UPDATE SOAL</h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <TabContent activeTab={this.state.soalTab}>
                      {
                        this.state.listsoal.map((soal, index, array) => {
                          return(
                            <SoalTab 
                              tabId={index}
                              idujian={this.idujian} 
                              idsoal={soal.idsoal}
                              skorMin={soal.skorMin} 
                              skorMax={soal.skorMax}
                              materiPokok={soal.materiPokok} 
                              kompetensiDasar={soal.kompetensiDasar} 
                              soalEsai={soal.soalEsai} 
                              />
                          );
                        })
                      }
                    </TabContent>
                  </Col>

                  <Col className="col-sm-12 text-center">
                  {
                    this.state.listsoal.map((soal, index, array) => {
                      return (
                        <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggleSoal(index)}>
                        {index}
                        </Button>
                      )
                    })
                  }
                  </Col>

                  <Col className="col-sm-12 text-right">
                  
                    <Button  color="primary"  onClick={this.toggleBatalUjian} >Kembali</Button>
                    <Modal isOpen={this.state.modal.batal} toggle={this.toggleBatalUjian} className={'modal-danger ' + this.props.className}>
                      <ModalHeader toggle={this.toggleBatalUjian}>Batal Input Soal</ModalHeader>
                        <ModalBody>
                          <p> Apakah anda yakin ingin membatalkan update soal ? <b>jika tekan "YA", maka semua soal yang anda inputkan sebelumnya tidak akan disimpan</b> dari data guru ?</p>
                        </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={this.toggleBatalUjian}>Tidak</Button>
                        <Link to={ "/ujian/update/" + this.idujian }>
                          <Button color="success" onClick={this.toggleBatalUjian}>Ya</Button>
                        </Link>
                      </ModalFooter>
                    </Modal>
                  
                    <Button  color="success"  onClick={this.toggleSubmitSoal} >Submit Ujian</Button>
                    <Modal isOpen={this.state.modal.submit} toggle={this.toggleSubmitSoal} className={'modal-success ' + this.props.className}>
                      <ModalHeader toggle={this.toggleSubmitSoal}>Submit Ujian</ModalHeader>
                        <ModalBody>
                          <p> Apakah anda yakin ingin submit soal ? <b>Pastikan soal yang anda submit telah diinput dengan benar</b></p>
                        </ModalBody>
                      <ModalFooter>
                          <Button color="danger" onClick={this.toggleSubmitSoal}>Tidak</Button>
                          <Link to="/ujian">
                            <Button color="success" onClick={this.toggleSubmitSoal}>Ya</Button>
                          </Link>
                      </ModalFooter>
                    </Modal>
                  </Col>
      	
                </Row>
              </CardBody>
            </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UpdateSoal;