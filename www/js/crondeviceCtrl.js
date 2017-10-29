/*************************************************
* Controller: CronDeviceCtrl- 
*
*
/*************************************************/
mainAppModule.controller('CronDeviceCtrl', function($scope, $stateParams, $ionicPopup, $timeout, MyService, MyLocalStorage) 
{  
  var _debug = 0; 
  if(_debug)
  {
    console.log("=====> CronDeviceCtrl");
    console.log($stateParams);
  }
  //stateParams contain  Object { iot_device_type: "irritool", iot_device_name: "ESP_00222222", cron_index: "1" }
  
  //new
  $scope.device_name = $stateParams.iot_device_name; //parameters that arrived 
  $scope.type        = $stateParams.iot_device_type;
  $scope.cron_index  = $stateParams.cron_index;

  if($stateParams.cron_index == "")
  {
	  $scope.action = 1;// ADD new cron
	  $scope.cron_index = 99;
  }
  else
  {
	  $scope.action = 2; //default action is UPDATE  
  }
 
  $scope.my_cronrecord_info = MyService.getDeviceInfoCronIndex($scope.device_name, $scope.type , $scope.cron_index );
  //verify State checkbox 
  if($scope.my_cronrecord_info.cronrecord.S == 1)
    $scope.my_cronrecord_info.cronrecord.checked = true;
  else  
    $scope.my_cronrecord_info.cronrecord.checked = false;
  
  if($scope.action == 1)//new
  {
	  $scope.my_cronrecord_info.cronrecord.m = "5";
	  $scope.my_cronrecord_info.cronrecord.h = "9";
	  $scope.my_cronrecord_info.cronrecord.dom = "*";
	  $scope.my_cronrecord_info.cronrecord.M = "*";
	  $scope.my_cronrecord_info.cronrecord.dow = "*";
	  $scope.my_cronrecord_info.cronrecord.vid = 0;
	  $scope.my_cronrecord_info.cronrecord.d = 5;
	  $scope.my_cronrecord_info.cronrecord.S = true;
	  $scope.my_cronrecord_info.cronrecord.s = 0;
	  $scope.my_cronrecord_info.cronrecord.checked = true;
  }

/*
 action=0 -- DELETE
 action=1 -- ADD
 action=2 -- UPDATE
 topic = /62/irritool/cron
 $scope.save_cron_data must contain:
 
 {"device_name":"ESP_00A08A78", "type":"irritool", "minute":"30", "hour":"9", "dom":"*", "month":"*", "dow":"*", "valve_id":1, "duration":600, "status":1, "skip":0, "index":0, "action":2 }

 mqtt_publish('/62/irritool/cron', '{"device_name":"'+item.device_name+'", "type":"irritool", "valve_id":'+item.valve_id+' , "run_time":5 }'); 
 mqtt_publish('/62/irritool/cron', '{"device_name":"'+$scope.device_name+'", "type":"'+$scope.type+'", "minute":"'+$scope.my_cronrecord_info.cronrecord.m+'", "hour":"'+$scope.my_cronrecord_info.cronrecord.h+'", "dom":"*", "month":"*", "dow":"*", "valve_id":1, "duration": $scope.my_cronrecord_info.cronrecord.d, "status":1, "skip":0, "index":0, "action": $state.action }'); 
*/  
 
  if(_debug) console.log($scope.my_cronrecord_info); 
 
  $scope.updateStatus = function (item)
  {
	 var _debug = 0;
	 if(_debug) {	  
	  console.log("updateStatus cron status record"); console.log(item);
     }
	  
	  if(item.checked == false)
	  {
	   //$scope.save_cron_data.S = 0;
	    $scope.my_cronrecord_info.cronrecord.S = 0;
	    if(_debug) console.log("OFF");
	  }
	  else if(item.checked == true)
	  {
	    //$scope.save_cron_data.S = 1;
	    if(_debug) console.log("ON");
	    $scope.my_cronrecord_info.cronrecord.S = 1;
      }
 
  }
  
 
    $scope.showAlertFillFields = function() 
    {
      var _debug = 0; 
      if(_debug) console.log("crondeviceCtrl showAlertFillFields");
      
      var alertPopupFillFields = $ionicPopup.alert(
      {
         title: 'Warning',
         template: 'Please fill all fields!'
      });
      
      alertPopupFillFields.then(function(res) {
          if(_debug) console.log('do nothing for now');
      });
    };

    $scope.showAlertCronSaved = function() 
    {
      var _debug = 0; 
      if(_debug) console.log("crondeviceCtrl showAlertCronSaved");
      
      var alertPopupCronSaved = $ionicPopup.alert(
      {
         title: 'Cron data',
         template: 'Your cron data has been saved'
      });
      
      alertPopupCronSaved.then(function(res) {
          if(_debug) console.log('do nothing for now');
      });
    }; 
 
    $scope.doSomething = function ()
    {
	  var _debug = 0;
	  if(_debug)
	  {
	   console.log("doSomething: Multley .....do something !!!!!!!! Hrrrrr!");
	   console.log($scope.my_cronrecord_info);
      }
     
      if($scope.my_cronrecord_info.cronrecord.S == true)
        $scope.my_cronrecord_info.cronrecord.S = 1;
      else
        $scope.my_cronrecord_info.cronrecord.S = 0;  
	 
	  if(($scope.my_cronrecord_info.cronrecord.m == "undefined" )  || ($scope.my_cronrecord_info.cronrecord.h == "undefined") ||
	     ($scope.my_cronrecord_info.cronrecord.dom =="undefined")  || ($scope.my_cronrecord_info.cronrecord.M == "undefined") ||
	     ($scope.my_cronrecord_info.cronrecord.dow == "undefined") || ($scope.my_cronrecord_info.cronrecord.vid == "undefined") ||
	     ($scope.my_cronrecord_info.cronrecord.d == "undefined") || ($scope.my_cronrecord_info.cronrecord.s == "undefined") ||
	     ($scope.cron_index == "undefined") || ($scope.action == "undefined"))
	  {		 
		 $scope.showAlertFillFields();
		 return;
	  }
	  //mqtt_publish('/62/irritool/cron', '{"device_name":"'+$scope.device_name+'", "type":"'+$scope.type+'", "minute":"30", "hour":"9", "dom":"*", "month":"*", "dow":"*", "valve_id":1, "duration":600, "status":1, "skip":0, "index":0, "action": $state.action }'); 
      //var sendObj = {"device_name":$scope.device_name, "type":$scope.type, "minute":$scope.my_cronrecord_info.cronrecord.m, "hour":$scope.my_cronrecord_info.cronrecord.h, "dom":"*", "month":"*", "dow":"*", "valve_id":1, "duration": $scope.my_cronrecord_info.cronrecord.d, "status":1, "skip":0, "index":0, "action": $scope.action };	 
      //console.log(sendObj);
      if($scope.action == 2) //update
      {
         mqtt_publish('/62/irritool/cron', '{"device_name":"'+$scope.device_name+'", "type":"'+$scope.type+'", "minute":"'+$scope.my_cronrecord_info.cronrecord.m+'", "hour":"'+$scope.my_cronrecord_info.cronrecord.h+'", "dom":"'+$scope.my_cronrecord_info.cronrecord.dom+'", "month":"'+$scope.my_cronrecord_info.cronrecord.M+'", "dow":"'+$scope.my_cronrecord_info.cronrecord.dow+'", "valve_id":'+$scope.my_cronrecord_info.cronrecord.vid+', "duration":'+$scope.my_cronrecord_info.cronrecord.d+', "status":'+$scope.my_cronrecord_info.cronrecord.S+', "skip":'+$scope.my_cronrecord_info.cronrecord.s+', "index":'+$scope.cron_index+', "action":'+$scope.action+' }');
      }
      else if($scope.action == 0) //Delete
      {
	 	 mqtt_publish('/62/irritool/cron', '{"device_name":"'+$scope.device_name+'", "type":"'+$scope.type+'", "minute":"'+$scope.my_cronrecord_info.cronrecord.m+'", "hour":"'+$scope.my_cronrecord_info.cronrecord.h+'", "dom":"'+$scope.my_cronrecord_info.cronrecord.dom+'", "month":"'+$scope.my_cronrecord_info.cronrecord.M+'", "dow":"'+$scope.my_cronrecord_info.cronrecord.dow+'", "valve_id":'+$scope.my_cronrecord_info.cronrecord.vid+', "duration":'+$scope.my_cronrecord_info.cronrecord.d+', "status":'+$scope.my_cronrecord_info.cronrecord.S+', "skip":'+$scope.my_cronrecord_info.cronrecord.s+', "index":'+$scope.cron_index+', "action":'+$scope.action+' }');
	  }
	  else if($scope.action == 1) //ADD new cron
	  {
		 mqtt_publish('/62/irritool/cron', '{"device_name":"'+$scope.device_name+'", "type":"'+$scope.type+'", "minute":"'+$scope.my_cronrecord_info.cronrecord.m+'", "hour":"'+$scope.my_cronrecord_info.cronrecord.h+'", "dom":"'+$scope.my_cronrecord_info.cronrecord.dom+'", "month":"'+$scope.my_cronrecord_info.cronrecord.M+'", "dow":"'+$scope.my_cronrecord_info.cronrecord.dow+'", "valve_id":'+$scope.my_cronrecord_info.cronrecord.vid+', "duration":'+$scope.my_cronrecord_info.cronrecord.d+', "status":'+$scope.my_cronrecord_info.cronrecord.S+', "skip":'+$scope.my_cronrecord_info.cronrecord.s+', "index":'+$scope.cron_index+', "action":'+$scope.action+' }');
	  }
     
      //alert("Data saved");//need confirmation !!!!!!
      $scope.showAlertCronSaved();
          
      if(_debug) console.log($scope.my_cronrecord_info);
    } //end function doSomething
  
});
