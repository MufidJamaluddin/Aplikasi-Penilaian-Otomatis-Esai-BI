import React, { Component } from 'react';
import Button from 'reactstrap/lib/Button';

interface KelasItemModel 
{ 
    idkelas: string; 
    namaKelas: string;
    toggleUpdateKelas: VoidFunction; // Referensi / Pointer
    toggleDeleteKelas: VoidFunction;
}

class KelasItem extends Component<KelasItemModel>
{
    public constructor(props: KelasItemModel)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        console.log(this.props.namaKelas);
        
        return (
            <tr>
                <td>{ this.props.namaKelas }</td>
                <td>
                    <Button 
                        className="btn-stack-overflow btn-brand icon btn-sm" 
                        onClick={ this.props.toggleUpdateKelas }>
                        <i className="fa fa-pencil"></i>
                    </Button>

                    <Button 
                        className="btn-youtube btn-brand icon btn-sm" 
                        onClick={ this.props.toggleDeleteKelas }>
                        <i className="fa fa-trash"></i>
                    </Button>
                </td>
            </tr>
        )
    }
}

export default KelasItem;