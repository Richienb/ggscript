[![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/scriptinjector/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/scriptinjector)
[![CodeFactor Score](https://www.codefactor.io/repository/github/Richienb/scriptinjector/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/Richienb/scriptinjector)

# Script Injector

[![NPM](https://nodei.co/npm/scriptinjector.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/scriptinjector)

Inject scripts into any website.

## Importing

From your NodeJS application:
```js
const ScriptInjector = require("scriptinjector")
```

From your web application:
```html
<script src="https://unpkg.com/scriptinjector/scriptinjector.min.js"></script>
```

## Usage

```js
// Inject a single file
ScriptInjector("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js")

// Inject multiple files
ScriptInjector(["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.9/vue.min.js", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"])

// Promise integration
ScriptInjector("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js").then((src) => {
    console.log("Finished loading " + src)
})
```
