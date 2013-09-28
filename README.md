# Tpl

Template-based scaffolding tool

Process files content with **visionmedia**'s `ejs`

# Usage

Create a template to be used and a target destination

```sh
mkdir -p ~/.tpl/my-template/{foo,bar}
mkdir ~/hello
```

Add some `ejs` templates

```sh
cat <<EOF
Hello <%- name %>!
EOF > ~/.tpl/my-template/foo/hello
```

```sh
cat <<EOF
Created <%- now %>
By <%- name %>
EOF > ~/.tpl/my-template/bar/created
 ```

Now we can use `tpl` package directly from JavaScript

**script.js**

```js
var tpl = require('tpl');

tpl('my-template').scaffold('~/hello', {
    name: 'pfraces',
    now: new Date()
});
```

```sh
node script.js
```

Or from its CLI included

```sh
tpl my-template --scaffold ~/hello --name pfraces --now $(date)
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

    npm install [-g] tpl

# Motivation

I've been frustrated trying to use `grunt-init` from JavaScript:

*   No JavaScript API provided, just CLI
*   Unable to apply defaults without prompting
*   Too many dependencies for such a simple task

After a quick search, I didn't find a directory scaffolding JS library, so here
we are!
