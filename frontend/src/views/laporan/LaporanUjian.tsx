import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Form, Col, Row, Table, Button, Input, InputGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DataUjian from '../../models/item_model';
import { initDataUjian } from '../../models/UjianData';
import FormGroup from 'reactstrap/lib/FormGroup';

interface LaporanUjianStateModel {
  state:boolean; 
  listujian: Array<DataUjian>;
  selected_data?: Partial<DataUjian>;
  isLoading:boolean;
 }


interface LaporanUjianModel { className?: string; }

class LaporanUjian extends Component<LaporanUjianModel, LaporanUjianStateModel>
{
  constructor(props: Readonly<LaporanUjianModel>) 
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
  

  public render() : JSX.Element 
  {
    var listujian = this.state.listujian;
    
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <Form className="form-horizontal">
				        <FormGroup row>
                  <Col className="col-sm-4">
                    <Input type="select">
                      <option>Pilih Mata Pelajaran...</option>
                      <option>BIologi</option>
                      <option>PKN</option>
                    </Input>
                  </Col>

                  <Col className="col-sm-4">
                    <Input type="select">
                      <option>Pilih Kelas...</option>
                      <option>XII-IPA-1</option>
                      <option>XII-IPA-2</option>
                    </Input>
                  </Col>

                  <Col className="col-sm-4 text-right">
                    <Button className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-download"></i><span>Export as CSV</span></Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardHeader>

              <CardBody>
             
                <Table responsive size="lg" className="table table-bordered table-hover">
                
                  <tr>
                    <th className="text-center" rowSpan={2}>NIS</th>
                    <th className="text-center" rowSpan={2}>Nama siswa</th>
                    <th className="text-center" colSpan={10}>Nama Ujian</th>
                  </tr>
                
                  <tr>
                    <th className="text-center">UH 1 Biologi</th>
                    <th className="text-center">UH 2 Biologi</th>
                    <th className="text-center">UH 3 Biologi</th>
                    <th className="text-center">UH 4 Biologi</th>
                    <th className="text-center">UH 5 Biologi</th>
                  </tr>

                <tbody>
                  <tr>
                    <td>161511017</td>
                    <td>Lucky Ramdani</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                    <td className="text-center">90</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                  </tr>

                  <tr>
                    <td>161511017</td>
                    <td>Lucky Ramdani</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                    <td className="text-center">90</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                  </tr>

                  <tr>
                    <td>161511017</td>
                    <td>Lucky Ramdani</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                    <td className="text-center">90</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                  </tr>

                  <tr>
                    <td>161511017</td>
                    <td>Lucky Ramdani</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                    <td className="text-center">90</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                  </tr>

                  <tr>
                    <td>161511017</td>
                    <td>Lucky Ramdani</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
                    <td className="text-center">90</td>
                    <td className="text-center">70</td>
                    <td className="text-center">80</td>
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

export default LaporanUjian;
