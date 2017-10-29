/*************************************************
* Controller: OneDevicePlugCtrl- 
*
*
/*************************************************/

mainAppModule.controller('OneDevicePlugCtrl', function($scope, $stateParams, $rootScope,$timeout, 
	                                                   $ionicPopup, $state, $ionicActionSheet, 
	                                                   $ionicListDelegate, MyService, MyLocalStorage) {
  	console.log("=====> OneDevicePlugCtrl");
  	var local_storage_obj = MyLocalStorage.getObject('homySettings');
  	//stateParams contain Object { iot_device_type: "plug", iot_device_name: "ESP_00123452" }
  	
  	$scope.iot_device_name = $stateParams.iot_device_type;

  
  	//new
  	$scope.device_name = $stateParams.iot_device_name; //parameters that arrived 
  	$scope.type        = "plug";//$stateParams.iot_device_type;

 	/**********************************************************************
 	* Function: 
 	* Param   : 
 	* Description:  
 	**********************************************************************/
  	$scope.doRefresh = function() 
  	{         

   		$scope.my_dev = MyService.getOneDevice($scope.device_name, $scope.type);
   
   		$scope.my_device_info = MyService.getDeviceInfo($scope.device_name);//, $scope.type);
   		
      
   		$scope.$broadcast('scroll.refreshComplete');
   
   		if($scope.type == "plug")
   		{             
      		for(var i=0; i<$scope.my_dev.length;i++)
      		{
				$scope.my_dev[i].checked = false;
		
				if($scope.my_dev[i].state == 1)
				{
		  			$scope.my_dev[i].checked = true;
				}		
	  		}
	  		$scope.ii = $scope.my_dev;      
      		$scope.hidePlug = false;
    	}//end plug  
   }//doRefresh
         
   
 	/**********************************************************************
 	* Function: updatePlug
 	* Param   : item
 	* Description: called when the user is touching the toogle button
 	*              send a MQTT message to the broker, update the myService
 	**********************************************************************/ 
   	$scope.updatePlug = function(item) 
   	{       
        
        for(var i=0; i< $scope.my_dev.length; i++)
        {
		  	if(item.checked == true)
		  	{		    
		    	MyService.mqtt_publish(local_storage_obj.utopic+'/plug/command', '{"device_name":"'+item.device_name+'", "type":"plug", "state":1}');
		    	for(var i=0; i < $scope.my_dev.length; i++)
		    	{
					if($scope.my_dev[i].device_name == item.device_name)
					{
						//update
						$scope.my_dev[i].state = 1;
						break;
					}
				}		     
		  	}
		  	else if(item.checked == false) 
		  	{
		    	MyService.mqtt_publish(local_storage_obj.utopic+'/plug/command', '{"device_name":"'+item.device_name+'", "type":"plug", "state":0}');
		    	for(var i=0; i < $scope.my_dev.length; i++)
		    	{				
					if($scope.my_dev[i].device_name == item.device_name)
					{
						//update
						$scope.my_dev[i].state = 0;
						break;
					}	
				}			  			 
		  	}
	    }
	    //update the current view
	    //$scope.doRefresh(); 
	    $timeout(function() {
             $scope.doRefresh();
        }, 1000); 	    
   }

   
   
   // ATTENTION: !!!!!!!!!!!!!!!!!!!
   // There is a real call here when this controller is created
   $scope.doRefresh(); //invoke do Refresh method normaly 


 	/**********************************************************************
 	* Function: 
 	* Param   : 
 	* Description: 
 	**********************************************************************/ 
   
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
     
}); //end controller OneDevicePlugCtrl
