import React, { Component, PureComponent } from 'react';
import { Form, Card, CardBody, CardHeader, Col, Row, Table, Button, FormGroup, Input } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';

import DataUjian from '../../models';
import DaftarSkorUjian from '../../models';
import DataPengampu from '../../models';

import { Loading } from '../../layout';
import ChartComponent from 'react-chartjs-2';
import { UjianViewModel } from '../../viewmodels/ujianesai';
import { NilaiViewModel } from '../../viewmodels/laporan';
/*
require('chart.js');
require('chartjs-chart-box-and-violin-plot');


interface GrafikBoxplotProps 
{
  list_skorsoal: any;
}

class GrafikBoxplot extends PureComponent<GrafikBoxplotProps>
{
  chartInstance?: any;
  
  render() 
  {
    const labels = Object.keys(this.props.list_skorsoal)
    
    var i = -1;
    const data_t = labels.map(label => {
      i += 1;
      return this.props.list_skorsoal[label] || [];
    });

    const card_data = {
      labels: labels,
      datasets: [{
        label: 'Resume Capaian Siswa',
        borderWidth: 2,
        borderColor: 'rgba(19,141,117,.55)',
        backgroundColor: 'rgba(115,198,182,.55)',
        data: data_t
      }]
    };

    return (
      <ChartComponent
        type='boxplot'
        data={card_data}
        ref={ref => this.chartInstance = ref && ref.chartInstance}
      />
    );
  }
}
*/
//---------------------------------------------------------------------//

interface DetailHasilUjianStateModel extends Partial<DaftarSkorUjian>
{
  ujian?: DataUjian;
  list_kelas: Array<DataPengampu>;
  tampilan: number;
  idkelas?: string;
}

interface DetailHasilUjianPropsModel { className?: string; }

interface RouteParam { idujian:string; }

class DetailHasilUjian extends PureComponent<DetailHasilUjianPropsModel & RouteComponentProps<RouteParam>, DetailHasilUjianStateModel>
{
  readonly ujian_vm: UjianViewModel;
  readonly nilai_vm: NilaiViewModel;
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
      list_kelas: [],
      tampilan: 1
    };

    this.onKelasChange = this.onKelasChange.bind(this);

    this.ujian_vm = new UjianViewModel();
    this.nilai_vm = new NilaiViewModel();
  }

  onKelasChange(e: any)
  {
    e.preventDefault();
    const idkelas = e.target.value;

    if (idkelas === undefined)
    {
      this.setState({ 
        list_skor: [],
        list_soal: {"":""}
      });
    }
    else
    {      
      this.nilai_vm.initNilaiujian(this.idujian, idkelas).then(data => {
        /**
         * State Berubah -> Render Ulang
         */
        this.setState({ 
          list_skor: data.list_skor,
          list_soal: data.list_soal,
          idkelas: idkelas
        //  list_skorsoal: data.list_skorsoal
        });
      });
    }
  }

  componentDidMount()
  {
    this.ujian_vm.getDataUjian(this.idujian).then(data => {
      this.setState({ ujian: data });
    });

    let lidkelas = {};
    this.ujian_vm.initDataPengampu().then(list => {
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

  render_table()
  {
    return (
      <Table responsive size="sm">    
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan={2}>NIS</th>
          <th className="text-center align-middle" rowSpan={2}>Nama Siswa</th>
          <th className="text-center align-middle" colSpan={Object.keys(this.state.list_soal).length}>
            Skor Setiap Soal
          </th>
          <th className="text-center align-middle" rowSpan={2}>Nilai</th>
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
    )
  }
/*
  render_boxplot()
  {
    if (this.state.list_skorsoal == undefined)
      return;
    
    return (
      <GrafikBoxplot
        list_skorsoal={this.state.list_skorsoal}
      />
    )
  }
*/
  render_body()
  {
    /*
    switch(this.state.tampilan)
    {
      case 0:
        return this.render_boxplot();
      case 1:
      */
        return this.render_table();
    //}
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
                    {/*
                    <Col sm="3">
                      <Input type="select" 
                        onChange={e=>{this.setState({tampilan: parseInt(e.target.value) })}} 
                        defaultValue="1">
                        <option value="0">Resume Capaian Siswa</option>
                        <option value="1">Tabel Nilai Ujian</option>
                      </Input>
                    </Col>
                    */}
            
                    <Col className="col-sm-9 text-right">
                      <Button className="btn-vine btn-brand mr-1 mb-1 "
                        onClick={()=>{
                          if(this.state.idkelas)
                          this.nilai_vm.downloadNilaiujian(this.idujian,this.state.idkelas)
                        }}
                        >
                        <i className="fa fa-download"></i><span>Export as Excel</span>
                      </Button>
                    </Col>
                  </FormGroup>
              
                  {
                    this.render_body()
                  }
                  
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
