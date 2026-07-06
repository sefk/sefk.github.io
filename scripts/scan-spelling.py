#!/usr/bin/env python3
"""Scan blog posts for spelling errors, skipping code blocks, URLs, and frontmatter."""

import os
import re
import sys
import enchant

POSTS_DIR = "/Users/sefk/src/sefk.github.io/posts"
STORIES_DIR = "/Users/sefk/src/sefk.github.io/stories"

ALLOWED_FILE = "/Users/sefk/src/sefk.github.io/.tmp/allowed-words.txt"
allowed_words = set()
if os.path.exists(ALLOWED_FILE):
    with open(ALLOWED_FILE, "r") as f:
        for line in f:
            word = line.strip().lower()
            if word and not word.startswith("#"):
                allowed_words.add(word)

URL_RE = re.compile(r'https?://[^\s<>"\)]+')
CODE_BLOCK_RE = re.compile(r'^(`{3,}|~{3,})', re.MULTILINE)


def strip_lines(text):
    """Return list of cleaned lines (code blocks -> empty, URLs removed, inline code stripped)."""
    lines = text.split("\n")
    in_code = False
    in_html_comment = False  # Nikola frontmatter
    result = []

    for line in lines:
        stripped = line.strip()

        # Track HTML comment blocks (Nikola frontmatter)
        if not in_code and not in_html_comment:
            if stripped.startswith("<!--"):
                in_html_comment = True
                # Check if it also closes on the same line
                if "-->" in stripped[4:]:
                    in_html_comment = False
                    result.append("")
                    continue
                result.append("")
                continue

        if in_html_comment:
            if stripped.endswith("-->"):
                in_html_comment = False
            result.append("")
            continue

        # Track fenced code blocks
        if not in_code:
            if CODE_BLOCK_RE.match(stripped):
                in_code = True
                result.append("")
                continue
        else:
            if re.match(r'^(`{3,}|~{3,})$', stripped):
                in_code = False
            result.append("")
            continue

        # Normal line - strip URLs and inline code
        cleaned = URL_RE.sub('', line)
        cleaned = re.sub(r'`[^`]+`', '', cleaned)
        result.append(cleaned)

    return result


def check_spelling(filepath, checker):
    """Check a file for spelling errors. Returns [(line_num, word, suggestions)]."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        return [(0, filepath, [f"Error: {e}"])]

    cleaned_lines = strip_lines(content)
    errors = []
    seen = set()  # avoid duplicates per line+word

    for i, line in enumerate(cleaned_lines, start=1):
        # Skip empty/whitespace-only lines
        if not line.strip():
            continue

        # Extract words (letters plus apostrophes/hyphens for contractions/compounds)
        raw_words = re.findall(r"[a-zA-Z][a-zA-Z'-]*", line)
        for word in raw_words:
            word = word.rstrip(".,;:!?\"'")
            lower = word.lower()

            # Skip very short, numbers-as-words, already-known
            if len(lower) < 2 or re.match(r'^\d', lower):
                continue
            if lower in allowed_words:
                continue
            key = (i, lower)
            if key in seen:
                continue
            seen.add(key)

            if not checker.check(word):
                suggestions = checker.suggest(word)
                errors.append((i, word, suggestions[:5]))

    return errors


def get_context(filepath, line_num):
    """Get trimmed context line from original file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
        if line_num <= len(lines):
            ctx = lines[line_num - 1].rstrip()
            # Remove URLs and inline code from context display
            ctx = URL_RE.sub('[URL]', ctx)
            ctx = re.sub(r'`[^`]+`', '``', ctx)
            return ctx
    except Exception:
        pass
    return ""


def main():
    try:
        checker = enchant.DictWithPWL("en_US", ALLOWED_FILE)
    except Exception:
        try:
            checker = enchant.Dict("en_US")
        except Exception:
            print("Error: No spell-check dictionary available.")
            sys.exit(1)

    # Gather all posts and stories
    all_files = []
    for d in [POSTS_DIR, STORIES_DIR]:
        if os.path.isdir(d):
            for fname in sorted(os.listdir(d)):
                if fname.endswith((".md", ".markdown")):
                    fpath = os.path.join(d, fname)
                    # Skip .venv and other non-post dirs
                    if ".venv" not in fpath:
                        all_files.append(fpath)

    total_errors = 0
    files_with_issues = 0
    for filepath in sorted(all_files):
        errors = check_spelling(filepath, checker)
        if errors:
            files_with_issues += 1
            print(f"\n{'='*70}")
            print(f"FILE: {filepath} ({len(errors)} issues)")
            print(f"{'='*70}")
            for line_num, word, suggestions in errors:
                sug_str = ", ".join(suggestions) if suggestions else "(no suggestions)"
                ctx = get_context(filepath, line_num)
                print(f"  L{line_num}: {ctx}")
                print(f"             >> '{word}' -> {sug_str}")
            total_errors += len(errors)

    print(f"\n{'='*70}")
    print(f"TOTAL: {total_errors} potential errors across {len(all_files)} files")
    print(f"          {files_with_issues} of {len(all_files)} had issues")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()
