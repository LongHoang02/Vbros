#!/usr/bin/env python3
"""Rebuild index.html from src/template.html + src/fonts/*.css + content/data.js.

Run from the repo root:  python3 build.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
tpl = (ROOT / "src/template.html").read_text(encoding="utf-8")
fonts = (ROOT / "src/fonts/saira.css").read_text(encoding="utf-8") + (ROOT / "src/fonts/bvp.css").read_text(encoding="utf-8")
data = (ROOT / "content/data.js").read_text(encoding="utf-8")
out = tpl.replace("/*@@FONTS@@*/", fonts).replace("/*@@DATA@@*/", data)
assert "@@FONTS" not in out and "@@DATA" not in out
(ROOT / "index.html").write_text(out, encoding="utf-8")
print("wrote index.html,", len(out.encode()), "bytes")
