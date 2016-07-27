var lsgApp = angular.module('lsgApp', ['ngRoute', 'ssControllers', 'gmaControllers', 'gmaApiControllers', 'lsgServices']);


lsgApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/gawAttributesListAttributes', {
			templateUrl: 'templates/GAW/GAWAttributesListAttributes.html',
			controller: 'GAWAttributesListAttributesTestController'
		}).
		when('/gawAttributesCreateAttribute', {
			templateUrl: 'templates/GAW/GAWAttributesCreateAttribute.html',
			controller: 'GAWAttributesCreateAttributeTestController'
		}).
		when('/gawAttributesRemoveAttribute', {
			templateUrl: 'templates/GAW/GAWAttributesRemoveAttribute.html',
			controller: 'GAWAttributesRemoveAttributeTestController'
		}).
		when('/gawInitGma', {
			templateUrl: 'templates/GAW/GAWInitGma.html',
			controller: 'GAWInitGmaTestController'
		}).
		when('/gawKeysGetPersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysGetPersonalCert.html',
			controller: 'GAWKeysGetPersonalCertTestController'
		}).
		when('/gawKeysExportPersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysExportPersonalCert.html',
			controller: 'GAWKeysExportPersonalCertTestController'
		}).
		when('/gawKeysListPersonalCerts', {
			templateUrl: 'templates/GAW/GAWKeysListPersonalCerts.html',
			controller: 'GAWKeysListPersonalCertsTestController'
		}).
		when('/gawKeysCreatePersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysCreatePersonalCert.html',
			controller: 'GAWKeysCreatePersonalCertTestController'
		}).
		when('/gawKeysReplacePersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysReplacePersonalCert.html',
			controller: 'GAWKeysReplacePersonalCertTestController'
		}).
		when('/gawKeysRemovePersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysRemovePersonalCert.html',
			controller: 'GAWKeysRemovePersonalCertTestController'
		}).
		when('/gawKeysUpdatePersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysUpdatePersonalCert.html',
			controller: 'GAWKeysUpdatePersonalCertTestController'
		}).
		when('/gawKeysSearchPersonalCert', {
			templateUrl: 'templates/GAW/GAWKeysSearchPersonalCert.html',
			controller: 'GAWKeysSearchPersonalCertTestController'
		}).
		when('/gawKeysListSignerCerts', {
			templateUrl: 'templates/GAW/GAWKeysListSignerCerts.html',
			controller: 'GAWKeysListSignerCertsTestController'
		}).
		when('/gawKeysCreateSignerCert', {
			templateUrl: 'templates/GAW/GAWKeysCreateSignerCert.html',
			controller: 'GAWKeysCreateSignerCertTestController'
		}).
		when('/gawKeysRemoveSignerCert', {
			templateUrl: 'templates/GAW/GAWKeysRemoveSignerCert.html',
			controller: 'GAWKeysRemoveSignerCertTestController'
		}).
		when('/gawKeysSearchSignerCert', {
			templateUrl: 'templates/GAW/GAWKeysSearchSignerCert.html',
			controller: 'GAWKeysSearchSignerCertTestController'
		}).
		when('/gawConnectionsGetConnection', {
			templateUrl: 'templates/GAW/GAWConnectionsGetConnection.html',
			controller: 'GAWConnectionsGetConnectionTestController'
		}).
		when('/gawConnectionsListConnections', {
			templateUrl: 'templates/GAW/GAWConnectionsListConnections.html',
			controller: 'GAWConnectionsListConnectionsTestController'
		}).
		when('/gawConnectionsCreateConnection', {
			templateUrl: 'templates/GAW/GAWConnectionsCreateConnection.html',
			controller: 'GAWConnectionsCreateConnectionController'
		}).
		when('/gawConnectionsUpdateConnection', {
			templateUrl: 'templates/GAW/GAWConnectionsUpdateConnection.html',
			controller: 'GAWConnectionsUpdateConnectionTestController'
		}).
		when('/gawConnectionsRemoveConnection', {
			templateUrl: 'templates/GAW/GAWConnectionsRemoveConnection.html',
			controller: 'GAWConnectionsRemoveConnectionTestController'
		}).
		when('/gawConnectionsSearch', {
			templateUrl: 'templates/GAW/GAWConnectionsSearch.html',
			controller: 'GAWConnectionsSearchTestController'
		}).
		when('/gawConnectorsListConnectors', {
			templateUrl: 'templates/GAW/GAWConnectorsListConnectors.html',
			controller: 'GAWConnectorsListConnectorsTestController'
		}).
		when('/gawIdentitiesGetUsersDataTables', {
			templateUrl: 'templates/GAW/GAWIdentitiesGetUsersDataTables.html',
			controller: 'GAWIdentitiesGetUsersDataTablesTestController'
		}).
		when('/gawIdentitiesAddUser', {
			templateUrl: 'templates/GAW/GAW_Identities_AddUser.html',
			controller: 'GAWIdentitiesAddUserTestController'
		}).
		when('/gawKbaGetKba', {
			templateUrl: 'templates/GAW/GAWKbaGetKba.html',
			controller: 'GAWKbaGetKbaTestController'
		}).
		when('/gawKbaCheckAnswer', {
			templateUrl: 'templates/GAW/GAWKbaCheckAnswer.html',
			controller: 'GAWUsersKbaCheckAnswerTestController'
		}).
		when('/gawSelfServiceAutocomplete', {
			templateUrl: 'templates/GAW/GAWSelfServiceAutocomplete.html',
			controller: 'GAWSelfServiceAutocompleteTestController'
		}).
		when('/gawSelfServiceGetApplicationRole', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetApplicationRole.html',
			controller: 'GAWSelfServiceGetApplicationRoleTestController'
		}).
		when('/gawSelfServiceGetAppTextKeys', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetAppTextKeys.html',
			controller: 'GAWSelfServiceGetAppTextKeysTestController'
		}).
		when('/gawSelfServiceGetEmailTemplate', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetEmailTemplate.html',
			controller: 'GAWSelfServiceGetEmailTemplateTestController'
		}).
		when('/gawSelfServiceGetSelfRegistrationOptions', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetSelfRegistrationOptions.html',
			controller: 'GAWSelfServiceGetSelfRegistrationOptionsTestController'
		}).
		when('/gawSelfServiceGetPasswordReset', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetPasswordReset.html',
			controller: 'GAWSelfServiceGetPasswordResetTestController'
		}).
		when('/gawSelfServiceGetPasswordResetOptions', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetPasswordResetOptions.html',
			controller: 'GAWSelfServiceGetPasswordResetOptionsTestController'
		}).
		when('/gawSelfServiceGetPortalOptions', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetPortalOptions.html',
			controller: 'GAWSelfServiceGetPortalOptionsTestController'
		}).
		when('/gawSelfServiceGetUsernameRecoverOptions', {
			templateUrl: 'templates/GAW/GAWSelfServiceGetUsernameRecoverOptions.html',
			controller: 'GAWSelfServiceGetUsernameRecoverOptionsTestController'
		}).
		when('/gawSelfServiceInitAppManagementSetup', {
			templateUrl: 'templates/GAW/GAWSelfServiceInitAppManagementSetup.html',
			controller: 'GAWSelfServiceInitAppManagementSetupTestController'
		}).
		when('/gawSelfServiceInitGma', {
			templateUrl: 'templates/GAW/GAWSelfServiceInitGma.html',
			controller: 'GAWSelfServiceInitGmaTestController'
		}).
		when('/gawSelfServiceUploadBrandingFile', {
			templateUrl: 'templates/GAW/GAWSelfServiceUploadBrandingFile.html',
			controller: 'GAWSelfServiceUploadBrandingFileTestController'
		}).
		when('/gawServicesGetAllServiceNames', {
			templateUrl: 'templates/GAW/GAWServicesGetAllServiceNames.html',
			controller: 'GAWServicesGetAllServiceNamesTestController'
		}).
		when('/gawServicesGetDataTables', {
			templateUrl: 'templates/GAW/GAWServicesGetDataTables.html',
			controller: 'GAWServicesGetDataTablesTestController'
		}).
		when('/gawStatusGetStatus', {
			templateUrl: 'templates/GAW/GAWStatusGetStatus.html',
			controller: 'GAWStatusGetStatusTestController'
		}).
		when('/gawSelfServiceUpdateEmailTemplate', {
			templateUrl: 'templates/GAW/GAWSelfServiceUpdateEmailTemplate.html',
			controller: 'GAWSelfServiceUpdateEmailTemplateTestController'
		}).
		when('/gawSelfServiceUpdateAttributeElements', {
			templateUrl: 'templates/GAW/GAWSelfServiceUpdateAttributeElements.html',
			controller: 'GAWSelfServiceUpdateAttributeElementsTestController'
		}).
		when('/gawUsersGetUser', {
			templateUrl: 'templates/GAW/GAWUsersGetUser.html',
			controller: 'GAWUsersGetUserTestController'
		}).
		when('/gawUserValidatePassword', {
			templateUrl: 'templates/GAW/GAWUsersValidatePassword.html',
			controller: 'GAWUsersValidatePasswordTestController'
		}).
		when('/gawVerificationTokenGetTokenTypes', {
			templateUrl: 'templates/GAW/GAWVerificationTokenGetTokenTypes.html',
			controller: 'GAWVerificationTokenGetTokenTypesTestController'
		}). 
		when('/gawJunctionMgmtGetAllWebApps', {
			templateUrl: 'templates/GAW/GAW_JM_GetAllWebApps.html',
			controller: 'GAW_JM_GetAllWebAppsTestController'
		}).
		when('/gawJunctionMgmtGetWebApp', {
			templateUrl: 'templates/GAW/GAW_JM_GetWebApp.html',
			controller: 'GAW_JM_GetWebApplicationTestController'
		}).
		when('/gawJunctionMgmtCreateWebApplication', {
			templateUrl: 'templates/GAW/GAW_JM_CreateWebApplication.html',
			controller: 'GAW_JM_CreateWebApplicationTestController'
		}).
		when('/gawJunctionMgmtUpdateWebApplication', {
			templateUrl: 'templates/GAW/GAW_JM_UpdateWebApplication.html',
			controller: 'GAW_JM_UpdateWebApplicationTestController'
		}).
		when('/gawJunctionMgmtGetProtectedObjectPoliciesList', {
			templateUrl: 'templates/GAW/GAW_JM_GetProtectedObjectPoliciesList.html',
			controller: 'GAW_JM_GetProtectedObjectPoliciesListTestController'
		}).
		when('/gawJunctionMgmtGetProtectedObjectPolicy', {
			templateUrl: 'templates/GAW/GAW_JM_GetProtectedObjectPolicy.html',
			controller: 'GAW_JM_GetProtectedObjectPolicyTestController'
		}).
		when('/gawJunctionMgmtCreateProtectedObjectPolicy', {
			templateUrl: 'templates/GAW/GAW_JM_CreateProtectedObjectPolicy.html',
			controller: 'GAW_JM_CreatePOPTestController'
		}).
		when('/gawJunctionMgmtUpdateProtectedObjectPolicy', {
			templateUrl: 'templates/GAW/GAW_JM_UpdateProtectedObjectPolicy.html',
			controller: 'GAW_JM_UpdatePOPTestController'
		}).
		when('/gawJunctionMgmtDeleteProtectedObjectPolicy', {
			templateUrl: 'templates/GAW/GAW_JM_DeleteProtectedObjectPolicy.html',
			controller: 'GAW_JM_DeletePOPTestController'
		}).
		when('/gawJunctionMgmtGetACLList', {
			templateUrl: 'templates/GAW/GAW_JM_GetACLList.html',
			controller: 'GAW_JM_GetACLListTestController'
		}).
		when('/gawJunctionMgmtGetACL', {
			templateUrl: 'templates/GAW/GAW_JM_GetACL.html',
			controller: 'GAW_JM_GetACLTestController'
		}).
		when('/gawJunctionMgmtCreateACL', {
			templateUrl: 'templates/GAW/GAW_JM_CreateACL.html',
			controller: 'GAW_JM_CreateACLTestController'
		}).
		when('/gawJunctionMgmtUpdateACL', {
			templateUrl: 'templates/GAW/GAW_JM_UpdateACL.html',
			controller: 'GAW_JM_UpdateACLTestController'
		}).
		when('/gawJunctionMgmtDeleteACL', {
			templateUrl: 'templates/GAW/GAW_JM_DeleteACL.html',
			controller: 'GAW_JM_DeleteACLTestController'
		}).
		when('/gawGmaServicesAddService', {
			templateUrl: 'templates/GAW/GAW_GmaServices_AddService.html',
			controller: 'GAW_GmaServices_AddServiceTestController'
		}).
		when('/gawAddAccount', {
			templateUrl: 'templates/GAW/GAW_AddAccount.html',
			controller: 'GAW_AddAccountTestController'
		}).
		when('/gmaGmaAuthGetToken', {
			templateUrl: 'templates/GW/GWGmaAuthGetToken.html',
			controller: 'GWGmaAuthGetTokenTestController'
		}).
		when('/ssDemoteAccount', {
			templateUrl: 'templates/SSW/SSDemoteAccount.html',
			controller: 'SSDemoteAccountTestController'
		}).
		when('/ssGetPreferences', {
			templateUrl: 'templates/SSW/SSGetPreferences.html',
			controller: 'SSGetPreferencesTestController'
		}).
		when('/ssGetRoles', {
			templateUrl: 'templates/SSW/SSGetRoles.html',
			controller: 'SSGetRolesTestController'
		}).
		when('/ssGetTextKeys', {
			templateUrl: 'templates/SSW/SSGetTextKeys.html',
			controller: 'SSGetTextKeysTestController'
		}).
		when('/ssGetProfile', {
			templateUrl: 'templates/SSW/SSGetProfile.html',
			controller: 'SSGetProfileController'
		}).
		when('/ssGetServicesDataTables', {
			templateUrl: 'templates/SSW/SSGetServicesDataTables.html',
			controller: 'SSGetServicesDataTablesTestController'
		}).
		when('/ssProcessRequests', {
			templateUrl: 'templates/SSW/SSProcessRequests.html',
			controller: 'SSProcessRequestsTestController'
		}).
		when('/ssGetRequestsDataTables', {
			templateUrl: 'templates/SSW/SSGetRequestsDataTables.html',
			controller: 'SSGetRequestsDataTablesTestController'
		}).
		when('/ssAddNewUser', {
			templateUrl: 'templates/SSW/SSAddNewUser.html',
			controller: 'SSAddNewUserController'
		}).
		when('/ssUpdateProfile', {
			templateUrl: 'templates/SSW/SSUpdateProfile.html',
			controller: 'SSUpdateProfileController'
		}).
		when('/ssGetServiceDetails', {
			templateUrl: 'templates/SSW/SSGetServiceDetails.html',
			controller: 'SSGetServiceDetailsTestController'
		}).
		when('/ssInitGateway', {
			templateUrl: 'templates/SSW/SSInitGateway.html',
			controller: 'SSInitGatewayTestController'
		}).
		when('/ssSearch', {
			templateUrl: 'templates/SSW/SSSearch.html',
			controller: 'SSSearchTestController'
		}).
		when('/ssAutocomplete', {
			templateUrl: 'templates/SSW/SSAutocomplete.html',
			controller: 'SSAutocompleteController'
		}).
		when('/ssUnauthInitSelfRegistration', {
			templateUrl: 'templates/SSW/SSUnauthInitSelfRegistration.html',
			controller: 'SSUnauthInitSelfRegistrationTestController'
		}).
		when('/ssUnauthInitPasswordReset', {
			templateUrl: 'templates/SSW/SSUnauthInitPasswordReset.html',
			controller: 'SSUnauthInitPasswordResetTestController'
		}).
		when('/ssUnauthSubmitRegistration', {
			templateUrl: 'templates/SSW/SSUnauthSubmitRegistration.html',
			controller: 'SSUnauthSubmitRegistrationTestController'
		}).
		when('/ssUnauthGetUsername', {
			templateUrl: 'templates/SSW/SSUnauthGetUsername.html',
			controller: 'SSUnauthGetUsernameTestController'
		}).
		when('/ssUnauthUpdatePassword', {
			templateUrl: 'templates/SSW/SSUnauthUpdatePassword.html',
			controller: 'SSUnauthUpdatePasswordTestController'
		}).
		when('/ssUnauthResetPasswordValidation', {
			templateUrl: 'templates/SSW/SSUnauthResetPasswordValidation.html',
			controller: 'SSUnauthResetPasswordValidationTestController'
		}).
		when('/unimplemented', {
			templateUrl: 'templates/unimplemented.html'
		}).
		otherwise({
			redirectTo: '/ssInitGateway'
		});
}]);