var lsgControllers = angular.module('gmaControllers', []);

lsgControllers.controller('GWGmaAuthGetTokenTestController', ['$scope', '$http', '$sce', 'getToken', function($scope, $http, $sce, getToken) {
	$scope.inputs = {client:{domain: 'DEMO1_Domain'}};
	$scope.testing = {success: false, called: false, running: false};
	getToken($scope.inputs.client.domain, function(data) {
		$scope.inputs.token = data.clientData.client_id + ':' + data.clientData.client_secret;
	}, function(data, status) {
		$scope.inputs.token = "ERROR"
	});
}]);