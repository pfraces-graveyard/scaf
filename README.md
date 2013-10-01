# Scaf

Template-based scaffolding tool

Process files content with **visionmedia**'s `ejs`

# Usage

## Create a template

```sh
mkdir -p ~/.scaf/my-template/{foo,bar}
```

Add some `ejs` templates

```sh
cat > ~/.scaf/my-template/foo/hello <<EOF
Hello <%- name %>!
EOF
```

```sh
cat > ~/.scaf/my-template/bar/created <<EOF
Created <%- now %>
By <%- name %>
EOF
```

Now we can use `scaf` package directly from JavaScript

**script.js**

```js
var scaf = require('scaf');

scaf('my-template', {
    name: 'pfraces',
    now: new Date()
}).fold('~/hello');
```

```sh
node script.js
```

Or from its CLI included

```sh
scaf --template my-template --fold ~/hello --name pfraces --now $(date)
```

Tada!

```sh
find ~/hello
```

> /home/pfraces/hello  
  /home/pfraces/hello/foo  
  /home/pfraces/hello/foo/hello  
  /home/pfraces/hello/bar  
  /home/pfraces/hello/bar/created

```sh
cat ~/hello/foo/hello
```

> Hello pfraces!

```sh
cat ~/hello/bar/created
```

> Created Sat Sep 28 2013 19:15:00 GMT+0200 (CEST)  
  By pfraces

# Installation

    npm install [-g] scaf

# Motivation

I've been frustrated using `grunt-init` from JavaScript:

*   No JavaScript API provided, just CLI
*   Unable to apply defaults without prompting
*   Too many dependencies for such a simple task

After a quick search, I didn't find a directory scaffolding JS library, so here
we are!
