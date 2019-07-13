/**
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2019 Richie Bendall
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import axios from "axios"
import {Promise} from "bluebird"

/**
 * Inject scripts into any website.
 * Options information:
 *   `strategy`: The strategy to use to run the JavaScript. Can be `inject`, `eval` or `href`. Default is automatically detected.
 *   `injectLocation`: The `document.querySelector` argument for where to inject the resources. Default is `head`.
 *   `injectAsync`: Load scripts asyncronously when injecting. Default is `true`.
 * @method
 * @param {string | Array<string>} src - The source of the resources.
 * @param {object} - The options.
 * @return {Promise} The promise which will resolve on success and reject on failure.
*/
export function GGScript(src: string | Array<string>, {
    strategy = document.head ? "inject" : "eval",
    injectLocation = "head",
    injectAsync = true,
} = {}): Promise<any> {
    return new Promise((resolve, reject) => {
        // Force a list to be used for src
        if (typeof src !== "object") src = [src]

        // If object provided set to length otherwise set to 1
        const total = src.length

        // Initialise done variable
        let done = 0

        // When JS loaded
        const jsLoaded = () => {
            done++
            if (done === total) resolve()
        }

        // Make strategy lowercase
        strategy = strategy.toLowerCase()

        if (strategy === "inject") {
            src.forEach((i) => {
                if (!(document.querySelector(injectLocation) || document.head)) reject(new ReferenceError("Unable to find element in document."))

                // Get the type of source
                const type = i.endsWith("css") ? "stylesheet" : "script"

                if (type === "script") {
                    // Create script element
                    const script = document.createElement("script")

                    // Set asyncronous status
                    script.async = injectAsync

                    // Set script source
                    script.src = i

                    // When script loaded
                    script.addEventListener("load", () => jsLoaded())

                    // If script fails to load
                    script.addEventListener("error", () => reject(i))

                    // If script load aborted
                    script.addEventListener("abort", () => reject(i))

                    // Append script to head
                    const el = document.querySelector(injectLocation) || document.head
                    el.appendChild(script)
                } else if (type === "stylesheet") {
                    // Create script element
                    const link = document.createElement("link")

                    // Set link type
                    link.rel = "stylesheet"

                    // Set link source
                    link.href = i

                    // When link loaded
                    link.addEventListener("load", () => jsLoaded())

                    // If link fails to load
                    link.addEventListener("error", () => reject(i))

                    // If link load aborted
                    link.addEventListener("abort", () => reject(i))

                    // Append link to head
                    const el = document.querySelector(injectLocation) || document.head
                    el.appendChild(link)
                } else reject(new TypeError("Invalid resource type specified."))
            })
        } else if (strategy === "eval") {
            src.forEach((i) => {
                // Fetch the content of the URL
                axios.get(i).then((res: any) => {
                    try {
                        // Run the code
                        eval(res)
                        jsLoaded()
                    } catch (_e) {
                        // If running code failed
                        reject(i)
                    }
                }).catch(() => reject(i))
            })
        } else if (strategy === "href") {
            if (!window.location.href) reject(new ReferenceError("Unable to find href object."))
            src.forEach((i) => {
                // Fetch the content of the URL
                axios.get(i).then((res: any) => {
                    try {
                        // Run the code
                        window.location.href = "javascript:" + encodeURIComponent(res)
                        jsLoaded()
                    } catch (_e) {
                        // If running code failed
                        reject(i)
                    }
                }).catch(() => reject(i))
            })
        } else {
            // If invalid strategy provided.
            reject(new ReferenceError(`Invalid strategy: ${strategy}.`))
        }
    })
}
