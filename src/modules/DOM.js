function createElement(tag, classes, id){
    const elem = document.createElement(tag)
    if (classes.length > 0) {
        classes.forEach(className => {
            elem.classList.add(className)
        })
    }
    if (id) elem.id = id
    return elem
}
function render(){
    const app = document.getElementById('root')
    console.log(app);
    console.log('1');
    createLogin(app)
    createMain(app)
    console.log('yes');
}
function createLogin(app){
    const loginDiv = createElement('div', ['login-div'])
    const logInput = createElement('input', ['login-input'])
    const logBtn = createElement('button', ['login-btn'])
    loginDiv.appendChild(logInput)
    loginDiv.appendChild(logBtn)
    app.appendChild(loginDiv)
    return
}
function createMain(app){
    const mainDiv = createElement('div', ['main'])
    const mainUrlInput = createElement('input', ['shortener-input'])
    const customUrlInput = createElement('input', ['shortener-input'])
    const shortBtn = createElement('button', ['shortener-btn'])
    addShortnerBtnListener(shortBtn, mainUrlInput, customUrlInput)
    mainDiv.appendChild(mainUrlInput)
    mainDiv.appendChild(customUrlInput)
    mainDiv.appendChild(shortBtn)
    app.appendChild(mainDiv)
    return
}