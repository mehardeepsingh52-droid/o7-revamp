"""Crawl o7solutions.in and dump per-page SEO data.

Usage: python3 scripts/crawl.py <out_dir>
Writes <out_dir>/report.json plus a .txt with the visible text of each page.
"""
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

BASE = "https://www.o7solutions.in"
SEEDS = ["/", "/sitemap", "/career", "/team"]
SKIP_EXT = re.compile(r"\.(css|js|png|jpe?g|svg|webp|gif|ico|pdf)$", re.I)
MAX_PAGES = 120


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta = {}
        self.headings = []
        self.links = set()
        self.images = []
        self.text = []
        self._tags = []
        self._hidden = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self._tags.append(tag)
        if tag in ("script", "style", "noscript"):
            self._hidden += 1
        elif tag == "meta" and (attrs.get("name") or attrs.get("property")):
            self.meta[attrs.get("name") or attrs.get("property")] = attrs.get("content", "")
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.meta["canonical"] = attrs.get("href")
        elif tag == "a" and attrs.get("href"):
            self.links.add(attrs["href"])
        elif tag == "img":
            self.images.append({"src": attrs.get("src", ""), "alt": attrs.get("alt", "")})

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript"):
            self._hidden = max(0, self._hidden - 1)
        if self._tags:
            self._tags.pop()

    def handle_data(self, data):
        data = " ".join(data.split())
        if not data or self._hidden:
            return
        tag = self._tags[-1] if self._tags else ""
        if tag == "title":
            self.title += data
        elif tag in ("h1", "h2", "h3", "h4"):
            self.headings.append(f"{tag}: {data}")
            self.text.append(f"[{tag}] {data}")
        else:
            self.text.append(data)


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as error:
        return error.code, ""


def main(out_dir):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    queue = [BASE + path for path in SEEDS]
    seen, report = set(), {}

    while queue and len(seen) < MAX_PAGES:
        url = queue.pop(0).split("#")[0].rstrip("/") or BASE
        if url in seen or not url.startswith(BASE) or SKIP_EXT.search(url):
            continue
        seen.add(url)

        status, body = fetch(url)
        page = PageParser()
        page.feed(body)
        links = sorted(urllib.parse.urljoin(url + "/", href) for href in page.links)

        slug = urllib.parse.urlparse(url).path.strip("/").replace("/", "_") or "home"
        (out / f"{slug}.txt").write_text("\n".join(page.text))
        report[url] = {
            "status": status,
            "title": page.title,
            "meta": page.meta,
            "headings": page.headings,
            "images": page.images,
            "links": links,
        }
        queue += [link for link in links if link.startswith(BASE)]
        print(status, url)

    (out / "report.json").write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "crawl")
