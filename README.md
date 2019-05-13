# GG Script

Inject scripts into any website.

[![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/ggscript/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/ggscript)
[![CodeFactor Score](https://www.codefactor.io/repository/github/Richienb/ggscript/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/Richienb/ggscript)

[![NPM](https://nodei.co/npm/ggscript.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ggscript)

## Importing

From your NodeJS application:

```js
const GGScript = require("ggscript")
```

From your web application:

```html
<script src="https://unpkg.com/ggscript/dist/index.min.js"></script>
```

## Usage

```js
// Inject a single file
GGScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js")

// Inject multiple files
GGScript(["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.9/vue.min.js", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"])

// Promise integration
GGScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js").then(() => {
    console.log("Finished loading resources.")
}).catch((err) => {
    console.error("Something bad just happened! " + err)
})

// Custom options
GGScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js", {
    strategy: "eval"
})
```

## Usage

Read the [documentation](https://richienb.github.io/ggscript).
