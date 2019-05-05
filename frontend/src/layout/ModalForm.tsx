import React, { PureComponent } from 'react';
import { Modal, Form, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

/**
 * Modal Form
 */
interface ModalFormAttribute 
{
    className: string;
    header: string;
    strsubmit: string;
    isOpen: boolean;
    toggle: VoidFunction;
    onClickSubmit: any;
}

class ModalForm extends PureComponent<ModalFormAttribute>
{
    public render()
    {
        return(
            <Modal 
                isOpen={ this.props.isOpen } 
                toggle={ this.props.toggle } 
                className={ this.props.className }> 
                <Form onSubmit= {this.props.onClickSubmit } className="form-horizontal">    
                    <ModalHeader toggle={ this.props.toggle }>{ this.props.header }</ModalHeader>
                    <ModalBody>{ this.props.children }</ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={ this.props.toggle }>Batal</Button>
                        <Button color="success" type="submit">{this.props.strsubmit}</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default ModalForm;