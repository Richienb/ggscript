const GGScript = src => new Promise((resolve, reject) => {
    const total = typeof src === "object" ? src.length : 1
    let done = 0
    src.forEach((i) => {
        const script = document.createElement('script')
        script.async = true
        script.src = src
        script.addEventListener('load', () => {
            done++
            if (done === total) {
                resolve(src)
            }
        })
        script.addEventListener('error', () => reject(i))
        script.addEventListener('abort', () => reject(i))
        document.head.appendChild(script)
    })

})

export default {
    GGScript
}
