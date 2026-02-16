import os

def strip_html_tags():
    posts_dir = 'posts'
    md_files = [f for f in os.listdir(posts_dir) if f.endswith('.md')]
    
    for md_file in md_files:
        path = os.path.join(posts_dir, md_file)
        with open(path, 'r') as f:
            content = f.read()
            
        # Strip <html><body> and </body></html> if they exist
        # We only want to strip them if they are the FIRST and LAST tags
        # but actually they are probably just wrapping the whole thing.
        
        new_content = content.replace('<html><body>', '').replace('</body></html>', '')
        
        if new_content != content:
            print(f"Stripped tags from {md_file}")
            with open(path, 'w') as f:
                f.write(new_content)

if __name__ == "__main__":
    strip_html_tags()
