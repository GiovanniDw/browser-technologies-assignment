export const isAuthenticated = (req, res, next) => {
  if (req.user) next();
  else res.redirect("/login");
  next();
};

export const user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      return res.redirect("/login");
    }
    next();
  },
};
