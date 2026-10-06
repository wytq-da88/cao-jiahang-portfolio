"""Produce an OFL-licensed heading font subset from the official Google source.
Tools and source are local build tooling, not a runtime dependency of the site.
"""
from pathlib import Path
import hashlib, json, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1])
font = TTFont(source)
instantiateVariableFont(font, {"wght": 500}, inplace=True)
text = ''.join(chr(i) for i in range(32, 127))
for directory in (root / 'app', root / 'components', root / 'data'):
    for path in directory.rglob('*'):
        if path.suffix in ('.js', '.jsx', '.json'):
            text += ''.join(re.findall(r'[\u3000-\u9fff]', path.read_text(encoding='utf-8')))
options = subset.Options()
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=''.join(sorted(set(text))))
subsetter.subset(font)
font.flavor = 'woff2'
output = root / 'public/fonts/noto-serif-sc-500.woff2'
output.parent.mkdir(parents=True, exist_ok=True)
font.save(output)
record = {'source':'https://github.com/google/fonts/tree/main/ofl/notoserifsc', 'license':'SIL Open Font License 1.1', 'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(), 'glyph_characters':len(set(text)), 'weight':500, 'output_bytes':output.stat().st_size, 'output_sha256':hashlib.sha256(output.read_bytes()).hexdigest()}
(root / 'docs/font-source.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(record,ensure_ascii=False))
