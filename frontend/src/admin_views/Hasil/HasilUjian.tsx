import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, InputGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
interface HasilUjianStateModel {}

interface HasilUjianPropsModel { className?: string; }

class HasilUjian extends Component<HasilUjianPropsModel, HasilUjianStateModel>
{
  constructor(props: Readonly<HasilUjianPropsModel>) 
  {
    super(props);

  }

  public render() : JSX.Element 
  {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>

				 <Col md="4">
                      <InputGroup>
                        <Input type="text" id="search" name="search" placeholder="Cari Hasil Ujian..." />
						<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						 </InputGroup>
                    </Col>

              </CardHeader>
			  
              <CardBody>
             
                <Table responsive size="sm">
                
                <thead>
                  <tr>
                    <th>No. Ujian</th>
                    <th>Nama Ujian</th>
                    <th>Mata Pelajaran</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>TST00001</td>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>PKN Bab 1</td>
                    <td></td>
                    <td>
                        <Link to="./detailhasilujian">
                            <Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
                        </Link>
                    </td>
                 </tr>

                 <tr>
                    <td>TST00002</td>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>PKN Bab 2</td>
                    <td></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

                 <tr>
                    <td>TST00003</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 1</td>
                    <td></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

                 
                 <tr>
                    <td>TST00004</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 2</td>
                    <td></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

                 
                 <tr>
                    <td>TST00005</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 3</td>
                    <td></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

                 <tr>
                    <td>TST00006</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 4</td>
                    <td></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

				  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default HasilUjian;
