import json

thisset = set(["apple", "banana", "cherry"])
thislist = ["apple", "babana", "owowoow", "cherry", "hahaha", "owowoow"]

result = [token for token in thislist \
            if not token in thisset]

print(json.dumps(result))