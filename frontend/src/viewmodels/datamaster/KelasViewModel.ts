import API from "../../models/api";
import DataKelas from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIKelas { list: Array<DataKelas>; }

/**
 * Kelas untuk mendapatkan data guru
 */
export class KelasViewModel
{
    /**
     * Mendapatkan Data Kelas
     * dan Menampilkannya di View
     */
    initDatakelas()
    {
        return API<JsonAPIKelas>('/api/kelas')
        .then(value => {
            return value.list;
        });
    }

    /**
     * Menginputkan Data Kelas
     * @param data Data Kelas Sekolah
     */
    inputDatakelas(data:any)
    {
        return API<JsonAPIKelas>('/api/kelas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        })
    }

    /**
     * Mengubah Data Kelas
     * @param data Data Kelas Sekolah
     */
    updateKelas(idkelas:string, data:any)
    {
        return API<JsonAPIKelas>('/api/kelas/' + idkelas, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        });
    }

    /**
     * Menghapus Data Kelas
     * @param data Data Kelas Sekolah
     */
    hapusKelas(idkelas:string)
    {
        return API<JsonAPIKelas>('/api/kelas/' + idkelas, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        })
        .then(value => {
            return value.list;
        });
    }

}