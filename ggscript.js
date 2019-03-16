const GGScript = (src, {
    strategy = document.head ? "inject" : "eval",
    injectasync = true
} = {}) => new Promise((resolve, reject) => {
    // Force a list to be used for src
    if (typeof src !== "object") src = [src]

    // If object provided set to length otherwise set to 1
    const total = src.length

    // Initialise done variable
    let done = 0

    // When JS loaded
    const jsLoaded = (src) => {
        done++
        if (done === total) {
            resolve(src)
        }
    }

    // Make strategy lowercase
    strategy = strategy.toLowerCase()

    if (strategy === "inject") {
        src.forEach((i) => {
            if (!document.head) reject(ReferenceError(`Unable to find document header.`))

            // Create script element
            const script = document.createElement('script')

            // Set asyncronous status
            script.async = injectasync

            // Set script source
            script.src = src

            // When script loaded
            script.addEventListener('load', () => jsLoaded(src))

            // If script fails to load
            script.addEventListener('error', () => reject(i))

            // If script load aborted
            script.addEventListener('abort', () => reject(i))

            // Append script to head
            document.head.appendChild(script)
        })
    } else if (strategy === "eval") {
        src.forEach((i) => {
            // Fetch the content of the URL
            fetch(i).then((res) => {
                res.text().then((text) => {
                    try {
                        // Run the code
                        eval(text)
                        jsLoaded(src)
                    } catch (err) {
                        // If running code failed
                        reject(i, err)
                    }
                }).catch((err) => {
                    // If code fetch failed
                    reject(i, err)
                })
            }).catch((err) => {
                // If code fetch failed
                reject(i, err)
            })
        })
    } else if (strategy === "href") {
        if (!window.location.href) reject(ReferenceError(`Unable to find href object.`))
        src.forEach((i) => {
            // Fetch the content of the URL
            fetch(i).then((res) => {
                res.text().then((text) => {
                    // Run the code
                    window.location.href = "javascript:" + encodeURIComponent(text)
                    jsLoaded(src)
                }).catch((err) => {
                    // If code fetch failed
                    reject(i, err)
                })
            }).catch((err) => {
                // If code fetch failed
                reject(i, err)
            })
        })
    } else {
        // If invalid strategy provided.
        reject(ReferenceError(`Invalid strategy: ${strategy}.`))
    }
})

export default GGScript
