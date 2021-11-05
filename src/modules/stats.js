const { default: axios } = require("axios")
const { clearRender, createLogin, createNavHead, createElement, addChilds } = require("./homepage")

export function renderS(){
    const app = document.getElementById('root')
    app.className = 'stats'
    const username = document.getElementById('username').textContent
    clearRender()
    createNavHead(app)
    createLogin(app, username)
    generateStats(app, username)
}
async function generateStats(app, username){
    createLoader()
    const stats = await getStats(username)
    removeLoader()
    const statsElem = createElement('div', ['stats'])
    stats.forEach(urlObj => {
        const entry = createElement('div', ['stat-entry'])
        const originUrl = createElement('div', [], '', urlObj.originUrl)
        const customUrl = createElement('div', [], '', urlObj.customUrl)
        const redirectCount = createElement('div', [], '', urlObj.redirectCount)
        const creationDate = createElement('div', [], '', urlObj.creationDate)
        addChilds(entry, [originUrl, customUrl, redirectCount, creationDate])
        statsElem.appendChild(entry)
    })
    app.appendChild(statsElem)
}

async function getStats(username){
    try {
        const stats = await axios.get(
            `http://localhost:3000/stats/`, 
            {headers:{
                username,
            }}
        )
        return stats.data
    } catch (error) {
        console.log(error);
    }
}
function createLoader() {
    const loader = createElement('div', [], 'loader')
    document.body.appendChild(loader)
}
function removeLoader() {
    const loader = document.getElementById('loader')
    loader.remove()
}