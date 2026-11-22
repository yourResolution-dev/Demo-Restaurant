"""Shrinks the WOFF2 files in public/fonts to the characters the site actually uses.

Run after scripts/fetch-fonts.mjs (which downloads the full Google Fonts files):

    node scripts/fetch-fonts.mjs && python scripts/subset-fonts.py

Needs: pip install fonttools brotli. Variable-font axes are kept, so every weight
still works; only unused glyphs are dropped. If you add text with new special
characters, re-run both scripts. Characters are read from src/ and index.html.
"""
import glob
import os
import sys

from fontTools import subset

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
FONT_DIR = os.path.join(ROOT, "public", "fonts")

# Always keep Basic Latin and non-breaking space, plus common punctuation so small
# copy edits don't silently fall back to another font.
codepoints = set(range(0x20, 0x7F)) | {0xA0, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026}

# Plus every character that appears in the site's source text.
files = glob.glob(os.path.join(ROOT, "src", "**", "*.ts*"), recursive=True)
files.append(os.path.join(ROOT, "index.html"))
for path in files:
    with open(path, encoding="utf-8") as f:
        codepoints.update(ord(ch) for ch in f.read() if ord(ch) > 0x20)

options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]  # keep kerning and ligatures
options.hinting = False
options.notdef_outline = True
options.name_IDs = [1, 2, 3, 4, 6]
options.drop_tables += ["DSIG"]

total_before = total_after = 0
for path in sorted(glob.glob(os.path.join(FONT_DIR, "*.woff2"))):
    before = os.path.getsize(path)
    font = subset.load_font(path, options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    tmp_path = path + ".tmp"  # same folder keeps the replace on one drive
    subset.save_font(font, tmp_path, options)
    font.close()  # Windows cannot replace a file that is still open
    os.replace(tmp_path, path)
    after = os.path.getsize(path)
    total_before += before
    total_after += after
    print(f"{os.path.basename(path):48} {before:>7} -> {after:>7}")

print(f"total {total_before} -> {total_after} bytes ({100 - 100 * total_after // total_before}% smaller)")
sys.exit(0)
