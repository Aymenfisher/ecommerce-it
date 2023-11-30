const jwt = require('jsonwebtoken')

function requireAuth(roles = 'all') { // roles : array of allowed roles , or 'all' string for all roles
    return async (req, res, next) => {
        // prevent caching of this request
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        // verify user is authenticated
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required' })
        }
        try {
            const token = authorization.split(' ')[1] 
            // verify token
            const payload = jwt.verify(token, process.env.SECRET) // will throw error if not valid
            // make sure the user has the permission
            const { role } = payload
            if (roles == 'all' || roles.includes(role)) {
                return next()
            }

            return res.status(403).json({
                message: 'forbidden'
            })
        } catch (error) {
            return res.status(401).json({
                message: 'unauthorized'
            })
        }

    }
}

module.exports = requireAuth