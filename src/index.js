class app {
    constructor(){
        this.app = this.getElement('root')
    }
    getElement(id){
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
        this.createLogin(app)
        this.createMain(app)
    }
    createLogin(app){
        const loginDiv = this.createElement('div', ['login-div'])
        const logInput = this.createElement('input', ['login-input'])
        const logBtn = this.createElement('button', ['login-btn'])
        loginDiv.appendChild(logInput)
        loginDiv.appendChild(logBtn)
        return app.appendChild(loginDiv)
    }
    createMain(app){
        const mainDiv = this.createElement('div', ['main'])
        const mainInput = this.createElement('input', ['shortener-input'])
        const shortBtn = this.createElement('button', ['shortener-btn'])
        this.addShortnerBtnListener(shortBtn, mainInput)
        mainDiv.appendChild(mainInput)
        mainDiv.appendChild(shortBtn)
        return app.appendChild(mainDiv)
    }
    addShortnerBtnListener(btn, input){
        btn.addEventListener('click', () => {
            //send request with body input.value
            //add header username
        })
    }
}