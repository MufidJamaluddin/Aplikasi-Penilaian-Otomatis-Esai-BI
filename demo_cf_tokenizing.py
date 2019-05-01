import re, json

strie = "malikat-malaikatnya -&8-098867483- mmm"

# menghilangkan karakter selain a-z dan -
result = re.sub(r'[^a-z -]', ' ', strie, flags = re.IGNORECASE)

print(result)

# menghilangkan karakter - yang bukan tanda hubung
result = re.sub('([ -])([- ])', ' ', result)

print(result)

# menghilangkan spasi yang duplikat
result = re.sub(r'( +)', ' ', result)

print(result)

result = result.split(' ')

print(json.dumps(result))