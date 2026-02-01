// Middleware : vérifie que l'utilisateur est authentifié
export function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  next();
}

// Middleware : vérifie que l'utilisateur a un certain rôle (ex: 'admin')
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }
    if (req.session.user.role !== role) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
}
