const watching = document.getElementById('watching'),
    date = new Date(),
    minViewers = 900,
    maxViewers = 1100,
    btnBuy = document.getElementById('btnBuy')

function setViewers() {
    let numViewers = Math.random() * maxViewers,
        today = date.toLocaleDateString('pt-br')

    while (numViewers < minViewers) {
        numViewers = Math.random() * maxViewers
        if (numViewers >= maxViewers) {
            return
        }
    }
    numViewers = numViewers.toFixed('0')
    watching.innerHTML = `<p>${numViewers} pessoa${
        numViewers > 1 ? 's' : ''
    } est${numViewers > 1 ? 'ão' : 'á'} vendo essa página em ${today}</p>`
}

function showButton() {
    if (video.currentTime >= video.duration - 60) {
        btnBuy.classList.add('active')
    }
}

setViewers()
setInterval(setViewers, 1000)
