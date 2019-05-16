import React, { PureComponent } from 'react';
import { Form, Card, CardBody, CardHeader, Col, Row, Table, Button, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import DataNilai from '../../models/item_model';
import { initDaftarnilaiujian} from '../../models/NilaiData';


interface DetailHasilUjianStateModel {}

interface DetailHasilUjianPropsModel { className?: string; }

class DetailHasilUjian extends Component<DetailHasilUjianPropsModel, DetailHasilUjianStateModel>
{
  constructor(props: Readonly<DetailHasilUjianPropsModel>) 
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

				            <Col md="12">
                      <h5>No Test : TST00001</h5>
                      <h5>Pendidikan Kewarganegaraan</h5>
                      <h5>PKN Bab 1</h5>
                    </Col>

              </CardHeader>
			  
              <CardBody>
                  
              <Form action="" method="post" className="form-horizontal">
				<FormGroup row>
                    
					<Col sm="3">
                       
                        <Input type="select" >
                            <option value="XII-IPA 1">Pilih Kelas...</option>
                            <option value="XII-IPA 1">XII-IPA 1</option>
                            <option value="XII-IPA 2">XII-IPA 2</option>
                            <option value="XII-IPA 3">XII-IPA 3</option>
                            <option value="XII-IPA 4">XII-IPA 4</option>
                            <option value="XII-IPA 5">XII-IPA 5</option>
                            <option value="XII-IPA 6">XII-IPA 6</option>
                            <option value="XII-IPA 7">XII-IPA 7</option>
                            <option value="XII-IPA 8">XII-IPA 8</option>    
                        </Input>
					</Col>
					
                    <Col className="col-sm-9 text-right">
                    <Button className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-download"></i><span>Export as CSV</span></Button>
                    </Col>
				</FormGroup>
             
                <Table responsive size="sm">
                
                <thead>
                  <tr>
                    <th>NIS</th>
                    <th>Nama Siswa</th>
                    <th>Nilai Akhir</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>161511001</td>
                    <td>Adhitya Noor Muslim</td>
                    <td>80</td>
                  </tr>

      				  </tbody>
        </Table>
        
        <Col className="col-sm-12 text-right">
          <Link to="./ujian">
            <Button className="text-right" color="primary" >Kembali</Button>
          </Link>
        </Col>
                                       

              </Form>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default DetailHasilUjian;
