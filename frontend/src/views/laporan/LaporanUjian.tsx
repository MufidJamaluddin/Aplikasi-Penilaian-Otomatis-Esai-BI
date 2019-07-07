import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Form, Col, Collapse,  Row, Table, Button, Input } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import DaftarNilaiUjian from '../../models/item_model';

import DataPengampu from '../../models/item_model';
import { initDataPengampu} from '../../models/UjianData';

import { initDaftarnilaiujian, downloadDaftarnilaiujian } from '../../models/DaftarNilaiData';
import FormGroup from 'reactstrap/lib/FormGroup';
import CardFooter from 'reactstrap/lib/CardFooter';

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
          borderColor: 'rgba(19,141,117,.55)',
          backgroundColor: 'rgba(115,198,182,.55)',
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
  tampilan: string;
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
      list_ujian: {"": ""},
      tampilan: '0'
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

  render_table()
  {
    return (
      <Table responsive size="sm" className="table table-hover">
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan={2}>NIS</th>
          <th className="text-center align-middle" rowSpan={2}>Nama Siswa</th>
          <th className="text-center align-middle" colSpan={Object.keys(this.state.list_ujian).length}>
              Nilai Ujian
          </th>
          <th className="text-center align-middle" rowSpan={2}>Nilai Akhir</th>
        </tr>
        <tr>
          {
            Object.values(this.state.list_ujian).map((nama_ujian, i) => {
              return (<th className="table-active text-center" key={i}>{nama_ujian}</th>);
            })
          }
        </tr>
      </thead>
      <tbody >
        { 
          this.state.list_nilai.map(dt_nilai => {
            return (
              <tr key={dt_nilai.nis}>
                <td className="text-center">{dt_nilai.nis}</td>
                <td>&nbsp;{dt_nilai.nama}</td>
                {
                  Object.keys(this.state.list_ujian).map(idujian => {
                    return (
                      <td className="text-center" key={idujian}>
                        { dt_nilai.nilai[idujian] || '' }
                      </td>
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
    );
  }

  render_grafik()
  {
    return (
      <div>
        { 
          this.state.list_nilai.map(dt_nilai => {
            return (
              <Card key={dt_nilai.nis}>
                <CardHeader>{dt_nilai.nama}</CardHeader>
                <CardBody>
                  <GrafikGaris 
                    key={dt_nilai.nis}
                    nama={dt_nilai.nama}
                    nilai_ujian={dt_nilai.nilai}
                    list_ujian={this.state.list_ujian}
                    />
                </CardBody>
                <CardFooter>
                  Nilai Akhir : {dt_nilai.nilai_akhir}
                </CardFooter>
              </Card>
            )
          })
        }
      </div>
    )
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
                  <Col className="col-sm-3">
                    <Input type="select" onChange={e=>{ this.setState({ idmapel_selected: e.target.value }) }}>
                      <option value={undefined}>Pilih Matapelajaran ...</option>
                      {
                        this.state.listmapel.map(mapel => {
                          return (<option value={mapel.idmapel} key={mapel.idmapel}>{ mapel.namaMapel }</option>)
                        })
                      }
                    </Input>
                  </Col>

                  <Col className="col-sm-3">
                    <Input type="select" onChange={e=>{ this.setState({ idkelas_selected: e.target.value }) }}>
                      <option value={undefined}>Pilih Kelas ...</option>
                      {
                        this.state.listkelas.map(kelas => {
                          return (<option value={kelas.idkelas} key={kelas.idkelas}>{ kelas.namaKelas }</option>)
                        })
                      }
                    </Input>
                  </Col>
                  <Col className="col-sm-3">
                      <Input type="select" onChange={e=>{this.setState({tampilan: e.target.value})}} defaultValue="0">
                        <option>Tabel Nilai Ujian</option>
                        <option>Grafik Nilai Ujian</option>
                      </Input>
                  </Col>
                  
                  <Col className="col-sm-3 text-right">
                    {
                      this.render_export_button()
                    }
                  </Col>
                  
                </FormGroup>
              </Form>
            </CardHeader>

              <CardBody>
                {
                  this.state.tampilan == '0' ?
                    this.render_table() : this.render_grafik()
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LaporanUjian;
