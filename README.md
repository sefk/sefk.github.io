# sef.kloninger.com AKA sefk.github.io 

This is my personal blog.  It is a Nikola static site hosted by Github pages.  This repo contains both the source files, in the ```src``` subdirectory, as well as the resulting product itself, in the top level directory.

# Instructions

The general workflow is:

1. **Write**. I like writing in Markdown with vi. Green characters on a
   black background. Old school is the good school.

2. **Review**. Nikola has a nice feature to automatically rebuild your
   project whenever something changes.  The -b option fires up a
   localhost browser that refreshes with every save.  Very nice
   workflow.  Command is ```nikola -b -p 8888```.  The extra port
   because the default, 8000, usually collides with my dev environment or
   something similar.

3. **Publish**.  Check the whole thing into Github.  The ```src```
   subdirectory has the markdown and the top directory has the generated
   static site.  Push the whole thing.

4. **Repeat**

Note: I used to use "livereload -b ..." to accomplish this same thing, and that works fine, but Nikola's built in feature for this is nicer.


## Install Notes

### lxml error

If you're seeing this:

    fatal error: 'libxml/xmlversion.h' file not found
    error: command 'cc' failed with exit status 1

Then try this:

    brew install libxml2
    brew install libxslt
    brew link libxml2 --force
    brew link libxslt --force

    CPATH=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.9.sdk/usr/include/libxml2 CFLAGS=-Qunused-arguments CPPFLAGS=-Qunused-arguments pip install lxml

Not sure the brew steps are req'd or not. That last step is what did it. From [this StackOverflow answer](http://stackoverflow.com/questions/19548011/cannot-install-lxml-on-mac-os-x-10-9) 
