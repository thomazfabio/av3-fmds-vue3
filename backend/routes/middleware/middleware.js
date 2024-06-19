const admin = require('../../utils/fireConfig')

class Middleware {
    async checkToken(req, res, next) {
        if (!!!req.headers.authorization)
            return res.json({ message: "Não autorizado" })

        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodeValue = await admin.auth().verifyIdToken(token)
            if (!!!decodeValue)
                return res.json({ message: "Não autorizado" })
            req.user = decodeValue
            next();
        } catch (e) {
            return res.json({ message: "Não autorizado" })
        }
    }
}

module.exports = new Middleware();