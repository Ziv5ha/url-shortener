class App {
    constructor(){
        this.app = this.getElement('root')
    }
    getElement(id){
        console.log(document.getElementById('root'));
        return document.getElementById(id)
    }
    createElement(tag, classes, id){
        const elem = document.createElement(tag)
        if (classes.length > 0) {
            classes.forEach(className => {
                elem.classList.add(className)
            })
        }
        if (id) elem.id = id
        return elem
    }
    render(){
        const app = this.app
        console.log(this.app);
        console.log('1');
        this.createLogin(app)
        this.createMain(app)
        console.log('yes');
    }
    createLogin(app){
        const loginDiv = this.createElement('div', ['login-div'])
        const logInput = this.createElement('input', ['login-input'])
        const logBtn = this.createElement('button', ['login-btn'])
        loginDiv.appendChild(logInput)
        loginDiv.appendChild(logBtn)
        app.appendChild(loginDiv)
        return
    }
    createMain(app){
        const mainDiv = this.createElement('div', ['main'])
        const mainUrlInput = this.createElement('input', ['shortener-input'])
        const customUrlInput = this.createElement('input', ['shortener-input'])
        const shortBtn = this.createElement('button', ['shortener-btn'])
        this.addShortnerBtnListener(shortBtn, mainUrlInput, customUrlInput)
        mainDiv.appendChild(mainUrlInput)
        mainDiv.appendChild(customUrlInput)
        mainDiv.appendChild(shortBtn)
        app.appendChild(mainDiv)
        return
    }
    addShortnerBtnListener(btn, mainInput, customUrl){
        btn.addEventListener('click', () => {
            //send request with body input.value
            //if custon.length === 0 custom.value = null
            //add header username
        })
        return
    }
}
const app = new App()
app.render()