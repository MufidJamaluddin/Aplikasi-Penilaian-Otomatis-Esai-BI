import React, { Component } from 'react';
import { Form, Card, CardBody, CardHeader, Col, Row, Table, Button, FormGroup, Input } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';

import DataUjian from '../../models/item_model';
import { getDataUjian } from '../../models/UjianData';

import { initNilaiujian } from './../../models/NilaiData';
import DaftarSkorUjian from './../../models/item_model';

import DataPengampu from '../../models/item_model';
import { initDataPengampu } from '../../models/UjianData';

import { Loading } from '../../layout';


interface DetailHasilUjianStateModel extends Partial<DaftarSkorUjian>
{
  
  ujian?: DataUjian;
  list_kelas: Array<DataPengampu>;
}

interface DetailHasilUjianPropsModel { className?: string; }

interface RouteParam { idujian:string; }

class DetailHasilUjian extends Component<DetailHasilUjianPropsModel & RouteComponentProps<RouteParam>, DetailHasilUjianStateModel>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian: string;

  constructor(props: any) 
  {
    super(props);
    this.idujian = props.match.params.idujian;

    this.state = {
      list_skor: [],
      list_soal: {"":""},
      list_kelas: []
    };

    this.onKelasChange = this.onKelasChange.bind(this);
  }

  onKelasChange(e: any)
  {
    e.preventDefault();
    
    if (e.target.value === undefined)
    {
      this.setState({ 
        list_skor: [],
        list_soal: {"":""}
      });
    }
    else
    {      
      initNilaiujian(this.idujian, e.target.value).then(data => {
        /**
         * State Berubah -> Render Ulang
         */
        this.setState({ 
          list_skor: data.list_skor,
          list_soal: data.list_soal
        });
      });
    }
  }

  componentDidMount()
  {
    getDataUjian(this.idujian).then(data => {
      this.setState({ ujian: data });
    });

    let lidkelas = {};
    initDataPengampu().then(list => {
      let list_kelas = list.filter((val, i, arr) => {
        if(lidkelas[val.idkelas] === undefined)
        {
          lidkelas[val.idkelas] = '';
          return true;
        }
      });

      this.setState({
        list_kelas: list_kelas,
      });
    });

  }

  public render() : JSX.Element 
  {
    if (this.state.ujian === undefined) return(Loading);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Col md="12">
                  <h5>ID Ujian&emsp;&emsp;&emsp;&emsp;: {this.idujian}</h5>
                  <h5>Matapelajaran&emsp;: {this.state.ujian.namaMapel}</h5>
                  <h5>Nama Ujian &emsp;&emsp;: {this.state.ujian.namaUjian}</h5>
                  <h5>KKM &emsp;&emsp;: {this.state.ujian.KKM}</h5>
                </Col>
              </CardHeader>
              <CardBody>
                  
                <Form className="form-horizontal">
                  <FormGroup row>
                    <Col sm="3">
                      <Input type="select" onChange={this.onKelasChange}>
                        <option value={undefined}>Pilih Kelas ...</option>
                        {
                          this.state.list_kelas.map(kelas => {
                            return (
                              <option key={kelas.idkelas} value={kelas.idkelas}>{kelas.namaKelas}</option>
                            )
                          })
                        }
                      </Input>
                    </Col>
            
                    <Col className="col-sm-9 text-right">
                      <Button className="btn-vine btn-brand mr-1 mb-1 ">
                        <i className="fa fa-download"></i><span>Export as CSV</span>
                      </Button>
                    </Col>
                  </FormGroup>
              
                  <Table responsive size="sm">    
                    <thead>
                      <tr>
                        <th className="text-center align-middle" rowSpan={2}>NIS</th>
                        <th className="text-center align-middle" rowSpan={2}>Nama Siswa</th>
                        <th className="text-center align-middle" colSpan={Object.keys(this.state.list_soal).length}>
                          Nilai Ujian
                        </th>
                        <th className="text-center align-middle" rowSpan={2}>Nilai Ujian</th>
                        <th className="text-center align-middle" rowSpan={2}>Keterangan</th>
                      </tr>
                      <tr>
                        {
                          Object.keys(this.state.list_soal).map(id_soal => {
                            return (
                              <th className="table-active text-center" key={id_soal}>
                                {this.state.list_soal[id_soal]}
                              </th>
                            );
                          })
                        }
                      </tr>
                    </thead>

                    <tbody>
                    {
                      this.state.list_skor.map(dskor => {
                        return (
                          <tr key={dskor.nis}>
                            <td className="text-center align-middle">{dskor.nis}</td>
                            <td>{dskor.nama}</td>
                            {
                              Object.keys(this.state.list_soal).map(id_soal => {
                                return (
                                  <td className="text-center align-middle">{dskor.skor[id_soal]}</td>
                                )
                              })
                            }
                            <td className="text-center align-middle">{dskor.nilai}</td>
                            <td className="text-center align-middle">{dskor.keterangan}</td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </Table>
                  
                  <Col className="col-sm-12 text-right">
                    <Link to="/ujian">
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
