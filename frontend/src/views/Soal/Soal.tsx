import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface SoalStateModel { success:boolean; modal: boolean; }

interface SoalPropsModel { className: string; }

class Soal extends Component<SoalPropsModel, SoalStateModel>
{
	constructor(props:any) 
	{
		super(props);
		
    this.state = {
			success: false,
			modal: false 
    };

    this.toggle = this.toggle.bind(this);
    this.toggleSubmitUjian = this.toggleSubmitUjian.bind(this);
  }


	public toggle() : void
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
  
	public toggleSubmitUjian() : void 
	{
    this.setState({
      success: !this.state.success,
    });
  }

	public render() : JSX.Element
	{
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                      <dd className="col-sm-12 text-left">Anatomy Tumbuhan - Biologi</dd>
					  <dd className="col-sm-12 text-left">Waktu : <b>90:00</b></dd>
					  <dd className="col-sm-12 text-left">Soal : <b>18/32</b></dd>
              </CardHeader>
				
              <CardBody>
				<Form action="" method="" className="form-horizontal">
					
					  <FormGroup row>
						<Col sm="8">
							<h5 className="text-center">SOAL <b>18</b></h5>
							<p>Pada waktu kita sentuh daun tumbuhan sikejut (Mimosa pudica), seluruh daunnya akan menutup, karena adanya ?</p>
							<p><Input  type="textarea"  placeholder="Input Jawaban" /></p>
					
								<Button className="text-right" color="primary">Simpan Jawaban</Button>
								<Button className="text-right" color="success" onClick={this.toggleSubmitUjian}>Submit Ujian</Button>
								<Modal isOpen={this.state.success} toggle={this.toggleSubmitUjian} className={'modal-success ' + this.props.className}>
								  <ModalHeader toggle={this.toggleSubmitUjian}>Submit Ujian</ModalHeader>
								  <ModalBody>
								
												<p>Apakah anda yakin ingin menyelesaikan ujian ini ?</p>
												<p>Sebelum submit ujian kami sarankan check kembali jawaban anda </p>
											
									
										  
								  </ModalBody>
								  <ModalFooter>
									<Button color="danger" onClick={this.toggleSubmitUjian}>Tidak</Button>
									<Button color="success" onClick={this.toggleSubmitUjian}>Ya</Button>
								  </ModalFooter>
								</Modal>
						</Col>
						<Col sm="4">
						
							<p>
								<Button size='md' color="success">01</Button>
								<Button size='md' color="success">02</Button>
								<Button size='md' color="success">03</Button>
								<Button size='md' color="success">04</Button>
								<Button size='md' color="success">05</Button>
								<Button size='md' color="success">06</Button>
								<Button size='md' color="success">07</Button>
								<Button size='md' color="success">08</Button>
							</p>
							
							<p>
								<Button size='md' color="success">09</Button>
								<Button size='md' color="success">10</Button>
								<Button size='md' color="success">11</Button>
								<Button size='md' color="success">12</Button>
								<Button size='md' color="success">13</Button>
								<Button size='md' color="success">14</Button>
								<Button size='md' color="success">15</Button>
								<Button size='md' color="success">16</Button>
							</p>
							
							<p>
								<Button size='md' color="success">17</Button>
								<Button size='md' color="success">18</Button>
								<Button size='md' color="danger">19</Button>
								<Button size='md' color="danger">20</Button>
								<Button size='md' color="danger">21</Button>
								<Button size='md' color="danger">22</Button>
								<Button size='md' color="danger">23</Button>
								<Button size='md' color="danger">24</Button>
							</p>
							<p>
								<Button size='md' color="danger">25</Button>
								<Button size='md' color="danger">26</Button>
								<Button size='md' color="danger">27</Button>
								<Button size='md' color="danger">28</Button>
								<Button size='md' color="danger">29</Button>
								<Button size='md' color="danger">30</Button>
								<Button size='md' color="danger">31</Button>
								<Button size='md' color="danger">32</Button>
							</p>
						
							
							<p><h3 className="text-left" ><i className="cui-chevron-left"></i><i className="cui-chevron-right"></i></h3></p>
				
                
							
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

export default Soal;