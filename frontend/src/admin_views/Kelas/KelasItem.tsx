import React, { PureComponent } from 'react';
import Button from 'reactstrap/lib/Button';
import Kelas from './KelasView';

interface KelasItemModel 
{ 
    idkelas: string; 
    namaKelas: string;
    parent: Kelas;
}

/*
interface KelasItemState
{
    status: string; // View, Edit, Delete
}
*/
class KelasItem extends PureComponent<KelasItemModel>
{
    public render(): JSX.Element
    {
        //if(this.state.status === 'Edit')

        var idkelas = this.props.idkelas;
        var namaKelas = this.props.namaKelas;

        return (
            <tr>
                <td>{ this.props.namaKelas }</td>
                <td>
                    <Button 
                        className="btn-stack-overflow btn-brand icon btn-sm" 
                        onClick={ (e:any) => this.props.parent.toggleUpdateKelas({idkelas: idkelas, namaKelas: namaKelas}) }>
                        <i className="fa fa-pencil"></i>
                    </Button>
                
                    <Button 
                        className="btn-youtube btn-brand icon btn-sm" 
                        onClick={ (e:any) => this.props.parent.toggleDeleteKelas({idkelas: this.props.idkelas, namaKelas: this.props.namaKelas}) }>
                        <i className="fa fa-trash"></i>
                    </Button>
                </td>
            </tr>
        )
    }
}

export default KelasItem;