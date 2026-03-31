## Goal

I’d like to increase my velocity by creating a space where Claude Code could run unfettered, but safely. Initially this is for coding projects, but in the future I could imagine this being used for other agent-based OpenClaw-style workflows, like sending messages, booking appointments, or monitoring things. 

## Access

CAN read my calendar
CAN read my github repos

I would like to share my Claude Code token budget. Gemini not so important.

CANNOT access 1Password – not installed
CANNOT read my email
CANNOT read my files in iCloud and Google drive

## Context

I have a M1 Mac studio with 1TB disk and 64GB and two monitors that will lend itself nicely to this setup. It’s my dev machine, running current Tahoe with xcode on it. Occasionally I work from a M3 Mac laptop. I am very comfortable with ssh and command line tools. I prefer console tools to IDE’s, for example my standard setup is ghostty with Claude Code and neovim. Chrome is my browser of choice.

For more context on me you can look up https://sef.kloninger.com/, especially https://sef.kloninger.com/tools

## Plan and Questions

Q: Mac or Linux?
- Generally I’ve been impressed with the MacOS native desktop and keyboard-video-mouse sharing, so likely that’s the answer.

Q: What virtualization tool?
- Heard good things about both UTM and tart
- While predisposed to use vmware fusion, recent poor experiences with them say no.

Q: What’s a good user name? I’m thinking sefk-robot since that’s what will show up on emails and commit messages, so I want to signal that this is my responsibility, but not me actually talking. Other ideas:
- sefk-ai
- sefk-delegate (less scary)
- not-sef

Create <user>@gmail.com and log into chrome with that. Not part of the Google Family for file/cost sharing

Create <user>@icloud.com and log into the VM with that. Not part of Apple Family

Create <user>@github.com with it’s own ssh keypair. Explicitly add that to ACL’s of private repos, there aren't that many.


