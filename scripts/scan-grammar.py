#!/usr/bin/env python3
"""Scan blog posts for common grammar issues."""

import os
import re
import sys

POSTS_DIR = "/Users/sefk/src/sefk.github.io/posts"
STORIES_DIR = "/Users/sefk/src/sefk.github.io/stories"

URL_RE = re.compile(r'https?://[^\s<>"\)]+')
CODE_BLOCK_RE = re.compile(r'^(`{3,}|~{3,})', re.MULTILINE)


def strip_lines(text):
    """Return list of cleaned lines."""
    lines = text.split("\n")
    in_code = False
    in_html_comment = False
    result = []
    for line in lines:
        stripped = line.strip()
        if not in_code and not in_html_comment:
            if stripped.startswith("<!--"):
                in_html_comment = True
                if "-->" in stripped[4:]:
                    in_html_comment = False
                continue
        if in_html_comment:
            if stripped.endswith("-->"):
                in_html_comment = False
            continue
        if not in_code:
            if CODE_BLOCK_RE.match(stripped):
                in_code = True
                continue
        else:
            if re.match(r'^(`{3,}|~{3,})$', stripped):
                in_code = False
            continue
        cleaned = URL_RE.sub('', line)
        cleaned = re.sub(r'`[^`]+`', '', cleaned)
        result.append(cleaned)
    return result


def extract_sentences(text):
    """Split text into sentences for grammar checking."""
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if len(s.strip()) > 5]


def check_text(filepath):
    """Check a file for grammar issues."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        return [(0, filepath, [f"Error: {e}"])]

    cleaned_lines = strip_lines(content)
    full_text = " ".join(cleaned_lines)
    sentences = extract_sentences(full_text)

    issues = []

    for sent in sentences:
        lower = sent.lower()

        # 1. Double words
        double_word = re.findall(r'\b(\w+)\s+\1\b', lower)
        for dw in double_word:
            if dw not in ('i', 'a'):
                issues.append((sent, f"Possible repeated word: '{dw}'"))

        # 2. their/there/they're
        if re.search(r'\btheir\s+\w+.*is\b', lower) or \
           re.search(r'\bthere\s+\w+.*their\b', lower) or \
           re.search(r'\bthey\'?\s+\w+\s+their\b', lower):
            issues.append((sent, "Possible their/there/they're confusion"))

        # 3. your/you're
        if re.search(r'\byour\s+(is|are|was|were|going|not|so|like)\b', lower):
            issues.append((sent, "Possible your/you're error"))

        # 4. its/it's
        if re.search(r"\bits\s+(is|been|a |an |not |going )", lower):
            issues.append((sent, "Possible its/it's error"))

        # 5. fewer/less with countable nouns
        countable = ['items', 'people', 'words', 'times', 'pages', 'posts',
                       'errors', 'issues', 'bugs', 'fixes', 'changes', 'files',
                       'lines', 'days', 'weeks', 'months', 'years', 'hours',
                       'clicks', 'users', 'tools', 'apps']
        for noun in countable:
            if re.search(rf'\bless\s+\w+\s+{noun}\b', lower):
                issues.append((sent, f"Possible 'less {noun}' - consider 'fewer {noun}'"))

        # 6. could of / should of / would of
        if re.search(r'\b(co|sh|w)o(und|ul|u\'d)\s+of\s+', lower):
            issues.append((sent, "Possible 'of' -> 'have' error"))

        # 7. then/than in comparisons
        if re.search(r'\b(more|less|better|worse|higher|lower|rather|other|than|noth)\s+then\b', lower):
            issues.append((sent, "Possible 'then' -> 'than' error"))

        # 8. its vs it's patterns
        if re.search(r"\bits\s+a\s+(big|good|bad|new|old|hard|easy|common|important)", lower):
            issues.append((sent, "Possible 'its' -> 'it's' error"))

    return issues


def main():
    all_files = []
    for d in [POSTS_DIR, STORIES_DIR]:
        if os.path.isdir(d):
            for fname in sorted(os.listdir(d)):
                if fname.endswith((".md", ".markdown")):
                    fpath = os.path.join(d, fname)
                    if ".venv" not in fpath:
                        all_files.append(fpath)

    total_issues = 0
    files_with_issues = 0
    for filepath in sorted(all_files):
        issues = check_text(filepath)
        if issues:
            files_with_issues += 1
            print(f"\n{'='*70}")
            print(f"FILE: {filepath} ({len(issues)} issues)")
            print(f"{'='*70}")
            for sentence, issue in issues:
                preview = sentence[:120] + "..." if len(sentence) > 120 else sentence
                print(f"   >> {issue}")
                print(f"      \"{preview}\"")
            total_issues += len(issues)

    print(f"\n{'='*70}")
    print(f"TOTAL: {total_issues} potential grammar issues across {len(all_files)} files")
    print(f"          {files_with_issues} of {len(all_files)} had issues")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()
