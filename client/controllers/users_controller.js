app.controller('UsersController', function(UserFactory, $location){
	console.log('instanciating UsersController...');
	var self = this;
	self.newUser = {};
	self.registrationErrors = [];
	self.current_user = {};
	self.loginUser = {email: "", password: ""};
	self.loginErrors = [];

	UserFactory.session(function(res){
		if(res){
			self.current_user = res.data;
		} else {
			self.current_user = {};
			$location.url('/');
		}
	})

	self.login = function(loginUser){
		console.log(loginUser);
		UserFactory.login(loginUser, function(res){
			if(res.data.errors){
				self.current_user = {};
				self.loginErrors.push(res.data.errors);
			} else {
				self.current_user = res.data;
				$location.url('/dashboard')
			}
		})
	}

	self.create = function(newUser){
		self.registrationErrors = [];
		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.registrationErrors.push(error.message);
				}
			} else {
				self.current_user = res.data;
				$location.url('/dashboard');
			}
		})
	}

})