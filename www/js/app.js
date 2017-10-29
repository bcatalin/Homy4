


var homyModule = angular.module('homy', ['ionic',/*'ngCordova',*/,  'homy.controllers']);


//force the tabs to be shown in the bottom of the page.
homyModule.config(['$ionicConfigProvider', function($ionicConfigProvider) 
{
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
}]);


var connectedToBroker = false;
var broker = "";


homyModule.factory('ListFactory', function() {

  var list = [];
  var listStore = localStorage.getItem("list");
  if (listStore != null && listStore != '' && angular.isArray(angular.fromJson(listStore))) {
    list = angular.fromJson(listStore);
  }
  var listSrv = {
    setList: function(newList) {
      list = newList;
      localStorage.setItem("list", angular.toJson(list)); 
      return true;
    },
    getList: function() {
      if (list != null) {
        return list;
      } else {
        return [];
      }
    }
  };
  return listSrv;
});

//---------------------------Run----------------------------------------
homyModule.run(function($ionicPlatform, $ionicPopup /*, $cordovaSQLite*/ ) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
   
    if(window.Connection) 
    {
      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.alert({
              title: "No internet connection",
              content: "The internet is disconnected on your device."
          })
          .then(function() {
              //if(!result) {
                  ionic.Platform.exitApp();
              //}
          });
      }
    }    
  });
});












