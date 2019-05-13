import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, InputGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DataUjian from '../../models/item_model';
import { initDataUjian } from '../../models/UjianData';

interface PenilaianStateModel { 
  state:boolean; 
  listujian: Array<DataUjian>;
  selected_data?: Partial<DataUjian>;
  isLoading:boolean;
 }

interface PenilaianModel { className?: string; }



class Penilaian extends Component<PenilaianModel, PenilaianStateModel>
{
  constructor(props: Readonly<PenilaianModel>) 
  {
    super(props);

    this.state = {
      state: false,
      listujian: [],
      isLoading: true,
    };


  }

  // --------------------------- INIT DATA ------------------------------------------//
  public componentDidMount()
  {
    initDataUjian().then(list => {
      this.setState({ listujian: list });
    });
  }


   //----------------------------- RENDER --------------------------------------------//

  public render() : JSX.Element 
  {
    var listujian = this.state.listujian;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
                <CardHeader>
	        			 <Col md="4">
                    <InputGroup>
                        <Input type="text" id="search" name="search" placeholder="Cari Ujian..." />
						            <Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						        </InputGroup>
                  </Col>
                </CardHeader>
			  
              <CardBody>
                <Table responsive size="sm">
                
                <thead>
                  <tr>
                    <th>No. Ujian</th>
                    <th>Nama Ujian </th>
                    <th>Mata Pelajaran</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                
                <tbody>
                {
                  listujian.map(ujian => {
                    return (
                  <tr  key={ujian.idujian}>
                    <td>{ ujian.idujian }</td>
                    <td>{ ujian.namaMapel }</td>
                    <td>{ ujian.namaUjian }</td>
                    <td><Link to="./NilaiUjian"><Button className="btn-twitter btn-brand icon btn-sm">Nilai Ujian</Button></Link></td>

                 </tr>

                    );
                  })
                }

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

export default Penilaian;
