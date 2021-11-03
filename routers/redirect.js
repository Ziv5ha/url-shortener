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
                    if (urlObj.originUrl.includes('https://')){
                        res.redirect(urlObj.originUrl)
                    } else {
                        res.redirect(`https://${urlObj.originUrl}`)
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

module.exports = router