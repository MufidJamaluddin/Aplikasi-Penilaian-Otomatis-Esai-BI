import API from "../../models/api";
import DataSiswa from '../../models/item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPISiswa { list: Array<DataSiswa>; }

/**
 * Mendapatkan Data Siswq
 * dan Menampilkannya di View
 */
function initDatasiswa()
{
    return API<JsonAPISiswa>('/api/siswa')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menginputkan Data Siswa
 * @param data Data Siswa
 */
function inputDatasiswa(data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPISiswa>('/api/siswa', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Mengubah Data Siswa
 * @param data Data Siswa
 */
function updateSiswa(nis:string, data:any)
{
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(nis));

    return API<JsonAPISiswa>('/api/siswa/'+nis, { 
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menghapus Data Kelas
 * @param data Data Kelas Sekolah
 */
function hapusSiswa(nis:string)
{
    return API<JsonAPISiswa>('/api/siswa/'+nis, { 
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: "{}"
    })
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

export { initDatasiswa, inputDatasiswa, updateSiswa, hapusSiswa }