export const requiresLogin = async () => {
  if (!req.isAuthenticated()) {
		res.redirect('/login');
	} 
	next();
}

export const user = {
  hasAuthorization: function (req, res, next) {
		if (req.profile.id != req.user.id) {
			return res.redirect('/users/' + req.profile.id);
		}
		next();
	}
}