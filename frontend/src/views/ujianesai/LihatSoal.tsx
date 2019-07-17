import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CardGroup, Button, Card, CardBody, CardHeader, Col, Row, TabContent, Container } from 'reactstrap';
import SoalTab from './SoalTab';
import DataSoal from '../../models';
import { SoalViewModel } from '../../viewmodels/ujianesai';

interface LihatSoalState { soalTab: number; listsoal: Array<DataSoal>; }

interface LihatSoalAttribute { className: string; }

interface RouteParam { idujian:string; }

/**
 * Kelas untuk melihat soal
 */
class LihatSoal extends Component<LihatSoalAttribute & RouteComponentProps<RouteParam>, LihatSoalState>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian: string;

  readonly vm: SoalViewModel;

  /**
   * Konstruktor
   */
	constructor(props:any) 
	{
		super(props);
    
    this.idujian = props.match.params.idujian;

    this.state = { listsoal: [], soalTab: 0 };
    this.toggleSoal = this.toggleSoal.bind(this);

    this.vm = new SoalViewModel();
  }

  componentDidMount()
  {
    this.vm.initDataSoal(this.idujian).then(list => {
      this.setState({ listsoal: list });
    });
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
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
                  <CardHeader>
                    <h5 className="text-center">LIHAT SOAL</h5>
                  </CardHeader>
                        
                  <CardBody>
                    <Row>
                      <Col xs="12">
                        <TabContent activeTab={String(this.state.soalTab)}>
                          {
                            this.state.listsoal.map((soal, index, array) => {
                              return(
                                <SoalTab 
                                  tabId={index}
                                  viewonly={true}
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
                        <Button  color="primary">Kembali</Button>
                      </Col>
            
                    </Row>
                  </CardBody>
                    
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LihatSoal;