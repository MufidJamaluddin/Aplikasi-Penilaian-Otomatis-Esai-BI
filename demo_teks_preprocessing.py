import json
from ujian_app.penilaian.pemrosesan_teks import Preprocesser

preprocesser = Preprocesser()
teks = 'Dengan memberikan nilai yang tepat untuk setiap term, dilakukan berbalas-balasan dan berbalasbalasan maka penilaian esai otomatis dapat bekerja lebih baik dalam menentukan apakah suatu term termasuk kata kunci yang mencirikan suatu kategori nilai atau tidak.'

print('DEMO TEXT PREPROCESSING\n'+ teks)

teks = preprocesser.case_folder.case_fold(teks)

print('\n1. Case Folding\n' + teks)

result = preprocesser.tokenizer.tokenize(teks)

print('\n2. Tokenizing\n' + json.dumps(result))

result = preprocesser.stopword_remover.filter(result)

print('\n3. Stopword Removal\n' + json.dumps(result))

result = preprocesser.stemmer.stem_tokens(result)

print('\n4. Stemming\n' + json.dumps(result))

result_unigram = preprocesser.tf_unigram.calculate(result)

print('\n5. Unigram (TF)\n' + json.dumps(result_unigram))

result_bigram = preprocesser.tf_bigram.calculate(result)

print('\n6. Bigram (TF)\n' + json.dumps(result_bigram))

result = preprocesser.get_features(result)

print('\n7. Hasil\n' + json.dumps(result) + '\n')