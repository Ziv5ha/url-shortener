function errorHandler(err, req, res, next) {
    if (err.massage) {
        if (err.massage.includes('404')) {
            res.status(404).send('Page not found')
        }
    } else {
        res.status(500).send('something went wrong')
    }
}

module.exports = errorHandler