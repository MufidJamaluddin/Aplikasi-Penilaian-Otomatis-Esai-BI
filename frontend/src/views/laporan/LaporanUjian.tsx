import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Form, Col, Row, Table, Button, Input} from 'reactstrap';
import DaftarNilaiUjian from '../../models/item_model';
import DataKelas from '../../models/item_model';
import DataMatapelajaran from '../../models/item_model';
import { initDatakelas } from '../../models/KelasData';
import { initDatamatapelajaran } from '../../models/MatapelajaranData';
import { initDaftarnilaiujian } from '../../models/DaftarNilaiData';
import FormGroup from 'reactstrap/lib/FormGroup';

interface LaporanUjianStateModel extends Partial<DaftarNilaiUjian>
{
  listkelas: Array<DataKelas>;
  listmapel: Array<DataMatapelajaran>;
  isLoading: boolean;
  idmapel_selected?: string;
  idkelas_selected?: string;
}

interface LaporanUjianModel { className?: string; }

class LaporanUjian extends Component<LaporanUjianModel, LaporanUjianStateModel>
{
  constructor(props: any) 
  {
    super(props);
    
    this.state = {
      listkelas: [],
      listmapel: [],
      isLoading: true,
      list_nilai: [],
      list_ujian: {"": ""}
    };
  }
    // --------------------------- INIT DATA ------------------------------------------//
  componentDidMount()
  {
    initDatakelas().then(list_kelas => {
      this.setState({ listkelas: list_kelas });
    });

    initDatamatapelajaran().then(list_mapel => {
      this.setState({ listmapel: list_mapel });
    });
  }

  componentWillUpdate(nextProps: any, nextState: any)
  {
    if ( 
      nextState.idmapel_selected !== undefined 
      && nextState.idkelas_selected !== undefined
      && (
        nextState.idmapel_selected !== this.state.idmapel_selected || 
        nextState.idkelas_selected !== this.state.idkelas_selected
      )
    )
    {
      initDaftarnilaiujian(nextState.idmapel_selected, nextState.idkelas_selected).then(data => {
        this.setState({ 
          list_nilai: data.list_nilai,
          list_ujian: data.list_ujian
        });
      });  
    }
  }

  render()
  {
    
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <Form className="form-horizontal">
				        <FormGroup row>
                  <Col className="col-sm-4">
                    <Input type="select" onChange={e=>{ this.setState({ idmapel_selected: e.target.value }) }}>
                      <option value={undefined}>Pilih Matapelajaran ...</option>
                      {
                        this.state.listmapel.map(mapel => {
                          return (<option value={mapel.idmapel} key={mapel.idmapel}>{ mapel.namaMapel }</option>)
                        })
                      }
                    </Input>
                  </Col>

                  <Col className="col-sm-4">
                    <Input type="select" onChange={e=>{ this.setState({ idkelas_selected: e.target.value }) }}>
                      <option value={undefined}>Pilih Kelas ...</option>
                      {
                        this.state.listkelas.map(kelas => {
                          return (<option value={kelas.idkelas} key={kelas.idkelas}>{ kelas.namaKelas }</option>)
                        })
                      }
                    </Input>
                  </Col>

                  <Col className="col-sm-4 text-right">
                    <Button className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-download"></i><span>Export as CSV</span></Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardHeader>

              <CardBody>
             
                <Table responsive size="sm" className="table table-bordered table-hover">
                
                <thead>
                  <tr>
                    <th className="text-center" rowSpan={2}>NIS</th>
                    <th className="text-center" rowSpan={2}>Nama siswa</th>
                    <th className="text-center" colSpan={Object.keys(this.state.list_ujian).length}>Nama Ujian</th>
                  </tr>
                
                  <tr>
                    {
                      Object.values(this.state.list_ujian).map((nama_ujian, i) => {
                        return (<th className="text-center" key={i}>{nama_ujian}</th>);
                      })
                    }
                  </tr>
                </thead>
                
                <tbody>
                  {
                    this.state.list_nilai.map(dt_nilai => {
                      return (
                        <tr key={dt_nilai.nis}>
                          <td>{dt_nilai.nis}</td>
                          <td>{dt_nilai.nama}</td>
                          {
                            Object.keys(this.state.list_ujian).map(idujian => {
                              return (
                                <td className="text-center" key={idujian}>{ dt_nilai.nilai[idujian] || '' }</td>
                              )
                            })
                          }
                        </tr>
                      )
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

export default LaporanUjian;
