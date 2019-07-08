export default interface DataKelas { idkelas:string; namaKelas:string; }

export default interface DataMatapelajaran 
{ 
    idmapel: string; 
    namaMapel: string; 
    KKM: string; 
}

export default interface DataGuru 
{
    idguru: string;
    nip: string;
    nuptk: string;
    namaGuru: string;
    namaMapel: string;
    namaKelas: string;
    username?: string;
    password?: string;
    listpengampu?: Array<any>;
}

export default interface DataSiswa
{
    nis: string;
    nama: string;
    idkelas: string;
    password?: string;
    angkatan: string;
    kelas:Partial<DataKelas>;
}

export default interface DataPelaksanaanUjian
{
    idkelas: string;
    idujian: string;
    waktu_mulai: string;
    status_pelaksanaan: string;
    status_penilaian?: string;
    progress_penilaian?: number;
    pesan_progress_penilaian?: string;
}

export default interface DataUjian
{
    idujian: string;
    idguru: string;
    idmapel: string;
    namaUjian: string;
    namaMapel: string;
    pelaksanaan_ujian: Array<any>;
    listsoal: Array<any>;
    jumlahSoal: number;
    durasi: string;
    status_ujian: string;
}

export default interface DataSoal
{
    idujian: string;
    idsoal: string;
    soalEsai: string;
    skorMin: string;
    skorMax: string;
    kompetensiDasar: string;
    materiPokok: string;
}

export default interface DataJawabanUjian
{
    nis: string;
    idujian: string;
    idsoal: string;
    jawabanSiswa?: string;
}

export default interface DataPengampu
{
    idpengampu: string;
    idmapel: string;
    idkelas: string;
    idguru: string;
    
    namaKelas: string;
    namaGuru: string;
    namaMatapelajaran: string;
}

export default interface DataJawabanSoal
{
    idjawaban?: string;
    idsoal: string;
    nis: string;
    jawabanEsai : string;
    skorAngka: string;
}

interface KeyValueMaps<T> {
    [key: string]: T;
}

interface NilaiUjian
{
    nis: string;
    nama: string
    nilai: KeyValueMaps<string>;
    nilai_akhir: number;
}

interface SkorUjian
{
    nis: string;
    nama: string;
    nilai: number;
    keterangan: string;
    skor: KeyValueMaps<string>;
    status: KeyValueMaps<string>;
}

export default interface DaftarNilaiUjian
{
    list_ujian: KeyValueMaps<string>;
    list_nilai: Array<NilaiUjian>;
    list_nilaiujian: KeyValueMaps<Array<any>>;
}

export default interface DaftarSkorUjian
{
    list_soal: KeyValueMaps<string>;
    list_skor: Array<SkorUjian>;
}