const express = require('express')
const router = express.Router()
router.use(express.json())
const fs = require('fs')

router.post('/', function(req, res, next){
    try {
        const username = req.headers.username
        let {originUrl, customUrl} = req.body
        if (!customUrl) customUrl = randomUrl()
        if (fs.existsSync(`./users`)) {
            if (fs.existsSync(`./users/${username}.json`)) { //if the user exists update his json file
                if (testOriginUrlInUser(originUrl, username)){
                    updateUserJson(originUrl, customUrl, username)
                    res.send(JSON.stringify({message:'URL generated!', customUrl: customUrl}))
                    return
                }
                if (testShortUrl(customUrl)) {
                    customUrl = randomUrl()
                    updateUserJson(originUrl, customUrl, username)
                    res.send(JSON.stringify({message:"sorry, the custom URL you wanted is taken... here's your generated URL", customUrl: customUrl}))
                    return
                } else {
                    updateUserJson(originUrl, customUrl, username)
                }
            } else { //if the user is new create a new json file
                const fileContent = [{originUrl, customUrl}]
                fs.writeFileSync(`./users/${username}.json`, JSON.stringify(fileContent))
            }
        } else {
            fs.mkdirSync(`./users`) // create users dir
            const fileContent = [{originUrl, customUrl}]
            fs.writeFileSync(`./users/${username}.json`, JSON.stringify(fileContent)) //create user json with the url
        }
        res.send(JSON.stringify({message:'URL generated!', customUrl: customUrl}))
    } catch (error) {
        console.log(error)
        next(error)
    }
})
function randomUrl(){
    let url = ''
    while (url.length < 10){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        url += chars[Math.floor(Math.random()*chars.length)]
    }
    if (testShortUrl(url)) randomUrl()
    return url
}
function testShortUrl(urlToTest){
    let used = false
    if (fs.existsSync(`./users`)){
        const dirArr = fs.readdirSync('./users')
        for (const jsonFile of dirArr) {
            const fileArr = JSON.parse(fs.readFileSync(`./users/${jsonFile}`))
            fileArr.forEach(urlObj => {
                if (urlObj.customUrl === urlToTest) {
                    used = true
                }
            })
        }
    }
    if (used) return true
    return false
}
function testOriginUrlInUser(originUrl, username){
    let used = false
    if (fs.existsSync(`./users/${username}.json`)){
        const fileArr = JSON.parse(fs.readFileSync(`./users/${username}.json`))
        fileArr.forEach(urlObj => {
            if (urlObj.originUrl === originUrl) {
                const fileContentBuffer = fs.readFileSync(`./users/${username}.json`)
                const fileContent = JSON.parse(fileContentBuffer)
                fileContent.splice(fileContent.indexOf(urlObj),1)
                fs.writeFileSync(`./users/${username}.json`, JSON.stringify(fileContent))
                used = true
            }
        })
    }
    if (used) return true
    return false
}
function updateUserJson(originUrl, customUrl, username){
    const fileContentBuffer = fs.readFileSync(`./users/${username}.json`)
    const fileContent = JSON.parse(fileContentBuffer)
    fileContent.push({originUrl, customUrl})
    fs.writeFileSync(`./users/${username}.json`, JSON.stringify(fileContent))
}

module.exports = router