

var app = angular.module('AppModule', ['ui.router']);

/*app.service('Form', function() {

})*/

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: '../views/outside.html'
  })
  .state('outside.form', {
    url: '/form',
    templateUrl: '../views/form.html'
  })
  .state('outside.output', {
    url: '/output',
    templateUrl: '../views/output.html',
    controller: 'OutputCtrl',
    data: function(stateParams) { return stateParams.data }
  })

  $urlRouterProvider.otherwise('/outside/form');

}]);

app.run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
    var state = next.name
    if(!state.startsWith('outside.')) {
      event.preventDefault();
      $state.go('outside.form');
    }
  });
});


app.controller('AppCtrl', ['$scope', '$state', function($scope, $state){

	$scope.tiposDeTramite = ['NUEVO EJEMPLAR',
							 'ACTUALIZACION MAYOR',
							 'ACTUALIZACION MENOR',
							 'PASAPORTE']

	$scope.data = {
		numeroBoleta: 1,
		persona : {
			apellido: null,
			nombre: null,
			dni: null,
		},
		fecha: null,
		idTramite: null,
		domicilio: {
			nombreCalle: null,
			numeroCalle: null,
			barrio: null,
			ciudad: null,
			localidad: null,
			provincia: null,
			pais: null,
			codigoPostal: null
		}
	}

  $scope.send = function(){
  	$state.go('outside.output', { data: $scope.data })
	}
  
}])


app.controller('OutputCtrl', function($scope, $state, $stateParams){

	$scope.output = $stateParams.data

})