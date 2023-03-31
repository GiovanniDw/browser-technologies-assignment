export const isAuthenticated = async (req, res, next) => {
  if (req.session.user) next()
		else next('/login')
	next();
}

export const user = {
  hasAuthorization: function (req, res, next) {
		if (req.profile.id != req.user.id) {
			return res.redirect('/survey/');
		}
		next();
	}
}
