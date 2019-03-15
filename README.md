[![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/scriptrunner/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/scriptrunner)
[![CodeFactor Score](https://www.codefactor.io/repository/github/Richienb/scriptrunner/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/Richienb/scriptrunner)

# Script Injector

[![NPM](https://nodei.co/npm/scriptrunner.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/scriptrunner)

Inject scripts into any website.

## Importing

From your NodeJS application:
```js
const ScriptRunner = require("scriptrunner")
```

From your web application:
```html
<script src="https://unpkg.com/scriptrunner/scriptrunner.min.js"></script>
```

## Usage

```js
// Inject a single file
ScriptRunner("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js")

// Inject multiple files
ScriptRunner(["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.9/vue.min.js", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"])

// Promise integration
ScriptRunner("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js").then((src) => {
    console.log("Finished loading " + src)
})
```
