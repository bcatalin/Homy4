
 /**********************************************************************
 * Function: 
 * Param   : 
 * Description: 
 **********************************************************************/
homyModule.factory('MyLocalStorage', ['$window', function($window) {   
    
    var _debug = 0;
    if(_debug) console.log($window.localStorage);
  
    var MyLocalStorage = {};
  
   /**********************************************************************
   * Function: 
   * Param   : 
   * Description: 
   **********************************************************************/    
    MyLocalStorage.set= function(key, value) 
    {
      return $window.localStorage[key] = value;
    };


    /**********************************************************************
    * Function: 
    * Param   : 
    * Description: 
    **********************************************************************/    
    MyLocalStorage.setObject= function(key, value) 
    {
      //console.log("MyLocalStorage.setObject******************************>>>"); console.log(value);
      
      //get current array
      var retrievedData = $window.localStorage.getItem(key);
      var data_arr = JSON.parse(retrievedData);
      
      //console.log(data_arr);
      //console.log(angular.isArray(data_arr));
	    var oo = [];
	    oo.push({device_name:  value.device_name, 
		       device_alias: value.device_alias});   
	    //console.log(value.device_alias); console.log(oo);
	     
      if(!angular.isArray(data_arr))
      {
          data_arr = [];
          data_arr.push(oo);
		  localStorage.setItem(key, JSON.stringify(data_arr));
		  //console.log("e null");
		  
	    }
	    else
	    {
		    var i=0;
		    for (i=0; i<data_arr.length; i++)
		    {
			    //console.log("i="+i+" data_arr.length="+data_arr.length);
			    if(data_arr[i][0].device_name == value.device_name)
			    {
				    //console.log("found:"+i+" dar:"+data_arr[i][0].device_name+" vdn:"+value.device_name);
				    data_arr[i][0].device_alias = value.device_alias;
				    localStorage.setItem(key, JSON.stringify(data_arr));
				    return;
			    }
			    else if( i== data_arr.length-1)
			    {
				    //console.log("at the --> add it"); console.log(oo);
				    data_arr.push(oo); 				
			    }			 
		    }
		 
		    localStorage.setItem(key, JSON.stringify(data_arr));
		    //console.log("nu e null"); 
	    }
	    //console.log(JSON.parse($window.localStorage.getItem(key)));
      return; //==============> 
    };
    

    /**********************************************************************
    * Function: 
    * Param   : 
    * Description: 
    **********************************************************************/      
    MyLocalStorage.writeSettings = function(key, homySettings)
    {
		  localStorage.setItem(key, JSON.stringify(homySettings));
	  }
    /**********************************************************************
    * Function: 
    * Param   : 
    * Description: 
    **********************************************************************/      
    MyLocalStorage.getObject= function(key) 
    {      
      var retrievedData = $window.localStorage.getItem(key); 
      if(_debug) console.log(retrievedData);
      if(retrievedData != null)
      {
        var data_arr = JSON.parse(retrievedData);
        if(_debug) console.log(data_arr);
        if(data_arr == null)
        {
		  if(_debug)console.log("data_arr is null");
		  $window.localStorage[key] = [];  
	    }
	  }
      return data_arr || {};//JSON.parse($window.localStorage[key] || '{}'); //====================>
    };
    


    /**********************************************************************
    * Function: 
    * Param   : 
    * Description: 
    **********************************************************************/  
    MyLocalStorage.getAlias = function(key, device_name) 
    {
		  //console.log("MyLocalStorage.getAlias for key:"+key+ "device_name:"+device_name);
		  var all_alias = MyLocalStorage.getObject(key);
		  var i=0;
		  for(i=0;i<all_alias.length;i++)
		  {
			  if(all_alias[i][0].device_name == device_name)
			    return all_alias[i][0].device_alias; //====>			      
		  }
		  return device_name;//====>
	  }
    
    /**********************************************************************
    * Function: 
    * Param   : 
    * Description: 
    **********************************************************************/  
    MyLocalStorage.getHomySettings = function(key) 
    {
		  //console.log("MyLocalStorage.getAlias for key:"+key+ "device_name:"+device_name);
		  var homySettings = MyLocalStorage.getObject(key);
	      return homySettings //====>
	  }    
    
        
    return MyLocalStorage; //==============>
  //}
}]);
