// Middleware: require authenticated user to also have role === 'admin'
// Must be used AFTER the `protect` middleware in a route chain.

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admin role required.' });
};
