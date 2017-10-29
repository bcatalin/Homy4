

/*************************************************
* Controller: OneDeviceDthCtrl- 
*
*
/*************************************************/

mainAppModule.controller('OneDeviceDthCtrl', function($scope, $stateParams,  MyService, MyLocalStorage) {
  //console.log("=====> OneDeviceDthCtrl"); console.log($stateParams);
  
  $scope.iot_device_name = $stateParams.iot_device_type;
  
  //new
  $scope.device_name = $stateParams.iot_device_name; //parameters that arrived 
  $scope.type        = "dth";//$stateParams.iot_device_type;


 $scope.doRefresh = function() 
 {    
   //console.log('OneDeviceDthCtrl->Refreshing!');    
   $scope.my_dev = MyService.getOneDevice($scope.device_name, $scope.type);
   $scope.my_device_info = MyService.getDeviceInfo($scope.device_name);//, $scope.type);
   //$scope.my_cronrecord_info = MyService.getDeviceInfoCron($scope.device_name, $scope.type);//, $scope.type);
   
   //console.log($scope.my_device_info);
      //Stop the ion-refresher from spinning
   //console.log("DEV:"+$scope.device_name+" type:"+$scope.type);
   $scope.$broadcast('scroll.refreshComplete');
   //send an identify message, that will trigger a LED to blink fast for 10 seconds" 
   //mqtt_publish('/62/device/command/identify', '{"device_name":"'+$scope.device_name+'", "type":"'+$scope.type+'", "identify":1}');
  
   if($scope.type == "dth")
    {
	   //console.log("OneDeviceCtrl----DTH!!!!!!!!!!!!!!!!!!!!");
	   $scope.hideSensor = false;
	   //console.log($scope.my_dev[0]);
	   $scope.dth=[];
       var dth_obj={};
       dth_obj.temperature = $scope.my_dev[0].temperature;
       dth_obj.humidity    = $scope.my_dev[0].humidity;
       $scope.dth.push(dth_obj);
    }
  
 }//doRefresh
   
 $scope.doRefresh(); //invoke do Refresh method normaly 
/*   
 $scope.edit = function (item)
 {
	   if(item !== $scope.device_name)
	   {
		   //update local storage with item for device_name
		   var my_obj = {
               device_name: $scope.device_name,
               device_alias: item
            };
		   MyLocalStorage.setObject('dev_alias', my_obj);
	   }
  }
*/   
});
