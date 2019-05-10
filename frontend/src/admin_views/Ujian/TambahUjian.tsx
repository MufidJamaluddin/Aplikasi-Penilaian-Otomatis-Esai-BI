import React, { Component } from 'react';
import { Input, Card, CardBody, CardHeader, Col, Row, Table, Button, Form, FormGroup } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { initDataPengampu, inputDataUjian } from './../../models/UjianData';
import DataPengampu from './../../models/item_model';
import { isNullOrUndefined } from 'util';

/**
 * State TambahUjian
 */
interface TambahUjianState { 
  listpengampu: Array<DataPengampu>; 
  listmapel: Array<DataPengampu>;

  ckelas?: DataPengampu;
  listkelaspilihan: Array<DataPengampu>;
  idujian?: string;
}

/**
 * Atribut TambahUjian
 */
interface TambahUjianAttribute { className?: string; }

/**
 * Tambah Ujian
 */
class TambahUjian extends Component<TambahUjianAttribute, TambahUjianState>
{
  /**
   * Konstruktor
   */
  constructor(props: Readonly<TambahUjianAttribute>) 
  {
    super(props);
    this.state = {
      listpengampu: [],
      listmapel: [],
      listkelaspilihan: []
    }

    this.onKelasChange = this.onKelasChange.bind(this);
    this.onHapusKelas = this.onHapusKelas.bind(this);
    this.onTambahKelas = this.onTambahKelas.bind(this);
    this.onSubmitTambahUjian = this.onSubmitTambahUjian.bind(this);
  }

  /**
   * Ambil Data Pengampu
   */
  public componentDidMount()
  {
    // Matapelajaran Harus Unik
    var lidmapel:any = {};

    initDataPengampu().then(list => {
      var listmapel = list.filter((val, i, arr) => {
        if(lidmapel[val.idmapel] === undefined)
        {
          lidmapel[val.idmapel] = '';
          return true;
        }
      });

      this.setState({
        listpengampu: list,
        listmapel: listmapel,
        ckelas: list[0]
      });
    });
  }

  /**
   * Penambahan Ujian
   */
  public onSubmitTambahUjian(event:any)
  {
    event.preventDefault();

    var fdata = new FormData(event.target);
  
    var data = {
      namaUjian: fdata.get('namaUjian') as string,
      idmapel: fdata.get('idmapel') as string,
      durasi: fdata.get('durasi') as string,
      jumlahSoal: parseInt(fdata.get('jumlahSoal') as string) || 5,
      pelaksanaan_ujian: this.state.listkelaspilihan
    };
  
    console.log(data);
  
    inputDataUjian(data).then(idujian => {  
      this.setState({ idujian: String(idujian) }) 
    });
  }

	/**
	 * Perubahan Kelas pada Select
	 */
	public onKelasChange(event:any)
	{
		event.preventDefault();
		var idkelas = event.target.value;
		var listkelas = this.state.listpengampu;

		var kelas = listkelas.find((el, i, arr) => {
			return el.idkelas == idkelas;
		});

		console.log(kelas);

		if(kelas === undefined)	return;
		
		this.setState({ ckelas: kelas });
	}

	/**
	 * Hapus Kelas
	 */
	public onHapusKelas(idkelas:string)
	{
		var list = this.state.listkelaspilihan.filter((el, i, arr) => {
			return el.idkelas != idkelas;
		});

		this.setState({ listkelaspilihan: list });
  }

  /**
   * Tambah Kelas
   */
  public onTambahKelas(event:any)
  {
    event.preventDefault();

    var found = undefined;
    var listkelaspilihan = this.state.listkelaspilihan;
    var kelas = this.state.ckelas;

    /**
		 * Data yg ditambahkan tidak boleh duplikat
		 */
    if(!isNullOrUndefined(kelas))
    {
      let idkelas = kelas.idkelas || '';

      found = listkelaspilihan.find((el, i, arr) => {
        return el.idkelas === idkelas;
      });
      
      /**
       * Set State dan Render Ulang
       */
      if(isNullOrUndefined(found))
      {
        listkelaspilihan.push(kelas);

        this.setState({ listkelaspilihan: listkelaspilihan });
      }
    }
  }

  /**
   * Render View
   */
  public render() : JSX.Element 
  {
    var listmapel = this.state.listmapel;
    var listkelaspilihan = this.state.listkelaspilihan;
    var listkelas = this.state.listpengampu;
    
    if(!isNullOrUndefined(this.state.idujian))
    {
      return (
        <Redirect to={"/soal/"+ this.state.idujian +"/tambah"} />
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h5 className="text-center">TAMBAH UJIAN</h5>
              </CardHeader>
			  
              <CardBody>
                <Form onSubmit={this.onSubmitTambahUjian} className="form-horizontal">
                  <h6>Keterangan Ujian :</h6>
                  <FormGroup row>
                  <Col sm="3">
                    <Input type="text" name="namaUjian" placeholder="Nama Ujian" required />
                  </Col>
                  <Col sm="3">
                    <Input type="select" name="idmapel">
                      {
                        listmapel.map(mapel => {
                          return (<option value={mapel.idmapel}>{mapel.namaMapel}</option>);
                        })
                      }
                    </Input>
                  </Col>
                  <Col sm="3">
                    <Input type="time" name="durasi" placeholder="Durasi Ujian (Menit)" min="0" required/>
                  </Col>
                  <Col sm="3">
                    <Input type="number" name="jumlahSoal" placeholder="Jumlah Soal" min="1" max="10" required/>
                  </Col>
                </FormGroup>
                      
                <h6>Kelas</h6>
                <FormGroup row>
                  <Col sm="5">
                    <Input type="select" onChange={this.onKelasChange}>
                      {
                        listkelas.map(kelas => {
                          return (<option value={kelas.idkelas}>{kelas.namaKelas}</option>);
                        })
                      }
                    </Input>
                  </Col>
                    
                  <Col sm="1">
                    <Button bsSize="sm" color="success" onClick={this.onTambahKelas}>+Tambah</Button>
                  </Col>
                                
                  <Col sm="12">
                    <Table responsive size="sm">
                      <thead>
                        <tr>
                            <th>List Kelas</th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          listkelaspilihan.map(kelas => {
                            return(
                              <tr key={kelas.idkelas}>
                                <td>{kelas.namaKelas}</td>
                                <td>
                                  <Button onClick={(e:any)=>{ this.onHapusKelas(kelas.idkelas) }} className="btn-youtube btn-brand icon btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </Table>
                  </Col>

                  <Col className="col-sm-12 text-right">
                    <Link to="/ujian">
                      <Button className="text-right" color="danger" >Kembali</Button>
                    </Link>
                    <Button className="text-right" color="success" type="submit">Selanjutnya</Button>
                  </Col>

                </FormGroup>
              </Form>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    );
  }
}

export default TambahUjian;