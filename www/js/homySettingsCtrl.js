/*************************************************
* Controller: appSettingsCtrl- 
*
*
/*************************************************/

mainAppModule.controller('homySettingsCtrl', function($scope, $stateParams,/*$timeout,*/ $rootScope, $state, /*$ionicActionSheet, $ionicListDelegate,*/ MyService, MyLocalStorage) 
{
 var _debug = 1;
  if(_debug) 
  { console.log("=====> homySettingsCtrl"); console.log($stateParams); }
  
  $scope.data = {};
   
  //get data from local
  var local_storage_obj = MyLocalStorage.getObject('homySettings'); //MyLocalStorage.getObject(key);
  if(_debug) console.log("Read data from localStorage", local_storage_obj);
  
  if((local_storage_obj.host == "undefined") ||
      (local_storage_obj.port == "undefined"))
  {
	  //nothing to do 
  }
  else
  {
	  $scope.data.host    = local_storage_obj.host; 
	  $scope.data.port    = local_storage_obj.port;
	  $scope.data.user    = local_storage_obj.user;
	  $scope.data.pass    = local_storage_obj.pass;
	  $scope.data.checked = local_storage_obj.checked;
	  
	  
      //cloud
	  $scope.data.cloud_host    = local_storage_obj.cloud_host;
	  $scope.data.cloud_port    = local_storage_obj.cloud_port;
	  $scope.data.cloud_user    = local_storage_obj.cloud_user;
	  $scope.data.cloud_pass    = local_storage_obj.cloud_pass;
	  $scope.data.cloud_checked = local_storage_obj.cloud_checked;
  }

  $scope.save = function()  
  {
        console.log("Save local broker: " + $scope.data.host + " - port: " + $scope.data.port + " ssl:" + $scope.data.checked);
        console.log("Save local broker user: " + $scope.data.user + " - pass: " + $scope.data.pass);
        console.log("Save cloud broker: " + $scope.data.cloud_host + " - port: " + $scope.data.cloud_port + " ssl:" + $scope.data.cloud_checked);
        console.log("Save cloud broker user: " + $scope.data.cloud_user + " - pass: " + $scope.data.cloud_pass );
	    
	    if($scope.data.checked == "undefined")
	      $scope.data.checked = false;
	      
	    if(($scope.data.cloud_checked == "undefined") || ($scope.data.cloud_checked == undefined))
	      $scope.data.cloud_checked = false;
	   
	    var w_my_obj = {};
	    //w_my_obj.host    = $scope.data.host;
	    //w_my_obj.port    = $scope.data.port;   
	    
	    if(($scope.data.host != "") && ($scope.data.port != ""))
	    {
	      w_my_obj.host    = $scope.data.host;	    
	      w_my_obj.port    = $scope.data.port; 
	      w_my_obj.user    = $scope.data.user; 
	      w_my_obj.pass    = $scope.data.pass; 
	      w_my_obj.checked = $scope.data.checked;  
	    }
	    //cloud
	    if(($scope.data.cloud_host != "") && ($scope.data.cloud_port != ""))
	    {
	      w_my_obj.cloud_host    = $scope.data.cloud_host;	    
	      w_my_obj.cloud_port    = $scope.data.cloud_port; 
	      w_my_obj.cloud_user    = $scope.data.cloud_user; 
	      w_my_obj.cloud_pass    = $scope.data.cloud_pass; 
	      w_my_obj.cloud_checked = $scope.data.cloud_checked;  
	    }
	    
	    //if(w_my_obj.checked == undefined)
	     // w_my_obj.checked = false;
	    
	    //if(w_my_obj.cloud_checked == undefined)
	    //  w_my_obj.cloud_checked = false;
	      
	    //w_my_obj.checked = $scope.data.checked;

	    
	    if(_debug) console.log("Write to local storage", w_my_obj);
        //MyLocalStorage.setObject('homySettings', w_my_obj);
        localStorage.setItem('homySettings', JSON.stringify(w_my_obj));
    }
});
