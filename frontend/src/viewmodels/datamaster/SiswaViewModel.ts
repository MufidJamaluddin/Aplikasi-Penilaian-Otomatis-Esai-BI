import API from "../../models/api";
import DataSiswa from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPISiswa { list: Array<DataSiswa>; }

/**
 * Kelas untuk mendapatkan data guru
 */
export class SiswaViewModel
{

    /**
     * Mendapatkan Data Siswq
     * dan Menampilkannya di View
     */
    initDatasiswa()
    {
        return API<JsonAPISiswa>('/api/siswa')
        .then(value => {
            return value.list;
        });
    }

    /**
     * Menginputkan Data Siswa
     * @param data Data Siswa
     */
    inputDatasiswa(data:any)
    {
        return API<JsonAPISiswa>('/api/siswa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        });
    }

    /**
     * Mengubah Data Siswa
     * @param data Data Siswa
     */
    updateSiswa(nis:string, data:any)
    {
        return API<JsonAPISiswa>('/api/siswa/' + nis, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((value:any) => {
            return value.list;
        });
    }

    /**
     * Menghapus Data Kelas
     * @param data Data Kelas Sekolah
     */
    hapusSiswa(nis:string)
    {
        return API<JsonAPISiswa>('/api/siswa/' + nis, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        })
        .then(value => {
            return value.list;
        });
    }

}