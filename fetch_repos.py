import urllib.request, json
req = urllib.request.Request('https://api.github.com/users/anuragverma4895/repos', headers={'User-Agent': 'Mozilla/5.0'})
d = json.loads(urllib.request.urlopen(req).read())
for r in d:
    print(f"{r['name']} - {r['description']} - {r['language']} - {r['html_url']}")
