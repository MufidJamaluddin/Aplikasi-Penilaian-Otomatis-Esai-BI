import React, { Component } from 'react';
import { Form, Card, CardBody, CardHeader, Col, Row, Table, Button, FormGroup, Input } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { initDaftarnilaiujian } from './../../models/NilaiData';
import { Loading } from '../../layout';
import DataNilai from './../../models/item_model';
import DataUjian from './../../models/item_model';

interface DetailHasilUjianStateModel 
{
  list_nilai: Array<DataNilai>;
  list_filter_nilai: Array<DataNilai>;
  list_kelas: Array<string>;
  ujian?: DataUjian;
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
      list_nilai: [], 
      list_filter_nilai: [], 
      list_kelas: []
    };

    this.onKelasChange = this.onKelasChange.bind(this);
  }

  componentDidMount()
  {
    initDaftarnilaiujian(this.idujian).then(data => {
      /**
       * State Berubah -> Render Ulang
       */
      let list_fnilai = data.list_nilai.filter(nilai => {
        return nilai.namaKelas === (data.list_kelas[0]||'')
      })

      this.setState({ 
        list_nilai: data.list_nilai, 
        list_kelas: data.list_kelas,
        ujian: data.ujian,
        list_filter_nilai: list_fnilai
      });
    })
  }

  onKelasChange(e:any)
  {
    e.preventDefault()

    let kelas_baru = e.target.value;

    let list_nilai_baru = this.state.list_nilai.filter(nilai => {
      return nilai.namaKelas === kelas_baru
    })

    this.setState({ list_filter_nilai: list_nilai_baru });

  }

  public render() : JSX.Element 
  {
    let ujian = this.state.ujian;

    if(ujian === undefined) return (Loading)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>

				            <Col md="12">
                      <h5>ID Ujian&emsp;&emsp;&emsp;&emsp;: {ujian.idujian}</h5>
                      <h5>Matapelajaran&emsp;: {ujian.namaMapel}</h5>
                      <h5>Nama Ujian &emsp;&emsp;: {ujian.namaUjian}</h5>
                    </Col>

              </CardHeader>
			  
              <CardBody>
                  
              <Form className="form-horizontal">
				<FormGroup row>
                    
					<Col sm="3">
                       
            <Input type="select" onChange={this.onKelasChange}>
              {
                this.state.list_kelas.map(kelas => {
                  return (
                    <option key={kelas} value={kelas}>{kelas}</option>
                  )
                })
              }
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
              <th>Nilai Ujian</th>
            </tr>
          </thead>

          <tbody>
          {
            this.state.list_filter_nilai.map(nilai => {
              return (
                <tr key={nilai.nis}>
                  <td>{nilai.nis}</td>
                  <td>{nilai.nama}</td>
                  <td>{nilai.nilai}</td>
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
