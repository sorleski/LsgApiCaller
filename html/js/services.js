var lsgServices = angular.module('lsgServices', []);

lsgServices.factory('csrfToken', [ '$http', function($http) {
	return function(onComplete, onFailure) {
		onFailure = onFailure || function(x, y) {};
		$http.get('/SS/token').
			success(function(data, status, headers, config){
				onComplete(data.token);
			}).
			error(function(data, status, headers, config){
				onFailure(status, data);
			});
	};
}]);

lsgServices.factory('oauth', [ '$http', function($http) {
	function objToForm(obj) {
		var fields = [];
		for (x in obj) {
			fields.push(x + "=" + obj[x])
		}
		return fields.join('&');
	}
	return function(clientAbbrev, clientId, clientSecret, onComplete, onFailure) {
		onFailure = onFailure || function(x, y) {};
		$http.post('/GAW/oauth/token',
			objToForm({
				"client_secret": clientSecret,
				"client_id": clientId,
				"grant_type": "client_credentials",
				"client_abbrev": clientAbbrev
			}),
			{ 
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).
			success(function(data, status, headers, config){
				onComplete(data);
			}).
			error(function(data, status, headers, config){
				onFailure(status, data);
			});
	};
}]);

lsgServices.factory('getToken', ['$http', function($http){
	return function(domain, onComplete, onFailure) {
		onFailure = onFailure || function(x, y) {};
		$http.get('/GW/GmaAuth/gma/getToken', {
				headers: {
					"TAM_DOMAIN": domain
				}
			}).
			success(function(data, status, headers, config){
				onComplete(data);
			}).
			error(function(data, status, headers, config){
				onFailure(status, data);
			});
	};
}]);

lsgServices.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			fd.append(key, value);
		});
		return fd;
	};
});