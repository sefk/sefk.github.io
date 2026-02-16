import os
import re
import subprocess

def fix_conf():
    conf_path = 'conf.py'
    posts_dir = 'posts'
    
    # Get deleted files from git status
    result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    deleted_files = []
    for line in result.stdout.splitlines():
        if line.startswith(' D '):
            deleted_files.append(line[3:].strip())
            
    html_deleted = [f for f in deleted_files if f.endswith('.html') and f.startswith('posts/')]
    
    prefix_re = re.compile(r'^posts/(\d{6})(.*)\.html$')
    
    redirections = []
    for f in html_deleted:
        match = prefix_re.match(f)
        if match:
            new_slug = match.group(2)
            if new_slug.startswith('-'):
                new_slug = new_slug[1:]
            
            old_url = f
            new_url = f"/posts/{new_slug}.html"
            redirections.append((old_url, new_url))
            
    with open(conf_path, 'r') as f:
        conf_content = f.read()
        
    for old_url, new_url in redirections:
        target = "u'/" + old_url + "'"
        replacement = "u'" + new_url + "'"
        conf_content = conf_content.replace(target, replacement)
        
        target_no_slash = "u'" + old_url + "'"
        conf_content = conf_content.replace(target_no_slash, replacement)

    new_redirs_str = ""
    for old_url, new_url in redirections:
        new_redirs_str += "    (u'" + old_url + "', u'" + new_url + "'),\n"
        
    conf_content = re.sub(
        r'(REDIRECTIONS = \[\n)',
        r'\1' + new_redirs_str,
        conf_content
    )
    
    with open(conf_path, 'w') as f:
        f.write(conf_content)

if __name__ == "__main__":
    fix_conf()
