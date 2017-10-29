//---------------------------Service------------------------------------

homyModule.factory('MyService', ['$rootScope', 'MyLocalStorage', function( $rootScope, MyLocalStorage) 
{
	$rootScope.connected = false;
	$rootScope.broker = broker[0];

	var Service = {};

	Service.types = []; //list of all received types : irritool, plug, dth for now
	Service.devices = []; //info on devices (state, valve num, time, etc + device_name and type)
	Service.devices_info = []; //ip_address, uptime, network type + device_name and type
	Service.cronrecord = []; //cron records for devices 

/*************************************************
* Service: startDiscovery - MQTT entry point 
*
*
/*************************************************/  
	Service.startDiscovery = function(response, user)
	{

        var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

        var localStorageObject = {};
		localStorageObject.cloud_ip          = response.cloud_ip;
		localStorageObject.cloud_port        = response.cloud_port;
		localStorageObject.cloud_ssl_port    = response.cloud_ssl_port;
		localStorageObject.cloud_ws_port     = response.cloud_ws_port;
		localStorageObject.cloud_ws_ssl_port = response.cloud_ws_ssl_port;
		localStorageObject.uid               = response.uid;
		localStorageObject.uport             = response.uport;
		localStorageObject.userver           = response.userver;
		localStorageObject.utopic            = response.utopic;
		localStorageObject.u                 = user.username;
		localStorageObject.p                 = user.password;
		localStorageObject.p5                = MD5(user.password);
        localStorage.setItem('homySettings', JSON.stringify(localStorageObject));

        var hosts_arr = [ localStorageObject.cloud_ip, localStorageObject.userver];
        var ports_arr = [ Number(localStorageObject.cloud_ws_port), Number(localStorageObject.uport)];
        var ssl_arr   = [false, false]
		var connectedToBroker = false;
		var broker = "";

		var options = {
		     timeout: 5,
		     userName: localStorageObject.u, 
		     password: localStorageObject.p,
		     useSSL: ssl_arr,
		     hosts: hosts_arr,
		     ports: ports_arr,
		     //Gets Called if the connection has sucessfully been established 
		     onSuccess: function () 
		     {		         
		         connectedToBroker = true;             
		         broker = mqtt_client.getConnectedBroker();

		         mqtt_client.subscribe(localStorageObject.utopic+'/#');
		         mqtt_client.subscribe('/'+localStorageObject.utopic+'/#');
		         mqtt_publish(localStorageObject.utopic+'/status/update','{"1":"1"}');
		         mqtt_publish('/'+localStorageObject.utopic+'/status/update','{"1":"1"}');
		     },
		     //Gets Called if the connection could not be established
		     onFailure: function (message) {
		         console.log("Connection failed: " + message.errorMessage);        
		     } 
		};


		//Creates a new Messaging.Message Object and sends it to the  MQTT Broker
		 //var mqtt_publish = function (payload, topic, qos) {
		var mqtt_publish = function ( topic, payload) 
		{
		     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
		     var _debug = 0;
		     var message = new Messaging.Message(payload);
		     
		     message.destinationName = topic; 
		     message.qos = 0;//qos;
		     mqtt_client.send(message);
		     if(_debug) console.log(" mqtt_publish topic:" + message.destinationName + " msg:" + payload );
		     
		     message.destinationName = '/cloud' + topic;
		     mqtt_client.send(message);
		     if(_debug) console.log(" mqtt_publish topic:" + message.destinationName + " msg:" + payload );
		}



		function onMessageArrived(message) {
		    console.log("onMessageArrived:"+message.payloadString);
		    //mqtt_client.disconnect();
		};

		function onConnectionLost(responseObject) {
		    if (responseObject.errorCode !== 0)
		    console.log("onConnectionLost:"+responseObject.errorMessage);
		};

		var randomId = "Homy_" + parseInt(Math.random() * 100, 10);

		var mqtt_client = new Messaging.Client("iotcentral.eu", 9004, randomId );

		Service.mqtt_publish = mqtt_publish;

		mqtt_client.onConnectionLost = function (responseObject) {
		     //Depending on your scenario you could implement a reconnect logic here
		     alert("connection lost6: " + responseObject.errorMessage);
		 };
		
		mqtt_client.onMessageArrived = onMessageArrived;
		mqtt_client.onConnectionLost = onConnectionLost;


		//Start connection the brokers list
		mqtt_client.connect(options); //  

		mqtt_client.onMessageArrived = function (message)
		{ 
		    
		    $rootScope.connected = true;
		    $rootScope.broker = broker[0];
		    var topic = message.destinationName;
		    var message_rx = message.payloadString;

		    var production = 1;
		    console.log("===============>RX on topic:"+ topic + " MSG:"+ message.payloadString);
		    
		    if(message.payloadString == "{\"1\":\"1\"}") return;
		    var device_obj={};
		  
		    try{
		        device_obj = JSON.parse(message_rx);
		    }catch(e){
		        console.log(e); //error in the above string(in this case,yes)!
		    }

		    //add rcv topic to this device info
		    device_obj.topic = topic;
		    device_obj.device_alias = device_obj.device_name;		    

		    if(device_obj.hasOwnProperty("type") == true)
		    {   
		    	device_obj.device_alias = MyLocalStorage.getAlias('dev_alias', device_obj.device_name);

		    	if( (topic == localStorageObject.utopic+"/device/status") || 
		    		 (topic == "/"+localStorageObject.utopic+"/device/status")  )		    		  
		    	  
		    	{
	    			if(Service.devices_info.length == 0) //First element in the Service
	    			{	                	
	        			$rootScope.$apply(function() {Service.devices_info.push(device_obj);}); 
	     			}
	     			else
	     			{
	        			for(var i=0; i < Service.devices_info.length; i++)
	        			{
	         				if((device_obj.device_name == Service.devices_info[i].device_name) && (device_obj.type == Service.devices_info[i].type))
	         				{
	          					if((topic != localStorageObject.utopic+"/irritool/cronrecord") && 
	          				   	(topic != localStorageObject.utopic+"/plug/cronrecord") && 
	          				   	(topic != localStorageObject.utopic+"/aircon/cronrecord") ) //changed plug from irritool 01/06
	          					{
	            					Service.devices_info[i] = device_obj; 
	            					$rootScope.$apply(function() { Service.devices_info[i] = device_obj; });
	            					break;
	          					}
	         				}
	         				else
	         				{        	          					
	          					if(i==Service.devices_info.length-1)//at the end and didn't found our device
	          					{	          						
	            					$rootScope.$apply(function() {Service.devices_info.push(device_obj);});
	          					}       
	         				}
	        			}//end for
	     			}
		     			
		     	}
		    	else if((topic != localStorageObject.utopic+"/irritool/cronrecord") && 
		          				   	(topic != localStorageObject.utopic+"/plug/cronrecord") && 
		          				   	(topic != localStorageObject.utopic+"/aircon/cronrecord") )
                {
		     		if(Service.devices.length == 0)
		     		{		      			
		      			$rootScope.$apply(function() {Service.devices.push(device_obj);});		      		
		      			$rootScope.$apply(function() {Service.types.push(device_obj.type); });
		      			return;
		      		}
		    
		      		for(var i=0; i < Service.devices.length; i++)
		      		{		      			
		      			if((device_obj.device_name == Service.devices[i].device_name) && (device_obj.type == Service.devices[i].type))
		      			{

			        		Service.devices[i] = device_obj;
			        		break;
		      			}
			      		else
			      		{		        
			        		//add rcv device info ( topic included) into devices[]
			        		if(i==Service.devices.length-1)//at the end and didn't found our device
			        		{
			            		$rootScope.$apply(function() {Service.devices.push(device_obj);});
			        		}
			        		//add device type in Service.types[] if no already included.
			        		for(var j=0; j < Service.types.length; j++)
			        		{			          			
			          			if(Service.types[j] == device_obj.type)
			          			{
			          				//do nothing, rcv type already in Service.types
			          				break;
			        			}
			          			else
			          			{ 
			          				if(j==Service.types.length-1)//at the end and didn't found our type
			          				{ 
			            				$rootScope.$apply(function() {
			             					Service.types.push(device_obj.type); 
			              				});
			            			}
			        			}   
			          		}
			        		//break;
			      		}
		       		}//end for
				}//end topic
						       	
		       //console.log(Service);            
		    }//end has prop type  
		 
		   $rootScope.$apply(function() {

		   });                
		} //mqtt_client.onMessageArrived 

 	}//end service
 
/*************************************************
* Service: getData- 
*
*
/*************************************************/     
  	Service.getData = function() { 
	  	return Service; 
  	};
/*************************************************
* Service: getDeviceInfo- 
*
*
/*************************************************/   
  	Service.getDeviceInfo = function(device_name)//, type) 
  	{	  

	  	for(var i=0; i < Service.devices_info.length; i++)
	  	{		  	
		  	if((Service.devices_info[i].device_name == device_name))// && (Service.devices_info[i].type == type))
		  	{			    
			  	return Service.devices_info[i]; //====>
		  	}
	  	}	  
	  
  	};
/*************************************************
* Service: getDeviceInfoCron- 
*
*
/*************************************************/
  	Service.getDeviceInfoCron= function(device_name, device_type)//, type) 
  	{	  
	  	var retObj = {};
	  	retObj.device_name = device_name;
	  	retObj.device_type = device_type;
	  	retObj.cronrecord = [];
	  
	  	for(var i=0; i < Service.cronrecord.length; i++)
	  	{			
		  	if((Service.cronrecord[i].device_name == device_name))// && (Service.devices_info[i].type == type))
		  	{
			  	retObj.cronrecord = Service.cronrecord[i].cron_records;
			  	break;
		  	}
	  	}	  
	  	return retObj;	  	  
  	};


/*************************************************
* Service: getCount- 
*
*
/*************************************************/  
  
  Service.getCount = function(dev_type)
  {
	  var count = 0;
	  for(var i=0; i<Service.devices.length; i++)
	  {
		  if(Service.devices[i].type == dev_type)
		    count++;
	  }
	  return count;
  }

/*************************************************
* Service: getAllDevicesWithType- 
*
*
/*************************************************/    
  Service.getAllDevicesWithType = function(dev_type)
  {
	 var dev_types = [];
	 for(var i=0; i<Service.devices.length;i++)
	 {
		 if(Service.devices[i].type == dev_type)
		   dev_types.push(Service.devices[i]);
	 }
	 return dev_types;
  }
/*************************************************
* Service: getAllDevices- 
*
*
/*************************************************/      
  	Service.getAllDevices = function()
  	{
    	var elements = [];
    	for(var i=0;i<Service.types.length;i++)
    	{
		  	var elem_obj = {};
		  	elem_obj.type = Service.types[i];		  
		  	elem_obj.title_type =   Service.types[i][0].toUpperCase() + Service.types[i].slice(1);
		  	elem_obj.id = i+1;
		  	elem_obj.count = Service.getCount(Service.types[i]);		 		 
          	elements.push(elem_obj);        
     	}
     	return elements;
   	}
/*************************************************
* Service: printAllDevices- 
*
*
/*************************************************/ 
   Service.printAllDevices = function()
   {
	   var all_dev = [];
	   for(var i=0; i <Service.devices.length; i++)
	   {
		   all_dev.push(Service.devices[i]);
	   }
	   return all_dev;
   }
/*************************************************
* Service: getOneDevice- 
*
*
/*************************************************/      
 
  	Service.getOneDevice = function(device_name, type) //getDeviceInfo
  	{
	  	var elem=[];
	  	for(var i=0;i<Service.devices.length;i++)
	  	{
		  	if((Service.devices[i].device_name == device_name) && (Service.devices[i].type == type))
		  	{
			  	elem.push(Service.devices[i]);			  	
			  	break;
		  	}
	  	}
	  	return elem;
  	}  
  	
  	return Service;
}]); 
