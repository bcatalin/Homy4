//-------------------------Config---------------------------------------

homyModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html", 
    controller: 'AppCtrl'
  })

  // .state('app.debug', {
  //   url: "/debug",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/debug.html",
  //       controller: 'DebugCtrl'
  //     }
  //   }
  // })
  
  // .state('app.settings', {
  //   url: "/settings",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/settings.html",
  //       controller: "homySettingsCtrl"
  //     }
  //   }
  // })
  
  .state('app.iotdevices', {
      url: "/iotdevices",
      views: {
        'menuContent': {
          templateUrl: "templates/alldevices.html",
          controller: 'AllDevicesCtrl'
        }
      }
    })

  .state('app.sametype', {
    url: "/iotdevices/:iot_device_type",
    views: {
      'menuContent': {
        templateUrl: "templates/sametype.html",
        controller: 'SameTypeCtrl'
      }
    }
  })
   .state('app.onedevicePlug', {    
    url: "/iotdevices/plug/:iot_device_name",
    views: {
      'menuContent': {
        templateUrl: "templates/onedevicePlug.html",
        controller: 'OneDevicePlugCtrl'
      }
    }
  })

   .state('app.onedeviceDth', {    
    url: "/iotdevices/dth/:iot_device_name",
    views: {
      'menuContent': {
        templateUrl: "templates/onedeviceDth.html",
        controller: 'OneDeviceDthCtrl'
      }
    }
  }) 
 
  
   .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
       templateUrl: "templates/about.html"
    }
   }
  }) 
  


  // if none of the above states are matched, use this as the fallback 
  //$urlRouterProvider.otherwise('/app/iotdevices');
  $urlRouterProvider.otherwise('/login');
});
