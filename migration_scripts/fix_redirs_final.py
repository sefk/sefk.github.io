import re

def fix_redirections():
    conf_path = 'conf.py'
    with open(conf_path, 'r') as f:
        content = f.read()
        
    # Pattern to match redirections like (u'...', u'/posts/something.html')
    # and change them to (u'...', u'/posts/something/')
    
    # We want to be careful not to change things that ARE NOT posts or that should have .html
    # But in this site, it seems all posts should use pretty URLs.
    
    def sub_func(match):
        old_part = match.group(1)
        target = match.group(2)
        if target.startswith('/posts/') and target.endswith('.html'):
            new_target = target[:-5] + '/'
            return f"(u'{old_part}', u'{new_target}')"
        return match.group(0)

    # Simplified regex for the redirections list
    new_content = re.sub(r"\(u'([^']+)', u'([^']+)'\)", sub_func, content)
    
    if new_content != content:
        with open(conf_path, 'w') as f:
            f.write(new_content)
        print("Updated redirections to use trailing slashes.")
    else:
        print("No changes made to redirections.")

if __name__ == "__main__":
    fix_redirections()
