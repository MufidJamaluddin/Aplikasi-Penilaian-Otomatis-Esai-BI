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
    static __instance?: SiswaViewModel;

    static getInstance() : SiswaViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new SiswaViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Siswq
     * dan Menampilkannya di View
     */
    async initDatasiswa()
    {
        const value = await API<JsonAPISiswa>('/api/siswa');
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menginputkan Data Siswa
     * @param data Data Siswa
     */
    async inputDatasiswa(data:any)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPISiswa>('/api/siswa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Mengubah Data Siswa
     * @param data Data Siswa
     */
    async updateSiswa(nis:string, data:any)
    {
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(nis));

        const value = await API<JsonAPISiswa>('/api/siswa/' + nis, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menghapus Data Kelas
     * @param data Data Kelas Sekolah
     */
    async hapusSiswa(nis:string)
    {
        const value = await API<JsonAPISiswa>('/api/siswa/' + nis, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

}