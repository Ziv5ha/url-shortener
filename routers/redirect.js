const express = require('express')
const router = express.Router()
router.use(express.json())
const fs = require('fs')

router.get('/:customUrl', (req, res, next) => {
    try {
        let foundDestination = false
        const username = req.headers.username
        let {customUrl} = req.params
        if (fs.existsSync(`./users/${username}.json`)){
            const fileContent = JSON.parse(fs.readFileSync(`./users/${username}.json`))
            fileContent.forEach(urlObj => {
                if (urlObj.customUrl === customUrl) {
                    foundDestination = true
                    redirectCount(fileContent, customUrl, username)
                    if (urlObj.originUrl.includes('https://')){
                        res.redirect(urlObj.originUrl)
                        return
                    } else {
                        res.redirect(`https://${urlObj.originUrl}`)
                        return
                    }
                }
            })
            if (!foundDestination){
                throw 404
            }
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

function redirectCount(fileContent, customUrl, username){
    const indexOfUrlObj = fileContent.map(uObj => uObj.customUrl).indexOf(customUrl)
    fileContent[indexOfUrlObj].redirectCount++
    fs.writeFileSync(`./users/${username}.json`, JSON.stringify(fileContent))
}


module.exports = router