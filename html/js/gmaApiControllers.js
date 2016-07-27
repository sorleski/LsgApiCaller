var gmaApiControllers = angular.module('gmaApiControllers', []);

gmaApiControllers.controller('GAWAttributesListAttributesTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/attributes',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_AddAccountTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		userName: 'Spotty',
		firstName: 'Spot',
		lastName: 'DeKitty',
		email: 'scorlesk@us.ibm.com',
		password: 'core1234',
		confirmPassword: 'core1234',
		phone: '8175551212',
		jsonSource: '',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$scope.inputs.jsonSource= {"uid": $scope.inputs.userName, "givenName": $scope.inputs.firstName, "sn": $scope.inputs.lastName, "password": $scope.inputs.password, "mail": $scope.inputs.email, "homePhone": $scope.inputs.phone };
		

		
		
		$http.post(
			'/GAW/accounts',
				$scope.inputs.jsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);


gmaApiControllers.controller('GAWAttributesCreateAttributeTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		attributeForm: {
			name: "",
			value: ""
		}
	};
	$scope.updateConnector = function() {
		$scope.inputs.connectionForm.connectorId = $scope.inputs.connector.id;
		$scope.inputs.connectionForm.properties = [];
		$scope.inputs.connectionForm.attributeMap = [];
		for (var i = 0; i < $scope.inputs.connector.properties.length; i++) {
			$scope.inputs.connectionForm.properties.push({name: $scope.inputs.connector.properties[i].name, value: $scope.inputs.connector.properties[i].defaultValue});
		}
		for (var i = 0; i < $scope.inputs.connector.attributes.length; i++) {
			$scope.inputs.connectionForm.attributeMap.push({name: $scope.inputs.connector.attributes[i].name, source:""});
		}
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/attributes/',
			$scope.inputs.attributeForm,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
					"Accept": "application/json"
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWAttributesRemoveAttributeTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		attributeId: ""
	};
	$scope.updateConnector = function() {
		$scope.inputs.connectionForm.connectorId = $scope.inputs.connector.id;
		$scope.inputs.connectionForm.properties = [];
		$scope.inputs.connectionForm.attributeMap = [];
		for (var i = 0; i < $scope.inputs.connector.properties.length; i++) {
			$scope.inputs.connectionForm.properties.push({name: $scope.inputs.connector.properties[i].name, value: $scope.inputs.connector.properties[i].defaultValue});
		}
		for (var i = 0; i < $scope.inputs.connector.attributes.length; i++) {
			$scope.inputs.connectionForm.attributeMap.push({name: $scope.inputs.connector.attributes[i].name, source:""});
		}
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.delete(
			'/GAW/attributes/' + $scope.inputs.attributeId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
					"Accept": "application/json"
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWInitGmaTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/initGma/',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysGetPersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		keyId: "Key0"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/keys/personalCerts/' + $scope.inputs.keyId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysExportPersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		keyId: "server"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/keys/personalCerts/' + $scope.inputs.keyId,
			{
				"params": {"export":true}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysListPersonalCertsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/keys/personalCerts',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysCreatePersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		keyForm: {
			action: "generate",
			label: "key01",
			size: 1024,
			expiration: 365,
			reminder: true,
			file: "",
			password: "",
			active: false
		}
	};
	$scope.actions = ['generate', 'upload'];
	$scope.sizes = [1024, 2048, 4096];
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	$scope.fileNameChanged = function(event) {
		var files = event.target.files;
		if (files.length == 1) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.inputs.keyForm.file = btoa(e.target.result);
				console.log($scope.inputs.keyForm.file);
			};
			reader.readAsBinaryString(files[0]);
		}
	};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/keys/personalCerts',
			$scope.inputs.keyForm,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysReplacePersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		label: null,
		keyForm: {
			action: "generate",
			size: 1024,
			expiration: 365,
			reminder: true,
			file: "",
			password: "",
			active: false
		}
	};
	$scope.actions = ['generate', 'upload'];
	$scope.sizes = [1024, 2049, 4096];
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	$scope.fileNameChanged = function(event) {
		var files = event.target.files;
		if (files.length == 1) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.inputs.keyForm.file = btoa(e.target.result);
				console.log($scope.inputs.keyForm.file);
			};
			reader.readAsBinaryString(files[0]);
		}
	};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/keys/personalCerts/' + $scope.inputs.label,
			$scope.inputs.keyForm,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysUpdatePersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		keyForm: {
			label: "key02",
			reminder: true,
			active: true
		}
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.put(
			'/GAW/keys/personalCerts/' + $scope.inputs.keyForm.label,
			{
				reminder: $scope.inputs.keyForm.reminder,
				active: $scope.inputs.keyForm.active
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysRemovePersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		keyId: "key02"
	};
	$scope.actions = ['generate', 'upload'];
	$scope.sizes = [1024, 2049, 4096];
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.delete(
			'/GAW/keys/personalCerts/' + $scope.inputs.keyId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysSearchPersonalCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		searchTerm: ""
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/keys/personalCerts/search',
			{
				"draw":1,
				"columns":[
					{
						"data":0,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":1,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":2,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":3,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					}
				],
				"order":[
					{"column":0,"dir":"asc"}
				],
				"start":0,
				"length":10,
				"search":{"value":$scope.inputs.searchTerm,"regex":true},
				"limitFilter":"",
				"language":"en-us"
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysListSignerCertsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/keys/signerCerts',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysRemoveSignerCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		keyId: "key02"
	};
	$scope.actions = ['generate', 'upload'];
	$scope.sizes = [1024, 2049, 4096];
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.delete(
			'/GAW/keys/signerCerts/' + $scope.inputs.keyId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysSearchSignerCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		searchTerm: ""
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/keys/signerCerts/search',
			{
				"draw":1,
				"columns":[
					{
						"data":0,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":1,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":2,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":3,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":4,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					}
				],
				"order":[
					{"column":0,"dir":"asc"}
				],
				"start":0,
				"length":10,
				"search":{"value":$scope.inputs.searchTerm,"regex":true},
				"limitFilter":"",
				"language":"en-us"
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWKeysCreateSignerCertTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		keyForm: {
			label: "key01",
			file: ""
		}
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	$scope.fileNameChanged = function(event) {
		var files = event.target.files;
		if (files.length == 1) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.inputs.keyForm.file = btoa(e.target.result);
				console.log($scope.inputs.keyForm.file);
			};
			reader.readAsBinaryString(files[0]);
		}
	};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/keys/signerCerts',
			$scope.inputs.keyForm,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWConnectionsGetConnectionTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		connectionId: "00000000-0000-0000-3333-000000000000"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/connections/' + $scope.inputs.connectionId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWConnectionsListConnectionsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/connections',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWConnectionsCreateConnectionController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		connectionForm: {
			name: "",
			enabled: true,
			connectorId: "-1",
			properties: [{name: "", value: ""}],
			attributeMap: [{name: "", source: ""}]
		},
		connector: {id:"-1", properties: [], attributes:[]}
	};
	$scope.updateConnector = function() {
		$scope.inputs.connectionForm.connectorId = $scope.inputs.connector.id;
		$scope.inputs.connectionForm.properties = [];
		$scope.inputs.connectionForm.attributeMap = [];
		for (var i = 0; i < $scope.inputs.connector.properties.length; i++) {
			if (!$scope.inputs.connector.properties[i].readOnly == "false")
				$scope.inputs.connectionForm.properties.push({name: $scope.inputs.connector.properties[i].name, value: $scope.inputs.connector.properties[i].defaultValue});
		}
		for (var i = 0; i < $scope.inputs.connector.attributes.length; i++) {
			$scope.inputs.connectionForm.attributeMap.push({name: $scope.inputs.connector.attributes[i].name, source:""});
		}
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
			$http.get(
				'/GAW/connectors', 
				{"params":{}, "headers": {"Authorization": "Bearer " + data.access_token, "Content-Type": "application/json", "Accept": "application/json"}}
			).success(function(data){
				$scope.connectors = data;
			});
			$http.get(
				'/GAW/attributes', 
				{"params":{}, "headers": {"Authorization": "Bearer " + data.access_token, "Content-Type": "application/json", "Accept": "application/json"}}
			).success(function(data) {
				$scope.attributes = data;
			});
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/connections/',
			$scope.inputs.connectionForm,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
					"Accept": "application/json"
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWConnectionsUpdateConnectionTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		connectionId: 1,
		connectionForm: {
			name: "",
			enabled: true,
			connectorId: "-1",
			properties: [{name: "", value: ""}],
			attributeMap: [{name: "", source: ""}]
		},
		connector: {id:"-1", properties: [], attributes:[]}
	};
	$scope.updateConnector = function() {
		$scope.inputs.connectionForm.connectorId = $scope.inputs.connector.id;
		$scope.inputs.connectionForm.properties = [];
		$scope.inputs.connectionForm.attributeMap = [];
		for (var i = 0; i < $scope.inputs.connector.properties.length; i++) {
			$scope.inputs.connectionForm.properties.push({name: $scope.inputs.connector.properties[i].name, value: $scope.inputs.connector.properties[i].defaultValue});
		}
		for (var i = 0; i < $scope.inputs.connector.attributes.length; i++) {
			$scope.inputs.connectionForm.attributeMap.push({name: $scope.inputs.connector.attributes[i].name, source:""});
		}
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
			$http.get(
				'/GAW/connectors', 
				{"params":{}, "headers": {"Authorization": "Bearer " + data.access_token, "Content-Type": "application/json", "Accept": "application/json"}}
			).success(function(data){
				$scope.connectors = data;
			});
			$http.get(
				'/GAW/attributes', 
				{"params":{}, "headers": {"Authorization": "Bearer " + data.access_token, "Content-Type": "application/json", "Accept": "application/json"}}
			).success(function(data) {
				$scope.attributes = data;
			});
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.put(
			'/GAW/connections/' + $scope.inputs.connectionId,
			$scope.inputs.connectionForm,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
					"Accept": "application/json"
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWConnectionsRemoveConnectionTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		connectionId: "1"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.delete(
			'/GAW/connections/' + $scope.inputs.connectionId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);


gmaApiControllers.controller('GAWConnectionsSearchTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		searchTerm: ""
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/connections/search',
			{
				"draw":1,
				"columns":[
					{
						"data":0,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":1,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":2,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":3,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					},{
						"data":4,
						"name":"",
						"searchable":true,
						"orderable":true,
						"search":{"value":"","regex":false}
					}
				],
				"order":[
					{"column":0,"dir":"asc"}
				],
				"start":0,
				"length":10,
				"search":{"value":$scope.inputs.searchTerm,"regex":true},
				"limitFilter":"",
				"language":"en-us"
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWConnectorsListConnectorsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/connectors',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWIdentitiesGetUsersDataTablesTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		jsonSource: '{"draw":6,"columns":[{"data":0,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":1,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":2,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":3,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":4,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":5,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":6,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}}],"order":[{"column":3,"dir":"asc"}],"start":0,"length":10,"search":{"value":"Spot","regex":true},"limitFilter":"","language":"en-us"}', 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/identities/getUsersDataTables',
			$scope.inputs.jsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}

		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWIdentitiesAddUserTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		account: 'true',
		userStatus: 'true',
		pwdStatus: 'true',
		surname: 'tester1',
		givenName: 'steve',
		uid: 'steveTester1',
		pwd: 'core1234',
		roles: null,
		services: null,
		groups: null,
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/identities/addUser',
			{
				"userAttributes": {"sn": $scope.inputs.surname, "givenName": $scope.inputs.givenName, "uid": $scope.inputs.uid, "userPassword": $scope.inputs.pwd},
				"account": $scope.inputs.account,
				"userStatus": $scope.inputs.userStatus,
				"pwdStatus": $scope.inputs.pwdStatus,
				"roles": $scope.inputs.roles
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_GetAllWebAppsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		dataTablesJson: '{"draw":4,"columns":[{"data":0,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":1,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":2,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":3,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":4,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}}],"order":[{"column":3,"dir":"asc"}],"start":0,"length":10,"search":{"value":"","regex":true},"limitFilter":"","language":"en-us"}',
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/webapplications/search',
			$scope.inputs.dataTablesJson,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_CreateWebApplicationTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		jsonSource: 
		'{"name": "/steveApp100","id": null,"type": "tcp","servers": [{"id": null,"hostname": "host1.ibm.com","virtualhostname": "vhost1.ibm.com","port": 8888,"dn": "some dn ","queryScriptPath": "backend server query script path","caseInsensitiveURLs": false,"win32Support": false}],"protectedObjectId": null,"description": "Steves app","statefulConnection": false,"booleanRule": false,"encodingType": "utf8_bin","threadHardLimit": 100,"threadSoftLimit": 100,"clientHeadersUseShortUsernameHeader": true,"clientHeadersUseLongUsernameHeader": false,"transparentPathJunction": true,"virtual": true,"aclId": null,"popId": null,"clientCertLabel": null,"basicAuthMode": "filter","enableBasicAuth": false,"scriptCookie": false,"preserveCookiePath": false,"preserveCookieName": false,"gsoResourceGroup": null,"clientHeaderIVGroups": false,"clientHeaderIVCreds": false,"clientHeaderIp": false,"mutualAuth": false,"webSeal2WebSealDelegationSupport": false,"reverseProxyUsername": null,"reverseProxyPassword": null}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/webapplications',
				$scope.inputs.jsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_GetWebApplicationTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		id: "17"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/webapplications/' + $scope.inputs.id,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_UpdateWebApplicationTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		webAppId: 11,
		webappJsonSource: '{ "name": "/DavesNewTest", "id": "11", "type": "ssl", "servers": [  {"id": 56,"hostname": "Some DN","virtualhostname": "Some VH","port": 88,"dn": "Some DN","queryScriptPath": "Some QSP","caseInsensitiveURLs": true,"win32Support": false  } ], "description": "Testing another Add", "statefulConnection": false, "booleanRule": false, "encodingType": "utf8_uri", "threadHardLimit": 0, "threadSoftLimit": 0, "clientHeadersUseShortUsernameHeader": false, "clientHeadersUseLongUsernameHeader": false, "transparentPathJunction": false, "virtual": false, "aclId": null, "popId": null, "protectedObjectId": 10, "basicAuthMode": "filter", "enableBasicAuth": true, "reverseProxyUsername": "blah", "reverseProxyPassword": null, "scriptCookie": false, "scriptCookieType": null, "preserveCookiePath": true, "preserveCookieName": true, "gsoResourceGroup": null, "clientHeaderIVGroups": false, "clientHeaderIVCreds": false, "clientHeaderIp": false, "mutualAuth": false, "clientCertLabel": null, "webSeal2WebSealDelegationSupport": false}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.put(
			"/GAW/webapplications/" + $scope.inputs.webAppId, 
			$scope.inputs.webappJsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_GetProtectedObjectPoliciesListTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/protectedobjectpolicies',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_GetProtectedObjectPolicyTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		popId: "1"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/protectedobjectpolicies/' + $scope.inputs.popId,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_CreatePOPTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		jsonSource: 
		'{	"id": null,	"name": "StevePolicy2a3",	"description": "Steves policy 2a3",	"warnOnPolicyViolation": false,	"permit": false,	"deny": false,	"error": true,	"admin": true,	"timeEnabled": false,	"monday": false,	"tuesday": false,	"wednesday": false,	"thursday": false,	"friday": false,	"saturday": false,	"sunday": false,	"timeSpec": "1200-1700",	"qualityOfProtection": "integrity",	"networks": [{		"id": null,		"ipAddress": "2.1.2.1",		"anyOtherNetwork": false,		"netmask": "255.255.255.0",		"authLevel": 2,		"forbidden": false	}, {		"id": null,		"ipAddress": "3.1.3.1",		"anyOtherNetwork": false,		"netmask": "255.255.255.0",		"authLevel": 2,		"forbidden": true	}]}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/protectedobjectpolicies',
				$scope.inputs.jsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_UpdatePOPTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		popId: 5,
		popJsonSource: 
		'{  "id": 5,  "name": "StevePolicy 34",  "description": "Steves policy 2",  "warnOnPolicyViolation": false,  "permit": false,  "deny": false,  "error": true,  "admin": true,  "timeEnabled": false,  "monday": false,  "tuesday": false,  "wednesday": false,  "thursday": false,  "friday": false,  "saturday": false,  "sunday": false,  "timeSpec": "time spec",  "qualityOfProtection": "integrity",  "networks": [{        "id": 7,"ipAddress": "2.1.2.1",   "anyOtherNetwork": false,   "netmask": "255.255.255.0",   "authLevel": 2,   "forbidden": false    }, { "id": 8,   "ipAddress": "2.1.2.12",   "anyOtherNetwork": false,   "netmask": "255.255.255.0",   "authLevel": 2,   "forbidden": true  }]}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.put(
			'/GAW/protectedobjectpolicies/' + $scope.inputs.popId, 
			$scope.inputs.popJsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);


gmaApiControllers.controller('GAW_JM_DeletePOPTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		popid: 5,		
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.delete(
			'/GAW/protectedobjectpolicies/' + $scope.inputs.popid, 
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_GetACLListTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/accesscontrollists',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_GetACLTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null,
		id: "4"
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/accesscontrollists/' + $scope.inputs.id,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_CreateACLTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		jsonSource: 
		'{"id":null,"name":"SteveACL","description":"Steves ACL","aclEntries":[{"type":"group","id":null,"description":"Steve Kingfishers entry","name":"Steve Kingfisher","traverse":true,"control":true,"delegation":true,"modify":true,"delete":true,"browse":true,"serverAdmin":true,"view":true,"attach":true,"bypassPOP":true,"trace":true,"bypassAuthzRule":true,"read":true,"execute":true,"listDirectory":true,"create":true,"password":true,"add":true}]}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/accesscontrollists',
				$scope.inputs.jsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAW_JM_UpdateACLTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		aclId: 1,
		aclJsonSource: '{"id":1,"name":"SteveACL","description":"Steves ACL","aclEntries":[{"type":"group","id":1,"description":"Steve Kingfishers entry","name":"Steve Kingfisher","traverse":true,"control":true,"delegation":true,"modify":true,"delete":true,"browse":true,"serverAdmin":true,"view":true,"attach":true,"bypassPOP":true,"trace":true,"bypassAuthzRule":true,"read":true,"execute":true,"listDirectory":true,"create":true,"password":true,"add":true}]}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.put(
			'/GAW/accesscontrollists/' + $scope.inputs.aclId, 
			$scope.inputs.aclJsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);


gmaApiControllers.controller('GAW_JM_DeleteACLTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		aclid: 3,		
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.delete(
			'/GAW/accesscontrollists/' + $scope.inputs.aclid, 
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);


gmaApiControllers.controller('GAW_GmaServices_AddServiceTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		name: 'steveService13',
		description: 'test service',
		ownerUuid: 'b45b0390-f86b-41dd-87ae-454fa404f468',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/gmaServices/addService',
			{
				"name": $scope.inputs.name,
				"description": $scope.inputs.description,
				"ownerUuid": $scope.inputs.ownerUuid
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);


gmaApiControllers.controller('GAWKbaGetKbaTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/kba/questions',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceAutocompleteTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		type: "user", 
		subType: "gtwayIsManager",
		searchString:"anton",
		authorization: null
	};
	$scope.values = {types : [{label: 'User', value: 'user'}, {label: 'Service', value: 'service'}]};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/ss/autocomplete',
			{
				"type": $scope.inputs.type,
				"subType": $scope.inputs.subType,
				"searchString": $scope.inputs.searchString
			},
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceUpdateEmailTemplateTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		updateOptions: 
'{"instanceId":"3","updatedData":[{"emailTypeID":"10","languages":[{"body":"\\t\\t\\t\\t<!DOCTYPE HTML>\\n<html>\\n <head>\\n <title>Your password was successfully reset./</title>\\n<style>\\n\\t.TitleTable\\n{\\n\\t\\tfont-family: arial;\\n\\t\\tfont-size: 11pt;\\n\\t\\twidth: 4bpx;\\n\\t}\\n\\n\\n\\t\\n\\t.TitleText\\n{\\n\\t\\tfont-family: Ford Antenna Light;\\n\\t\\tfont-size: 22pt;\\n\\t\\tcolor: #3E5A67;\\n\\t}\\n\\n\\n\\t\\n\\t.TitleNotificationText\\n{\\n\\t\\tfont-size: 14pt;\\n\\t\\tcolor: #4E9A06;\\n\\t}\\n\\n\\n\\t\\n\\t.InformationTable\\n{\\n\\t\\tfont-family: arial;\\n\\t\\tfont-size: 11pt;\\n\\t\\twidth: 483px;\\n\\t}\\n\\n\\n\\t\\n\\t.InformationTable td\\n{\\n\\t\\tvertical-align: top;\\n\\t}\\n\\n\\n\\t\\n\\t.InformationTable span\\n{\\n\\t\\tcolor: #3E5A67;\\n\\t}\\n\\n\\n </style>\\n </head>\\n<body>\\n \\n<table class=\\\"TitleTable\\\">\\n <tr>\\n <td><span class=\\\"TitleText\\\">Ford | Account Management</span>\\n <br><br>\\n <span class=\\\"TitleNotificationText\\\"><b>Notification:</b> You successfully reset your password!</span><br>\\n </td>\\n </tr>\\n <tr><td><br></td></tr>\\n</table>\\n\\n<table class=\\\"InformationTable\\\">\\n <tr>\\n <td><b>What:</b></td>\\n <td>The password for <span>$username</span>has been successfully reset at <a href=\\\"https://accountdev.ford.com\\\">accountdev.ford.com</a>.</td>\\n </tr>\\n\\n <tr><td colspan=2><br></td></tr>\\n\\n <tr>\\n <td><b>Action:</b></td>\\n <td>If you did not make this change or if you believe an unauthorized person has accessed your account, contact the Support Center immediately to report the incident.\\n\\n<br><br>If you are on a computer or mobile device connected to the Ford network using your old password,please ensure you logout and provide your updated password.\\n\\n<br><br>If you need additional help, please contact the Support Center.\\n </td>\\n </tr>\\n<tr><td colspan=2><br></td></tr>\\n <tr>\\n <td><b>Help:</b></td>\\n <td><b>North American Support Center</b><br>\\n Internal 74957,External 1-313-31-74957 or 1-888-31-74957 FREE</td>\\n </tr>\\n</table>\\n</body>\\n</html>","langCode":"en-us","replyTo":"noreply@lighthousecs.com","subject":"Reminder: One of your employees has pending approval records."}]}]}',
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/ss/updateEmailTemplate',
				$scope.inputs.updateOptions,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceUpdateAttributeElementsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		updateOptionsJson: 
'{"instanceId":"3","data":{"formSections":[{"header":"PERSONAL INFORMATION 1","sectionLabel":"PERSONAL INFORMATION 2","subHeader":"Personal Information subhdr 3","items":[{"authorization":"","children":[],"editable":"true","fieldName":"uid","fieldType":"text","initialValue":"","label":"User Names","mapping":"uid","masked":"false","match":"false","more":"unique user name","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"userPassword","fieldType":"text","initialValue":"","label":"Password","mapping":"userPassword","masked":"true","match":"false","more":"Save this tooltip abc","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"givenName","fieldType":"text","initialValue":"","label":"First Name","mapping":"givenName","masked":"false","match":"false","more":"White space, upper, and lower case characters are allowed","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"sn","fieldType":"text","initialValue":"","label":"Last Name","mapping":"sn","masked":"false","match":"false","more":"White space, upper, and lower case characters are allowed","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"homePhone","fieldType":"text","initialValue":"","label":"Home Phone Number","mapping":"homePhone","masked":"false","match":"false","more":"","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"mobile","fieldType":"text","initialValue":"","label":"Mobile Phone","mapping":"mobile","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"homeFax","fieldType":"text","initialValue":"","label":"Home Fax Number","mapping":"homeFax","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"homePostalAddress","fieldType":"text","initialValue":"","label":"Street Address","mapping":"homePostalAddress","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[{"checked":false,"fieldType":"option","label":"Las Vegas","value":"vegas"},{"checked":false,"fieldType":"option","label":"Henderson","value":"henderson"},{"checked":false,"fieldType":"option","label":"Reno","value":"reno"},{"checked":false,"fieldType":"option","label":"North Las Vegas","value":"northVegas"},{"checked":false,"fieldType":"option","label":"Sparks","value":"sparks"},{"checked":false,"fieldType":"option","label":"Carson City","value":"carsonCity"}],"editable":"true","fieldName":"l","fieldType":"select","initialValue":"","label":"City","mapping":"l","masked":"false","match":"false","more":"Your City","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[{"checked":false,"fieldType":"option","label":"Alabama","value":"AL"},{"checked":false,"fieldType":"option","label":"Alaska","value":"AK"},{"checked":false,"fieldType":"option","label":"Arizona","value":"AZ"},{"checked":false,"fieldType":"option","label":"Arkansas","value":"AR"},{"checked":false,"fieldType":"option","label":"California","value":"CA"},{"checked":false,"fieldType":"option","label":"Colorado","value":"CO"},{"checked":false,"fieldType":"option","label":"Connecticut","value":"CT"},{"checked":false,"fieldType":"option","label":"Delaware","value":"DE"},{"checked":false,"fieldType":"option","label":"District Of Columbia","value":"DC"},{"checked":false,"fieldType":"option","label":"Florida","value":"FL"},{"checked":false,"fieldType":"option","label":"Georgia","value":"GA"},{"checked":false,"fieldType":"option","label":"Hawaii","value":"HI"},{"checked":false,"fieldType":"option","label":"Idaho","value":"ID"},{"checked":false,"fieldType":"option","label":"Illinois","value":"IL"},{"checked":false,"fieldType":"option","label":"Indiana","value":"IN"},{"checked":false,"fieldType":"option","label":"Iowa","value":"IA"},{"checked":false,"fieldType":"option","label":"Kansas","value":"KS"},{"checked":false,"fieldType":"option","label":"Kentucky","value":"KY"},{"checked":false,"fieldType":"option","label":"Louisiana","value":"LA"},{"checked":false,"fieldType":"option","label":"Maine","value":"ME"},{"checked":false,"fieldType":"option","label":"Maryland","value":"MD"},{"checked":false,"fieldType":"option","label":"Massachusetts","value":"MA"},{"checked":false,"fieldType":"option","label":"Michigan","value":"MI"},{"checked":false,"fieldType":"option","label":"Minnesota","value":"MN"},{"checked":false,"fieldType":"option","label":"Mississippi","value":"MS"},{"checked":false,"fieldType":"option","label":"Missouri","value":"MO"},{"checked":false,"fieldType":"option","label":"Montana","value":"MT"},{"checked":false,"fieldType":"option","label":"Nebraska","value":"NE"},{"checked":false,"fieldType":"option","label":"Nevada","value":"NV"},{"checked":false,"fieldType":"option","label":"New Hampshire","value":"NH"},{"checked":false,"fieldType":"option","label":"New Jersey","value":"NJ"},{"checked":false,"fieldType":"option","label":"New Mexico","value":"NM"},{"checked":false,"fieldType":"option","label":"New York","value":"NY"},{"checked":false,"fieldType":"option","label":"North Carolina","value":"NC"},{"checked":false,"fieldType":"option","label":"North Dakota","value":"ND"},{"checked":false,"fieldType":"option","label":"Ohio","value":"OH"},{"checked":false,"fieldType":"option","label":"Oklahoma","value":"OK"},{"checked":false,"fieldType":"option","label":"Oregon","value":"OR"},{"checked":false,"fieldType":"option","label":"Pennsylvania","value":"PA"},{"checked":false,"fieldType":"option","label":"Rhode Island","value":"RI"},{"checked":false,"fieldType":"option","label":"South Carolina","value":"SC"},{"checked":false,"fieldType":"option","label":"South Dakota","value":"SD"},{"checked":false,"fieldType":"option","label":"Tennessee","value":"TN"},{"checked":false,"fieldType":"option","label":"Texas","value":"TX"},{"checked":false,"fieldType":"option","label":"Utah","value":"UT"},{"checked":false,"fieldType":"option","label":"Vermont","value":"VT"},{"checked":false,"fieldType":"option","label":"Virginia","value":"VA"},{"checked":false,"fieldType":"option","label":"Washington","value":"WA"},{"checked":false,"fieldType":"option","label":"West Virginia","value":"WV"},{"checked":false,"fieldType":"option","label":"Wisconsin","value":"WI"},{"checked":false,"fieldType":"option","label":"Wyoming","value":"WY"}],"editable":"true","fieldName":"st","fieldType":"select","initialValue":"","label":"State","mapping":"st","masked":"false","match":"false","more":"Your Home State","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[{"checked":false,"fieldType":"option","label":"United States","value":"usa"},{"checked":false,"fieldType":"option","label":"Canada","value":"ca"},{"checked":false,"fieldType":"option","label":"Mexico","value":"mex"}],"editable":"true","fieldName":"c","fieldType":"select","initialValue":"","label":"Country","mapping":"c","masked":"false","match":"false","more":"Your Home Country","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"employeeNumber","fieldType":"text","initialValue":"","label":"Account Number","mapping":"employeeNumber","masked":"false","match":"false","more":"Enter your account number","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"mail","fieldType":"text","initialValue":"","label":"E-mail","mapping":"mail","masked":"false","match":"false","more":"","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"title","fieldType":"text","initialValue":"","label":"Title","mapping":"title","masked":"false","match":"false","more":"","required":"true","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"organizationalStatus","fieldType":"textarea","initialValue":"placeholder","label":"Job Description","mapping":"organizationalStatus","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"telephoneNumber","fieldType":"text","initialValue":"","label":"Office Phone Number","mapping":"telephoneNumber","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"pager","fieldType":"text","initialValue":"","label":"Pager","mapping":"pager","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[{"checked":false,"fieldType":"option","label":"Accounting","value":"accounting"},{"checked":false,"fieldType":"option","label":"Human Resources","value":"hr"},{"checked":false,"fieldType":"option","label":"Research & Development","value":"r_and_d"}],"editable":"true","fieldName":"businessCategory","fieldType":"select","initialValue":"","label":"Business Area","mapping":"businessCategory","masked":"false","match":"false","more":"Business Dept.","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"false","fieldName":"displayName","fieldType":"text","initialValue":"Steve Test","label":"Display Name","mapping":"displayName","masked":"false","match":"false","more":"Steve test display name","required":"false","idv":{"use":"false"},"validationList":[],"value":"Steve Test Display Name"}]},{"header":"Business test bt 4","sectionLabel":"Business Information 5","subHeader":"Information about your job subhdr 6","items":[{"authorization":"","children":[],"editable":"true","fieldName":"accountHint","fieldType":"text","initialValue":"","label":"Account Hint","mapping":"accountHint","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""}]},{"header":"hello","sectionLabel":"Other 88","subHeader":"section subheading test 123 99","items":[{"authorization":"","children":[{"checked":false,"fieldType":"option","label":"Contractor","value":"contractor"},{"checked":false,"fieldType":"option","label":"Full-Time","value":"fulltime"},{"checked":false,"fieldType":"option","label":"Part-Time","value":"parttime"}],"editable":"true","fieldName":"employeeType","fieldType":"radio","initialValue":"","label":"Employee Type","mapping":"employeeType","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""},{"authorization":"","children":[],"editable":"true","fieldName":"description","fieldType":"text","initialValue":"","label":"Desc","mapping":"description","masked":"false","match":"false","more":"","required":"false","idv":{"use":"false"},"validationList":[],"value":""}]}]},"appType":"newUser"}',  
		authorization: null
	};
	
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/ss/updateAttributeElements',
				$scope.inputs.updateOptionsJson,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetApplicationRoleTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		roleUuid: null,
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getApplicationRole',
			{
				"params": {roleUuid: $scope.inputs.roleUuid}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetAppTextKeysTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		instanceId: 3,
		langCode: null,
		appType: null,
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getAppTextKeys',
			{
				"params": {
					instanceId: $scope.inputs.instanceId,
					langCode: $scope.inputs.langCode,
					appType: $scope.inputs.appType
				}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetEmailTemplateTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		instanceId: 3,
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getEmailTemplate',
			{
				"params": {instanceId: $scope.inputs.instanceId}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetPasswordResetTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		instanceId: 3,
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getPasswordReset',
			{
				"params": {instanceId: $scope.inputs.instanceId}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetPasswordResetOptionsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getPasswordResetOptions',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetPortalOptionsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getPortalOptions',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetSelfRegistrationOptionsTestController', ['$scope', '$http', '$sce', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getSelfRegistrationOptions',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceGetUsernameRecoverOptionsTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/getUsernameRecoveryOptions',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceInitAppManagementSetupTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/initAppManagementSetup',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceInitGmaTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/ss/initGma',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWSelfServiceUploadBrandingFileTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', 'formDataObject', function($scope, $http, $sce, $interval, oauth, formDataObject) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null,
		fileId: 11
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http({
			method: 'post',
			url: '/GAW/ss/uploadBrandingFile',
			data: {
				file: $scope.inputs.file
			},
			params: {
				"fileId": $scope.inputs.fileId
			}, 
			headers: {
				"Authorization": "Bearer " + $scope.inputs.authorization,
				"Content-Type": undefined
			},
			transformRequest: formDataObject
		}).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}])
.directive('fileInput', function($parse) {
	return {
		restrict: "EA",
        template: "<input type='file' />",
        replace: true,         
        link: function (scope, element, attrs) {
 
            var modelGet = $parse(attrs.fileInput);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);
 
            var updateModel = function () {
                scope.$apply(function () {
                    modelSet(scope, element[0].files[0]);
                    onChange(scope);
                });                   
            };
             
            element.bind('change', updateModel);
        }
	};
});

gmaApiControllers.controller('GAWServicesGetAllServiceNamesTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		}, 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/services/names',
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWServicesGetDataTablesTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		jsonSource: '{"draw":5,"columns":[{"data":0,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":1,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":2,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}}],"order":[{"column":1,"dir":"asc"}],"start":0,"length":10,"search":{"value":"steveservi","regex":true},"limitFilter":"","language":"en-us"}', 
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/gmaServices/getServicesDataTables',
			$scope.inputs.jsonSource,
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}

		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWStatusGetStatusTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/status', 
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWUsersGetUserTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		username: 'antonEmployee1',
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/users/' + $scope.inputs.username, 
			{
				"params": {"gma_allAttrs": $scope.inputs.gmaAllAttrs}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);

gmaApiControllers.controller('GAWUsersValidatePasswordTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		uuid: 'd0d3bb12-0174-4f74-b4b4-a0b355f33e98',
		password: 'mypwd',
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/users/' + $scope.inputs.uuid + '/checkPassword', 
			'password=' + $scope.inputs.password, 
			{
				"params": {}, 
				"headers": {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);
gmaApiControllers.controller('GAWUsersKbaCheckAnswerTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		uuid: '61955e9d-71b9-4117-a7db-89de9c45b014',
		//questionNumber: '16',
		answer: 'star',
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/GAW/users/' + $scope.inputs.uuid + '/kba/checkAnswer', 
			{},
			{
				"params": {questionNumber: $scope.inputs.questionNumber, answer : $scope.inputs.answer }, 
				"headers": {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": "Bearer " + $scope.inputs.authorization
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);
gmaApiControllers.controller('GAWVerificationTokenGetTokenTypesTestController', ['$scope', '$http', '$sce', '$interval', 'oauth', function($scope, $http, $sce, $interval, oauth) {
	$scope.inputs = {
		client: {
			abbrev: 'DEMO1',
			id: 'lsggateway-gma-00a2db90-2c6c-11e3-8224-0800200c9a66',
			secret: 'secret-00a2db90-2c6c-11e3-8224-0800200c9a66'
		},
		authorization: null
	};
	$scope.testing = {success: false, called: false, running: false, secsLeft: 0, authorizationExpires: new Date()};

	var timer = $interval(function() {
		$scope.testing.secsLeft = Math.max(0, Math.floor(($scope.testing.authorizationExpires.getTime() - new Date().getTime())/1000));
	}, 1000);
	$scope.$on('$destroy', function() {
		$interval.cancel(timer);
	});
	$scope.authorize = function() {
		oauth($scope.inputs.client.abbrev, $scope.inputs.client.id, $scope.inputs.client.secret, function(data) {
			$scope.inputs.authorization = data.access_token;
			$scope.testing.authorizationExpires = new Date(new Date().getTime() + data.expires_in * 1000);
		});
	};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/GAW/verificationToken/tokenTypes', 
			{
				"params": {}, 
				"headers": {
					"Authorization": "Bearer " + $scope.inputs.authorization,
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime), authorizationExpires: $scope.testing.authorizationExpires, secsLeft: $scope.testing.secsLeft};
		});
	};
}]);