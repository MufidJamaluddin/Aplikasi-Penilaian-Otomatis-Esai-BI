import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';
import DataSiswa from '../../models';
import { PanelSiswaViewModel } from '../../viewmodels/ujianesai';
import { isNullOrUndefined } from 'util';

interface PersiapanUjianAttribute { className: string; }
interface PersiapanUjianState { datasiswa?: DataSiswa; isloading: boolean; }

class PersiapanUjian extends Component<PersiapanUjianAttribute, PersiapanUjianState>
{
  readonly vm: PanelSiswaViewModel;

  constructor(props: PersiapanUjianAttribute)
  {
    super(props);
    this.state = { isloading: true }
    this.vm = new PanelSiswaViewModel();
  }


  public componentDidMount(): void
  {
    this.vm.initPanelSiswa().then(value => {
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
    
    if(isNullOrUndefined(this.state.datasiswa)) return;

    return (

        <Container className="p-5">
          <Row className="align-items-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-5">
								
								<CardHeader className="p-4">
                  <dd className="col-sm-12 text-left"><b>{ this.state.datasiswa.nis }</b></dd>
                  <dd className="col-sm-12 text-left"><b>{ this.state.datasiswa.nama }</b></dd>
                  <dd className="col-sm-12 text-left"><b>{ this.state.datasiswa.kelas.namaKelas }</b></dd>
              	</CardHeader>
                
								<CardBody className="col-sm-12 text-center p-5">
                    <Form>
                      <h1>UJIAN BELUM DIMULAI</h1>
                      <Row>
                        <Col xs="12">
                        <Link to="./gantipassword">
                          <Button color="primary"><i className="icon-key"></i> Ganti Password</Button>
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

    );
  }
}

export default PersiapanUjian;