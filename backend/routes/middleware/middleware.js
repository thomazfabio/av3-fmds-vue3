const adminfire = require('../../utils/fireConfig');

class Middleware {
    async checkToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Não autorizado: Token ausente" });
        }

        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        try {
            const decodeValue = await adminfire.auth().verifyIdToken(token);
            if (!decodeValue) {
                return res.status(401).json({ message: "Não autorizado: Token inválido" });
            }
            req.user = decodeValue;
            next();
        } catch (e) {
            console.log(e);
            return res.status(401).json({ message: "Não autorizado: Erro na verificação do token" });
        }
    }
}

module.exports = new Middleware();
