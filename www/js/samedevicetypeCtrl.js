/*************************************************
* Controller: SameTypeCtrl- 
*
*
/*************************************************/
mainAppModule.controller('SameTypeCtrl', function($scope, $stateParams, $ionicModal, MyService, MyLocalStorage) 
{
  //console.log("SameTypeCtrl");
  $scope.listCanSwipe = true;
  
  if( typeof($stateParams.iot_device_type[0]) == "undefined") { return; }
  
  $scope.dev_type_title =  $stateParams.iot_device_type[0].toUpperCase() + $stateParams.iot_device_type.slice(1);   

  $scope.doRefresh = function() 
  {    
      //console.log('SameTypeCtrl->Refreshing!');    
      $scope.dev_type = MyService.getAllDevicesWithType($stateParams.iot_device_type);    
      //Stop the ion-refresher from spinning
      //console.log($stateParams);
      $scope.$broadcast('scroll.refreshComplete'); 
  }

  $scope.doRefresh(); 
   
 
  // Load the add / change dialog from the given template URL
  //$ionicModal.fromTemplateUrl('add-change-dialog.html', function(modal) {
  $ionicModal.fromTemplateUrl('templates/dev_settings.html', function(modal) 
  {
     $scope.addDialog = modal;
  }, 
  {
     scope: $scope,
     animation: 'slide-in-up'
  });


  $scope.showAddChangeDialog = function(action) 
  {
     
     console.log($scope);
     //$scope.description = $scope.tmpEditItem.device_alias;
     $scope.action = action;
     $scope.addDialog.show();
  };

  
  $scope.leaveAddChangeDialog = function() 
  {
        // Remove dialog 
        $scope.addDialog.remove();
        // Reload modal template to have cleared form
        $ionicModal.fromTemplateUrl('templates/dev_settings.html', function(modal) {
          $scope.addDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up'
        });
  };

  $scope.showEditItem = function(item) 
  {
      //console.log("showEditItem", item);
      // Remember edit item to change it later
      $scope.tmpEditItem = item;
      $scope.description = $scope.tmpEditItem.device_alias; //--------here 
      console.log($scope.tmpEditItem);
      $scope.showAddChangeDialog('change');
  };

      
      
      
  $scope.editItem = function(form) 
  {

     var item = {};
     item.description = form.description.$modelValue;

	 if(item.description != "undefined")
	 {
		   //update local storage with item for device_name
		   //console.log("update local storage", $scope.tmpEditItem, item.description);   
		   var my_obj = {
               device_name: $scope.tmpEditItem.device_name,
               device_alias: item.description
            };
		   MyLocalStorage.setObject('dev_alias', my_obj);
		   $scope.tmpEditItem.device_alias = item.description;
	 }        
     $scope.leaveAddChangeDialog();
  }


  
});
