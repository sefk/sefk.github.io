#!/usr/bin/env python3
"""
Convert YYYYMM-prefixed post files to new naming convention.

For each pair of YYYYMM*.html and YYYYMM*.meta files in posts/:
  - Combines them into a single .md file with the YYYYMM prefix dropped
  - Meta content goes at top as an HTML comment
  - HTML content follows with <html><body> wrapper stripped
  - Slug in metadata is updated to remove the YYYYMM prefix
  - Old .html and .meta files are deleted

Run from the repo root directory:
    python3 migration_scripts/convert_yyyymm_posts.py
"""

import os
import re
import glob

posts_dir = 'posts'
pattern = re.compile(r'^(\d{6})(.+)\.meta$')
converted = []

for meta_file in sorted(glob.glob(os.path.join(posts_dir, '*.meta'))):
    basename = os.path.basename(meta_file)
    match = pattern.match(basename)
    if not match:
        continue

    prefix = match.group(1)
    slug_suffix = match.group(2)
    old_slug = prefix + slug_suffix
    new_slug = slug_suffix

    html_file = meta_file.replace('.meta', '.html')
    if not os.path.exists(html_file):
        print(f'Warning: {html_file} not found, skipping')
        continue

    # Read meta
    with open(meta_file) as f:
        meta_content = f.read()

    # Update slug in meta
    meta_content = meta_content.replace(f'.. slug: {old_slug}', f'.. slug: {new_slug}')

    # Read HTML
    with open(html_file) as f:
        html_content = f.read()

    # Strip <html><body> and </body></html>
    html_content = re.sub(r'<html>\s*<body>\s*', '', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'\s*</\s*body>\s*</\s*html>\s*$', '', html_content, flags=re.IGNORECASE)

    # Ensure content ends with newline
    html_content = html_content.rstrip() + '\n'

    # Create new .md file
    new_file = os.path.join(posts_dir, f'{new_slug}.md')
    with open(new_file, 'w') as f:
        f.write('<!--\n')
        f.write(meta_content.rstrip() + '\n')
        f.write('-->\n\n')
        f.write(html_content)

    # Delete old files
    os.remove(meta_file)
    os.remove(html_file)

    converted.append((old_slug, new_slug))
    print(f'Converted: {old_slug} -> {new_slug}')

print(f'\nTotal converted: {len(converted)}')
