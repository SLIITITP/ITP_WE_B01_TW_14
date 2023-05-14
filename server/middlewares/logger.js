const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const { promises: fsPromises } = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const logEvents = async (message, logFileName) => {
    const __filename = path.resolve(__dirname, 'module.js');
    const __dirname = path.dirname(__filename);
    
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger };
