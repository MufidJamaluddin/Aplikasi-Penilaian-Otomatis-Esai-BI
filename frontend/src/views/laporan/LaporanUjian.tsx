import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Form, Col, Row, Table, Button, Input } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import DaftarNilaiUjian from '../../models/item_model';

import DataPengampu from '../../models/item_model';
import { initDataPengampu} from '../../models/UjianData';

import { initDaftarnilaiujian, downloadDaftarnilaiujian } from '../../models/DaftarNilaiData';
import FormGroup from 'reactstrap/lib/FormGroup';

//-------------------------------//
interface GrafikGarisProps { nama: string; nilai_ujian: any; list_ujian: any, key: string;  }

class GrafikGaris extends React.PureComponent<GrafikGarisProps>
{
  render() 
  {
    const list_nilai = Object.values(this.props.nilai_ujian);
    const list_ujian = Object.keys(this.props.nilai_ujian).map(key => { return this.props.list_ujian[key] });

    const card_data = {
      labels: list_ujian,
      datasets: [
        {
          label: 'Nilai ' + this.props.nama,
          borderColor: 'rgba(255,255,255,.55)',
          data: list_nilai,
        },
      ],
    };

    return (
      <Line 
        data={card_data} 
        width={30}
        options={{ maintainAspectRatio: false }} 
        />
    );
  }
}

//------------------------------//

interface LaporanUjianStateModel extends Partial<DaftarNilaiUjian>
{
  listkelas: Array<DataPengampu>;
  listmapel: Array<DataPengampu>;
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
    // Matapelajaran Harus Unik
    let lidmapel:any = {};
    let lidkelas:any = {};

    initDataPengampu().then(list => {
      let listmapel = list.filter((val, i, arr) => {
        if(lidmapel[val.idmapel] === undefined)
        {
          lidmapel[val.idmapel] = '';
          return true;
        }
      });

      let listkelas = list.filter((val, i, arr) => {
        if(lidkelas[val.idkelas] === undefined)
        {
          lidkelas[val.idkelas] = '';
          return true;
        }
      });

      this.setState({
        listkelas: listkelas,
        listmapel: listmapel
      });
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

  render_export_button()
  {
    if(this.state.idmapel_selected !== undefined && this.state.idkelas_selected !== undefined)
    {
      return(
        <Button 
          className="btn-vine btn-brand mr-1 mb-1" 
          onClick={e=>downloadDaftarnilaiujian(this.state.idmapel_selected, this.state.idkelas_selected)}
          >
          <i className="fa fa-download"></i><span>Export as Excel</span>
        </Button>
      )
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
                  {
                    this.state.listmapel.map(mapel => {
                      return (<p>{ mapel.KKM }</p>)
                    })
                  }
                  
                  <Col className="col-sm-4 text-right">
                    {
                      this.render_export_button()
                    }
                  </Col>
                  
                </FormGroup>
              </Form>
            </CardHeader>

              <CardBody>
             
                <Table responsive size="sm" className="table table-bordered table-hover">
                
                <thead>
                  <tr>
                    <th className="text-center align-middle" rowSpan={2}>NIS</th>
                    <th className="text-center align-middle" rowSpan={2}>Nama Siswa</th>
                    <th className="text-center align-middle" rowSpan={2}>Perkembangan</th>
                    <th className="text-center align-middle" colSpan={Object.keys(this.state.list_ujian).length}>
                        Nilai Ujian
                    </th>
                    <th className="text-center align-middle" rowSpan={2}>Nilai Akhir</th>
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
                          <td className="text-center">{dt_nilai.nis}</td>
                          <td className="text-center">{dt_nilai.nama}</td>
                          <td>
                            <GrafikGaris
                              key={dt_nilai.nis}
                              nama={dt_nilai.nama}
                              nilai_ujian={dt_nilai.nilai}
                              list_ujian={this.state.list_ujian}
                              />
                          </td>
                          {
                            Object.keys(this.state.list_ujian).map(idujian => {
                              return (
                                <td className="text-center" key={idujian}>{ dt_nilai.nilai[idujian] || '' }</td>
                              )
                            })
                          }
                          <td className="text-center">{dt_nilai.nilai_akhir}</td>
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
