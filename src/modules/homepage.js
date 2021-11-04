import axios from "axios"

function createElement(tag, classes, id, text){
    const elem = document.createElement(tag)
    if (classes.length > 0) {
        classes.forEach(className => {
            elem.classList.add(className)
        })
    }
    if (id) elem.id = id
    if (text) elem.textContent = text
    return elem
}
function addChilds(parentElemnt, children){
    children.forEach(childElemnt => {
        parentElemnt.appendChild(childElemnt)
    })
}

export function renderHP(){
    const app = document.getElementById("root")
    console.log(app);
    createNavHead(app)
    createLogin(app)
    createMain(app)
}

function createLogin(app){
    const loginDiv = createElement('div', ['login-div'])
    const logInput = createElement('input', ['login-input'])
    const logBtn = createElement('button', ['login-btn'])

    const welcome = createElement('p', ['user'], '', 'welcome ')
    const username = createElement('span', ['user'], 'username', 'Guest')
    setUser(logBtn, logInput, username)

    welcome.appendChild(username)
    addChilds(loginDiv, [logInput, logBtn, welcome])
    app.appendChild(loginDiv)
}
function setUser(logBtn, logInput, usernameSpan){
    logBtn.addEventListener('click', () => {
        usernameSpan.textContent = logInput.value
    })
}
const getUser = () => {
    return document.getElementById('username').textContent
}
function createNavHead(app){
    const header = createElement('h1', ['page-head'], '', 'Zip-Url')
    const topHam = createElement('div', ['ham-menu'])
    const middleHam = createElement('div', ['ham-menu'])
    const bottomHam = createElement('div', ['ham-menu'])
    const summener = createElement('button', ['nav-summoner'])
    addChilds(summener, [topHam, middleHam, bottomHam])
    addChilds(app, [header, summener])
}

function createMain(app){
    const mainDiv = createElement('div', ['main'])
    const mainUrlInput = createElement('input', ['shortener-input'])
    const customUrlInput = createElement('input', ['shortener-input'])
    const shortBtn = createElement('button', ['custom-url-btn'])
    addShortnerBtnAtttibutes(shortBtn, mainUrlInput, customUrlInput)
    mainDiv.appendChild(mainUrlInput)
    mainDiv.appendChild(customUrlInput)
    mainDiv.appendChild(shortBtn)
    app.appendChild(mainDiv)
}
function addShortnerBtnAtttibutes(shortBtn, mainUrlInput, customUrlInput){
    shortBtn.addEventListener('click', () => {
        sendShortening(mainUrlInput.value, customUrlInput.value)
    })
}

const sendShortening = (mainUrlInput, customUrlInput) => {
    try {
        axios.post(
            `http://localhost:3000/shorten/`, 
            {originUrl: `${mainUrlInput}`, customUrl: `${customUrlInput}`},
            {headers:{
                username: getUser(),
                'Content-Type': 'application/json'
            }}
        )
    } catch (error) {
        
    }
}

function clearRender(){
    const app = document.getElementById("root")
    while (app.hasChildNodes()){
        app.firstChild.remove()
    }
}