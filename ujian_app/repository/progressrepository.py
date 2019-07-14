from sqlalchemy import func
from sqlalchemy.sql.expression import and_
from ujian_app.models import Ujian, Jawaban, Soal, StatePOtomatis, db
from functools import lru_cache


class ProgressRepository:
    '''
    Menyimpan Progress Penilaian Otomatis
    '''
     
    def __init__(self):
        self.__ujian = None
    

    def __del__(self):
        del self.__ujian


    def mulai_state_ptotomatis(self, idujian):
        self.__ujian = Ujian.query.get(idujian)
        if self.__ujian.status_ujian == "3":
            return False
        self.__state = StatePOtomatis.query.get(idujian)
        if self.__state is None:
            self.__state = StatePOtomatis()
            self.__state.idujian = idujian
            db.session.add(self.__state)
            db.session.commit()
            self.get_jml_jawaban.cache_clear()
        return True

    
    def akhiri_state_potomatis(self):
        if self.__ujian:
            self.__ujian.status_ujian = "3"
            db.session.add(self.__ujian)
            db.session.delete(self.__state)
            db.session.commit()
            self.get_jml_jawaban.cache_clear()
        else:
            raise Exception("Penilaian Otomatis Belum Dimulai")


    def get_totaljawaban_kode_proses(self, idujian, kode_proses):
        return db.session.query(
            func.count(Jawaban.idjawaban)
        ).join(
            Soal
        ).filter(
            and_(
                Soal.idujian == idujian,
                Soal.idsoal == Jawaban.idsoal,
                Jawaban.kode_proses == kode_proses,
                Jawaban.nilaiOtomatis == 1
            )
        ).scalar()


    @lru_cache(1)
    def get_jml_jawaban(self, idujian):
        return db.session.query(
            func.count(Jawaban.idjawaban)
        ).join(
            Soal
        ).filter(
            and_(
                Soal.idujian == idujian,
                Soal.idsoal == Jawaban.idsoal,
                Jawaban.nilaiOtomatis == 1
            )
        ).scalar()


    def get_state_selesai(self):
        return self.__ujian == "3"


    def set_state_soal(self, idsoal, namaSoal):
        if self.__state:
            self.__state.pesan_progress_penilaian = \
                "{} {}".format("Sedang Menilai", namaSoal)
            self.__state.idsoal = idsoal
            self.__state.kode_proses = '1'
            db.session.add(self.__state)
            db.session.commit()
        else:
            raise Exception("Penilaian Otomatis Belum Dimulai")
        

    def set_state_proses(self, kode_proses):
        if self.__state:
            self.__state.kode_proses = kode_proses
            db.session.add(self.__state)
            db.session.commit()
        else:
            raise Exception("Penilaian Otomatis Belum Dimulai")


    def get_state_idsoal(self):
        if self.__state:
            return self.__state.idsoal
        else:
            raise Exception("Penilaian Otomatis Belum Dimulai")


    def get_state_kode_proses(self):
        if self.__state:
            return self.__state.kode_proses
        else:
            raise Exception("Penilaian Otomatis Belum Dimulai")


    def get_progress(self, idujian):
        '''
        Mendapatkan progress dalam persentase
        '''
        ujian = Ujian.query.get(idujian)
        if ujian.status_ujian == "3":
            return 'Penilaian Otomatis Telah Selesai', 100
        else:
            state = StatePOtomatis.query.get(idujian)
            if state is None:
                return 'Menunggu Antrian', 0
            
            total_proses_sudah = 0
            for kode_proses in [1, 2, 3, 4]:
                total_proses_sudah += int(
                    self.get_totaljawaban_kode_proses(idujian, kode_proses)
                    ) * kode_proses
            total_proses_seluruh = (self.get_jml_jawaban(idujian) * 4) + 2
            progress = int((total_proses_sudah * 100) / total_proses_seluruh)
            return state.pesan_progress_penilaian or '', progress