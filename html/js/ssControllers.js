var lsgControllers = angular.module('ssControllers', []);

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

lsgControllers.controller('SSDemoteAccountTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', groups: 'GatewayHelpDesk', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', foruuid:'ffc4488a-ca83-4e84-8731-a4dfea56b507', language:'en-us'};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});
	$scope.test = function() {
		$scope.testing.running = true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/ss/demoteAccount', 
			{
				"params": {
					"language": $scope.inputs.language,
					"forUserUUID": $scope.inputs.foruuid
				},
				"headers": {
					"X-CSRF-TOKEN": $scope.inputs.token,
					"iv_server_name": $scope.inputs.domain,
					"iv-groups": $scope.inputs.groups,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};		
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);


lsgControllers.controller('SSGetPreferencesTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', groups: 'GatewayHelpDesk', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us'};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});
	$scope.test = function() {
		$scope.testing.running = true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/ss/getPreferences', 
			{
				"params": {"language": $scope.inputs.language},
				"headers": {
					"X-CSRF-TOKEN": $scope.inputs.token,
					"iv_server_name": $scope.inputs.domain,
					"iv-groups": $scope.inputs.groups,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};		
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSGetRolesTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', groups: 'GatewayHelpDesk', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us'};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});
	$scope.test = function() {
		$scope.testing.running = true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/ss/getRoles', 
			{
				"params": {"language": $scope.inputs.language},
				"headers": {
					"X-CSRF-TOKEN": $scope.inputs.token,
					"iv_server_name": $scope.inputs.domain,
					"iv-groups": $scope.inputs.groups,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};		
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSGetTextKeysTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us'};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/ss/getTextKeys', 
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.domain,
					"X-CSRF-TOKEN": $scope.inputs.token,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSGetProfileController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain',groups: 'GatewayHelpDesk', uuid:'6fba7227-abea-4733-9fa0-a83797fbd121', language:'en-us'};
	
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/ss/getProfile/', 
			{
				"params": {"language": $scope.inputs.language, "forUserUUID": $scope.inputs.uuid}, 
				"headers": {
					"iv_server_name": $scope.inputs.domain,
					"iv-groups": $scope.inputs.groups,
					"X-CSRF-TOKEN": $scope.inputs.token,
					"gtwayuuid": $scope.inputs.uuid					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSGetServicesDataTablesTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us'};
	$scope.inputs.sourceJson = '[{"data":0,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":1,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":2,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}}],"order":[{"column":0,"dir":"asc"}],"start":0,"length":10,"search":{"value":"","regex":true},"limitFilter":"","language":"en-us"}';
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		
		$http.post(
			'/SS/rest/ss/getServicesDataTables', 
			$scope.inputs.sourceJson,
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.domain,
					"X-CSRF-TOKEN": $scope.inputs.token,
					"gtwayuuid": $scope.inputs.uuid
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSGetRequestsDataTablesTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', uuid:'3fecfa23-213b-4c89-ba46-c56444185340', language:'en-us', 
			sourceJson: '{"draw":1,"columns":[{"data":0,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":1,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":2,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":3,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":4,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":5,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}},{"data":6,"name":"","searchable":true,"orderable":true,"search":{"value":"","regex":false}}],"order":[{"column":4,"dir":"asc"}],"start":0,"length":10,"search":{"value":"","regex":true},"limitFilter":"","language":"en-us"}' };
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/ss/getRequestsDataTables',
			$scope.inputs.sourceJson,
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.domain,
					"X-CSRF-TOKEN": $scope.inputs.token,
					"gtwayuuid": $scope.inputs.uuid
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSProcessRequestsTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', uuid:'3fecfa23-213b-4c89-ba46-c56444185340', language:'en-us', 
			sourceJson: '[{"id":1927,"approve":true,"comment":""}]' };
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/ss/processRequests',
			$scope.inputs.sourceJson,
			
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.domain,
					"X-CSRF-TOKEN": $scope.inputs.token,
					"gtwayuuid": $scope.inputs.uuid
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);




lsgControllers.controller('SSAutocompleteController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us', 
			type: "user", subType: "gtwayIsManager",searchString:"ant"};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
				'/SS/rest/ss/autocomplete', 
				{
					"type": $scope.inputs.type,
					"subType": $scope.inputs.subType,
					"searchString": $scope.inputs.searchString
					},
				{
					"params": {"language": $scope.inputs.language}, 
					"headers": {
						"X-CSRF-TOKEN": $scope.inputs.token,
						"iv_server_name": $scope.inputs.domain,
						"gtwayuuid": $scope.inputs.uuid
					}
				}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSUpdateProfileController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {iv_groups: 'Default', domain: 'DEMO1_Domain', uuid:'61955e9d-71b9-4117-a7db-89de9c45b014', language:'en-us', 
			updateOptions: '{"forUserUUID":"61955e9d-71b9-4117-a7db-89de9c45b014","profileData":{"userPassword":"Core123"}}' };
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
				'/SS/rest/ss/updateProfile', 
				$scope.inputs.updateOptions,					
				{
					"params": {"language": $scope.inputs.language}, 
					"headers": {
						"X-CSRF-TOKEN": $scope.inputs.token,
						"iv_server_name": $scope.inputs.domain,
						"iv-groups": $scope.inputs.iv_groups,
						"gtwayuuid": $scope.inputs.uuid
					}
				}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSAddNewUserController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {iv_groups: 'Default', domain: 'DEMO1_Domain', uuid:'61955e9d-71b9-4117-a7db-89de9c45b014', language:'en-us', 
			jsonSource: '{"role":"0f1da4f9-cb56-4b98-9f5b-13d8c7889290","profileData":{"uid":"TestSteve1","userPassword":"Core1234","givenName":"Steve2","sn":"test","homePhone":"88.22.222","description":"Montréal","employeeNumber":"1144777","mail":"scorlesk@us.ibm.com"},"kba":[]}' };
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
				'/SS/rest/ss/addNewUser', 
				$scope.inputs.jsonSource,					
				{
					"params": {"language": $scope.inputs.language}, 
					"headers": {
						"X-CSRF-TOKEN": $scope.inputs.token,
						"iv_server_name": $scope.inputs.domain,
						"iv-groups": $scope.inputs.iv_groups,
						"gtwayuuid": $scope.inputs.uuid
					}
				}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);
lsgControllers.controller('SSGetServiceDetailsTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {serverName: 'DEMO1_Domain', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us', serviceName: 'Test2'};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/ss/getServiceDetails', 
			{
				"params": {"language": $scope.inputs.language, "serviceName": $scope.inputs.serviceName}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName,
					"X-CSRF-TOKEN": $scope.inputs.token,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);


lsgControllers.controller('SSUnauthSubmitRegistrationTestController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.inputs = {
			serverName: 'DEMO1_Domain', 
			language:'en-us', 
			sourceJson: '{"alias":"","profileData":{"uid":"stevetester","userPassword":"core1234","givenName":"Steve","sn":"Tester","homePhone":"817.555.1231","st":"TX","c":"usa","employeeNumber":"11133311","mail":"sorlesk@us.ibm.com","title":"Dr"},"kba":[{"questionId":"1","answer":"1935"}]}'
	};
	$scope.testing = {success: false, called: false, running: false};
	

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/unauth/submitRegistration',
			$scope.inputs.sourceJson,
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSUnauthGetUsernameTestController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.inputs = {
			serverName: 'DEMO1_Domain', 
			language:'en-us', 
			sourceJson: '{"data":{"sn":"Tester","mail":"scorlesk@us.ibm.com","uniqueIdentifier":"123456789","employeeNumber":"11223344"}}'
	};
	$scope.testing = {success: false, called: false, running: false};
	

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/unauth/getUsername',
			$scope.inputs.sourceJson,
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSUnauthUpdatePasswordTestController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.inputs = {
			serverName: 'DEMO1_Domain', 
			language:'en-us', 
			sourceJson: '{"profileData":{"userPassword":"core1234"},"kba":[{"questionId":"14","answer":"baseball"}],"username":"stevedefault"}'
	};
	$scope.testing = {success: false, called: false, running: false};
	

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/unauth/updatePassword',
			$scope.inputs.sourceJson,
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSUnauthResetPasswordValidationTestController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.inputs = {
			serverName: 'DEMO1_Domain', 
			language:'en-us', 
			token: '',
			password: '',
			sourceJson: ''
	};
	$scope.testing = {success: false, called: false, running: false};
	

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$scope.inputs.sourceJson = {"data":{"password": $scope.inputs.password},"token": $scope.inputs.token}
		$http.post(
			'/SS/rest/unauth/resetPasswordValidation',
			$scope.inputs.sourceJson,
			{
				"params": {"language": $scope.inputs.language, "token": $scope.inputs.token}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName
					
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSUnauthInitSelfRegistrationTestController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.inputs = {serverName: 'DEMO1_Domain', language:'en-us', alias: ""};
	$scope.testing = {success: false, called: false, running: false};
	

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/unauth/initSelfRegistration/', 
			{
				"params": {"language": $scope.inputs.language, "alias": $scope.inputs.alias}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSUnauthInitPasswordResetTestController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	$scope.inputs = {serverName: 'DEMO1_Domain', language:'en-us', alias: ""};
	$scope.testing = {success: false, called: false, running: false};
	

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/unauth/initPasswordReset/', 
			{
				"params": {"language": $scope.inputs.language, "alias": $scope.inputs.alias}, 
				"headers": {
					"iv_server_name": $scope.inputs.serverName
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);


lsgControllers.controller('SSInitGatewayTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', groups: 'GatewayHelpDesk', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us'};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.get(
			'/SS/rest/ss/initGateway', 
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"X-CSRF-TOKEN": $scope.inputs.token,
					"iv_server_name": $scope.inputs.domain,
					"iv-groups": $scope.inputs.groups,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);

lsgControllers.controller('SSSearchTestController', ['$scope', '$http', '$sce', 'csrfToken', function($scope, $http, $sce, csrfToken) {
	$scope.inputs = {domain: 'DEMO1_Domain', uuid:'7606b7ca-41ae-49dd-bf08-a33a222b65ed', language:'en-us', type: "user", searchString:"anton"};
	$scope.testing = {success: false, called: false, running: false};
	csrfToken(function(token) {
		$scope.inputs.token = token;
	});
	$scope.values = {types : [{label: 'User', value: 'user'}, {label: 'Service', value: 'service'}]};

	$scope.test = function() {
		$scope.testing.running=true;
		$scope.testing.startTime=new Date().getTime();
		$http.post(
			'/SS/rest/ss/search', 
			{
				"searchParameterBean" : {
					"type": $scope.inputs.type,
					"searchString": $scope.inputs.searchString
				}
			},
			{
				"params": {"language": $scope.inputs.language}, 
				"headers": {
					"X-CSRF-TOKEN": $scope.inputs.token,
					"iv_server_name": $scope.inputs.domain,
					"gtwayuuid": $scope.inputs.uuid
				}
			}
		).
		success(function(data, status, headers, config) {
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: true, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		}).
		error(function(data, status, headers, config){
			$scope.testing = {response: $sce.trustAsHtml(syntaxHighlight(JSON.stringify(data, undefined, 4))), success: false, called: true, running: false, time: (new Date().getTime() - $scope.testing.startTime)};
		});
	};
}]);