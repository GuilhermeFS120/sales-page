const watching = document.getElementById('watching')

function setViewers() {
    let numViewers = Math.random() * 850
    while (numViewers < 750) {
        numViewers = Math.random() * 850
        if (numViewers >= 850) {
            return
        }
    }
    numViewers = numViewers.toFixed('0')
    watching.innerHTML = `<p>${numViewers} pessoa${
        numViewers > 1 ? 's' : ''
    } est${numViewers > 1 ? 'ão' : 'á'} vendo essa página agora!</p>`
}

setViewers()
setInterval(setViewers, 1000)
