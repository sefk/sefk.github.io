import os
import re

def convert_posts():
    posts_dir = 'posts'
    conf_path = 'conf.py'
    
    # regex for YYYYMM prefix
    prefix_re = re.compile(r'^(\d{6})(.*)$')
    
    html_files = [f for f in os.listdir(posts_dir) if f.endswith('.html')]
    
    redirections = []
    
    for html_file in html_files:
        base = html_file[:-5]
        meta_file = base + '.meta'
        meta_path = os.path.join(posts_dir, meta_file)
        
        if not os.path.exists(meta_path):
            continue
            
        print(f"Converting {html_file}...")
        
        # Determine new slug
        match = prefix_re.match(base)
        if match:
            new_slug = match.group(2)
            if new_slug.startswith('-'):
                new_slug = new_slug[1:]
        else:
            new_slug = base
            
        # Read meta
        with open(meta_path, 'r') as f:
            meta_content = f.read()
            
        # Update slug in meta
        # Look for .. slug: OLD_SLUG
        meta_lines = meta_content.splitlines()
        new_meta_lines = []
        for line in meta_lines:
            if line.startswith('.. slug:'):
                new_meta_lines.append(f'.. slug: {new_slug}')
            else:
                new_meta_lines.append(line)
        
        # Add type: text if not present
        if not any(line.startswith('.. type:') for line in new_meta_lines):
            new_meta_lines.append('.. type: text')
            
        new_meta_content = '\n'.join(new_meta_lines)
        
        # Read html
        html_path = os.path.join(posts_dir, html_file)
        with open(html_path, 'r') as f:
            html_content = f.read()
            
        # Create md content
        md_content = f"<!--\n{new_meta_content}\n-->\n\n{html_content}"
        
        new_md_file = new_slug + '.md'
        new_md_path = os.path.join(posts_dir, new_md_file)
        
        # Write new md file
        with open(new_md_path, 'w') as f:
            f.write(md_content)
            
        # Add to redirections if slug changed
        if new_slug != base:
            redirections.append((f'posts/{base}.html', f'/posts/{new_slug}.html'))
            
        # Delete old files
        os.remove(html_path)
        os.remove(meta_path)
        
    # Update conf.py
    with open(conf_path, 'r') as f:
        conf_content = f.read()
        
    # Find REDIRECTIONS = [ ... ]
    
    new_redirs_str = ""
    for old_url, new_url in redirections:
        new_redirs_str += f"    (u'{old_url}', u'{new_url}'),\n"
        
    # Insert new redirections into the list
    if redirections:
        conf_content = re.sub(
            r'(REDIRECTIONS = \[\n)',
            r'\1' + new_redirs_str,
            conf_content
        )
        
        # Also update existing redirections to point to new URLs
        for old_url, new_url in redirections:
            target_to_replace = f"u'/{old_url}'"
            replacement = f"u'{new_url}'"
            conf_content = conf_content.replace(target_to_replace, replacement)
            
            target_to_replace_no_slash = f"u'{old_url}'"
            conf_content = conf_content.replace(target_to_replace_no_slash, replacement)

    with open(conf_path, 'w') as f:
        f.write(conf_content)

if __name__ == "__main__":
    convert_posts()
