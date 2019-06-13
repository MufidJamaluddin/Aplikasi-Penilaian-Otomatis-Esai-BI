import React, { Component } from 'react';
import { Table, Button, ButtonGroup,  Card, CardBody, CardHeader, Col, Input,Row, TabContent, TabPane } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import DataJawabanSoal from '../../models/item_model';
import { initDataJawaban } from '../../models/PenilaianData';

interface NilaiManualStateModel {
  activeTab:number;
  listjawaban: Array<any>;
}

interface RouteParam { idujian:string; idkelas:string; }

interface NilaiManualModel { className?: string; }

class NilaiManual extends Component<NilaiManualModel & RouteComponentProps<RouteParam>, NilaiManualStateModel>
{
  private idujian: string;
  private idkelas: string;

  constructor(props: any) 
  {
    super(props);

    this.idujian = props.match.params.idujian;
    this.idkelas = props.match.params.idkelas;

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      listjawaban: []
    };
  }

  componentDidMount()
  {
    initDataJawaban(this.idujian, this.idkelas).then(list_data => {
      this.setState({ listjawaban: list_data });
    });
  }

  toggle(tabManual) {
    if (this.state.activeTab !== tabManual) {
      this.setState({
        activeTab: tabManual
      });
    }
  }


  public render() : JSX.Element 
  {
    
    return (
      <div className="animated fadeIn">
               <Row>
          <Col>
            <Card>
              <CardHeader>

              <Table responsive size="sm">
                        
                        <tbody>
                          <tr>
                            <td><b>Kelas</b></td>
                            <td>XII-IPA 1</td>
                          </tr>

                          <tr>
                            <td><b>Mata Pelajaran</b></td>
                            <td>Biologi</td>
                          </tr>

                          <tr>
                            <td><b>Nama Ujian</b></td>
                            <td>UH 1 Pertumbuhan Tumbuhan</td>
                          </tr>
                        </tbody>
                      </Table>

              </CardHeader>
              <CardBody>
                <Row>
                  
                  <Col className="col-sm-12 text-center">
                    <ButtonGroup className="text-center" >
                      <Button outline color="primary" onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >Soal 1 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >Soal 2 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >Soal 3 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >Soal 4 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Soal 5 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Soal 6 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Soal 7 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Soal 8 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Soal 9 </Button>
                      <Button outline color="primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >Soal 10 </Button>
                    </ButtonGroup>
                  </Col>
                  
                  <Col xs="12">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0} >
                        <Table responsive size="sm">
                        
                          <tbody>
                            <tr>
                              <td><b>Soal</b></td>
                              <td>Jelaskan 3 faktor eksternal yang mempengaruhi pertumbuhan ?</td>
                            </tr>

                            <tr>
                              <td><b>Materi</b></td>
                              <td>Pertumbuhan Tumbuhan</td>
                            </tr>

                            <tr>
                              <td><b>Kompetensi Dasar</b></td>
                              <td>Siswa dapat menjelaskan  3 faktor eksternal yang mempengaruhi pertumbuhan</td>
                            </tr>

                            <tr>
                              <td><b>Skor Minimal</b></td>
                              <td>5</td>
                            </tr>

                            <tr>
                              <td><b>Skor Maksimal</b></td>
                              <td>20</td>
                            </tr>

                          </tbody>

                        </Table>                      
                        
                        <Table responsive size="sm">
                            <thead>
                              <tr>
                                <th>NIS</th>
                                <th>Jawaban Esai</th>
                                <th>Skor</th>
                                <th> </th>
                                <th> </th>
                                <th> </th>
                              </tr>
                            </thead>
                            
                            <tbody>
                              <tr>
                                <td>161511017</td>
                                <td> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                                <td colSpan= {4} ><Input type="number" className="sm-7" min="0" max="100"/></td>
                             </tr>

                             <tr>
                                <td>161511017</td>
                                <td> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                                <td colSpan= {4} ><Input type="number" className="sm-7" min="0" max="100"/></td>
                             </tr>

                             <tr>
                                <td>161511017</td>
                                <td> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                                <td colSpan= {4} ><Input type="number" className="sm-7" min="0" max="100"/></td>
                             </tr>
                            </tbody>
                        </Table>
                      </TabPane>

                      <TabPane tabId={1} >                      
                        <Table responsive size="sm">
                            <thead>
                              <tr>
                                <th>NIS</th>
                                <th>Jawaban Esai</th>
                                <th>Skor</th>
                              </tr>
                            </thead>
                            
                            <tbody>
                              <tr >
                                <td>161511018</td>
                                <td> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                                <td><Input type="number" min="0" max="100" placeholder="Input Skor"/></td>
                            </tr>
                            </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId={2} >                      
                        <Table responsive size="sm">
                            <thead>
                              <tr>
                                <th>NIS</th>
                                <th>Jawaban Esai</th>
                                <th>Skor</th>
                              </tr>
                            </thead>
                            
                            <tbody>
                              <tr >
                                <td>161511019</td>
                                <td> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                                <td><Input type="number" min="0" max="100" placeholder="Input Skor"/></td>
                            </tr>
                            </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId={3} >                      
                        <Table responsive size="sm">
                            <thead>
                              <tr>
                                <th>NIS</th>
                                <th>Jawaban Esai</th>
                                <th>Skor</th>
                              </tr>
                            </thead>
                            
                            <tbody>
                              <tr >
                                <td>161511020</td>
                                <td> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                                <td><Input type="number" min="0" max="100" placeholder="Input Skor"/></td>
                            </tr>
                            </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
                  
                  <Col className="col-sm-12 text-right">
                    <ButtonGroup className="text-right" >
                      <Button color="primary">Kembali</Button>
                      <Button color="success">Akhiri Penilaian Manual</Button>
                    </ButtonGroup>
                  </Col>
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NilaiManual;
