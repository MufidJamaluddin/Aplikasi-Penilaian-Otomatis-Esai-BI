import json

# PYTHON DICTIONARY
count_class = {'D':{'freq':0,'id':1},'C':{'freq':2,'id':1},'B':{'freq':1,'id':1},'A':{'freq':0,'id':1}}

print(count_class)

# PYTHON LIST OF TUPLE
list_item = count_class.items()

# URUTKAN BERDASARKAN INDEX KEDUA PADA TUPLE
#   INDEX PERTAMA   (0): SKOR
#   INDEX KEDUA     (1): KEMUNCULAN
ns = sorted(list_item, key=lambda a: a[1]['freq'])
print(ns)

if ns:
    skorHuruf, jawaban = ns.pop()
    print('\n%s : %d' % (skorHuruf, jawaban['freq']))

for i in count_class.items():
    print(i)

print(ns[1][1])