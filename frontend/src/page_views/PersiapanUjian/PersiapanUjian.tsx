import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';
import DataSiswa from '../../models/item_model';
import { initPanelSiswa } from '../../models/PanelSiswaData';

interface PersiapanUjianAttribute { className: string; }
interface PersiapanUjianState { datasiswa?: DataSiswa; isloading: boolean; }

class PersiapanUjian extends Component<PersiapanUjianAttribute, PersiapanUjianState>
{
  constructor(props: PersiapanUjianAttribute)
  {
    super(props);
    this.state = { isloading: true }
  }


  public componentDidMount(): void
  {
    initPanelSiswa().then(value => {
      this.setState({ datasiswa: value, isloading:false });
    });
  }

	public render()
	{
    if(this.state.isloading)
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
    );
    
    if(this.state.datasiswa === undefined) return;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
								
								<CardHeader>
                  <dd className="col-sm-12 text-left"><b>{ this.state.datasiswa.nis }</b></dd>
                  <dd className="col-sm-12 text-left"><b>{ this.state.datasiswa.nama }</b></dd>
                  <dd className="col-sm-12 text-left"><b>{ this.state.datasiswa.kelas.namaKelas }</b></dd>
              	</CardHeader>
                
								<CardBody className="col-sm-12 text-center">
                    <Form>
                      <h1>UJIAN BELUM DIMULAI</h1>
                      <Row>
                        <Col xs="12">
                        <Link to="./gantipassword">
                          <Button color="primary">Ganti Password</Button>
						            </Link>   
                        </Col>
                      </Row>
										</Form>
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

export default PersiapanUjian;