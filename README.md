# Sef Kloninger's Personal Blog (sefk.github.io)

This is the content hosted at [sef.kloninger.com][]. It's a [Nikola][]
static site hosted by Github pages. This repo contains both the
source files for the blog and the rendered pages. The source files
are in the ```dev``` branch (default for this repo) and the build
products are pushed to ```master```.

[sef.kloninger.com]: https://sef.kloninger.com/
[Nikola]: https://getnikola.com

## Instructions

The general workflow is:

1. **Write**. I like writing in Markdown with vi. Green characters on a black
   background. Old school is the good school.

2. **Review**. Nikola has a nice feature to automatically rebuild your project
   whenever something changes. workflow.  Command is ```nikola auto -p 8888```.
   The extra port because the default, 8000, usually collides with my dev
   environment or something similar.

3. **Publish**.  Check the changes to the dev branch and push that branch. Then
   run the command ```nikola github_deploy``` to build and publish the build
   product to the master branch. github_deploy builds, commits, and pushes in
   one fell swoop.

4. **Repeat**

## Install Notes

### Python

Now that Nikola has moved over to Python 3 we have a little bit more to set things up:

```bash
cd ./sefk.github.io
python3 -m venv .
source ./bin/activate
```

Remember to ```source ./bin/activate``` when starting up future shells. `direnv`
should take care of this for you ever since
`[a9d1bd](https://github.com/sefk/sef-dotfiles/commit/a9d1bdb1775ddf9f90d53d41a5c9366973b22b51)`.

### Nikola

I chose not to check in my theme. I figure maybe it'd be better to have that versioned
elsewhere. This will install the requirements to run Nikola and then start it going.

```bash
pip3 install -r requirements.txt
nikola theme -i bootstrap3
nikola auto
```

## Troubleshooting

### lxml error

If you're seeing this:

> fatal error: 'libxml/xmlversion.h' file not found
> error: command 'cc' failed with exit status 1

Then try this:

```bash
brew install libxml2
brew install libxslt
brew link libxml2 --force
brew link libxslt --force
CPATH=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.9.sdk/usr/include/libxml2 CFLAGS=-Qunused-arguments CPPFLAGS=-Qunused-arguments pip install lxml
```

Not sure the brew steps are req'd or not. That last step is what
did it. From [this answer][] on StackOverflow.

[this answer]: http://stackoverflow.com/questions/19548011/cannot-install-lxml-on-mac-os-x-10-9
