angular.module('ctcroombookingapp.services', [])

.factory('LogService', function($http, SERVER_PATH, API_KEY, API_PASSWORD) {

  var roomsResult = {}; 
	
  return {
	  
	log: function(action, data) {
    	console.log("LogService.log"); 
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
	    var currentTimeStamp = new Date().getTime();
	   
	    var logData = 
	    {
	      "ipaddress": "10.0.0.1",
	      "timestamp": currentTimeStamp,
	      "action": action,
	      "data": data,
	      "table": "log"
	    }

    	var httpReq = 
    		$http({
    			method: 'POST',
    			url: SERVER_PATH,
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: logData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		console.log("Log has been submitted");
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
    	
   
    }
  };
})  


.factory('BookingService', function($http, SERVER_PATH, API_KEY, API_PASSWORD) {

  var roomsResult = {}; 
	
  return {
	  
	cancelMyBooking: function(cancelMyBookingCallBack, booking) {
		console.log("BookingService.cancelMyBooking");
		console.log(booking);
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
		booking.status = 'CANCELLED';
		
		var httpReq = 
    		$http({
    			method: 'PUT',
    			url: SERVER_PATH + "/" + booking._id,
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: booking
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		
    		cancelMyBookingCallBack(booking);
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
   	
	},
	  
	bookRoom: function(bookRoomCallBack, room) {
		console.log("BookingService.bookRoom");
		console.log(room);
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
	    var startDt = new Date(room.date).getTime() + room.time * 1000 * 3600; 
	    var endDt = startDt + room.duration * 1000 * 3600;
	   
	    var bookingData = {
		  "table": "booking",
		  "room": room.code,
		  "start": startDt,
		  "end": endDt,
		  "booker": room.booker,
		  "purpose": room.purpose,
		  "noOfAttendees": room.noOfAttendees,
		  "status": "ACTIVE"
		};

	    var httpReq = 
    		$http({
    			method: 'POST',
    			url: SERVER_PATH,
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: bookingData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		
    		bookRoomCallBack(room);
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
	
	},
	  
	getMyBookings: function(getMyBookingsCallBack) {
    	console.log("BookingService.getMyBookings");

		var bookingResult = {};
		
		var booker = "Fernando Karnagi";
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
	    var currentTimeStamp = new Date().getTime();
	   
	    var searchData = 

	    {
	      "selector": {
	        "table": "booking",
	        "booker": booker,
	        "start": {
		          "$gt": 0
		        }
	      },
	      "fields": [
	        "_id",
	        "_rev",
	        "table",
	        "room",
	        "start",
	        "end",
	        "purpose",
	        "booker",
	        "status"
	      ],
	      "sort": [
	        {
	          "start": "asc"
	        }
	      ]
	    };

    	var httpReq = 
    		$http({
    			method: 'POST',
    			url: SERVER_PATH + '/_find',
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: searchData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		bookingResult = results.docs;
    		
    		var dt = new Date();
    		console.log(dt.getTime());
    		
    		for (var i = 0; i < bookingResult.length; i++) {
    			var d = new Date(bookingResult[i].start);
    			bookingResult[i].startDt = d.getDay() + "/" + ( d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    			d = new Date(bookingResult[i].end);
    			bookingResult[i].endDt = d.getDay() + "/" + ( d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    		}
    		getMyBookingsCallBack(bookingResult);
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
    	
    	var ret = roomsResult;
    
    	return ret; 
    }
  };
})
  
.factory('RoomService', function($http, SERVER_PATH, API_KEY, API_PASSWORD) {

  var roomsResult = {}; 
	
  return {
	  
	getRoomBookings: function(getRoomBookingsCallBack, roomCode) {
    	console.log("RoomService.getRoomBookings");

		var bookingResult = {};
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
	    var currentTimeStamp = new Date().getTime();
	   
	    var searchData = 

	    {
	      "selector": {
	        "table": "booking",
	        "status": "ACTIVE",
	        "room": roomCode,
	        "start": {
	          "$gt": 0
	        }
	      },
	      "fields": [
	        "_id",
	        "_rev",
	        "table",
	        "room",
	        "start",
	        "purpose",
	        "end",
	        "booker",
	        "status"
	      ],
	      "sort": [
	        {
	          "start": "asc"
	        }
	      ]
	    };

    	var httpReq = 
    		$http({
    			method: 'POST',
    			url: SERVER_PATH + '/_find',
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: searchData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		bookingResult = results.docs;
    		
    		console.log(bookingResult);
    		for (var i = 0; i < bookingResult.length; i++) {
    			var d = new Date(bookingResult[i].start);
    			bookingResult[i].startDt = d.getDay() + "/" + ( d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    			d = new Date(bookingResult[i].end);
    			bookingResult[i].endDt = d.getDay() + "/" + ( d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    		}
    		
    		getRoomBookingsCallBack(bookingResult);
    		
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
    	
    	var ret = roomsResult;
    
    	return ret; 
    },
 
    getAvailableRooms: function(getAvailableRoomsCallBack, roomSearchParams) {
    	console.log("RoomService.getAvailableRooms");

		var roomsResult = {};
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
	    var searchData = 
	    {
		  "selector": {
		    "table": "room",
		    "code" : {
		      "$gt": ""
		    }
		  },
		  "fields": [
		    "_id",
		    "code",
		    "name",
		    "location",
			"maximum",
			"facility"
		  ],
		  "sort": [
		    {
		      "code": "asc"
		    }
		  ]
	    };
	    
    	var httpReq = 
    		$http({
    			method: 'POST',
    			url: SERVER_PATH + '/_find',
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: searchData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		roomsResult = results.docs;
    	
    		for (var i = 0; i < roomsResult.length; i++) {
    			var room = roomsResult[i];
    			var facilities = '';
    			
    			for (var j = 0; j < room.facility.length; j++) {
    				if (j == 0) {
    					facilities = room.facility[j];
    				} else {
    					facilities = facilities + ', ' + room.facility[j];
    				}
    				
    			}
    			room.facilities = facilities;
    			
    		}
    		getAvailableRoomsCallBack(roomsResult);
    		
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
    	
    	var ret = roomsResult;
    
    	return ret; 
    },
  
    getAllRooms: function(getAllRoomsCallBack) {
    	console.log("RoomService.getAllRooms");

		var roomsResult = {};
		
		// Define the string
	    var auth = btoa(API_KEY + ":" + API_PASSWORD);
		
	    var searchData = 
	    {
		  "selector": {
		    "table": "room",
		    "code" : {
		      "$gt": ""
		    }
		  },
		  "fields": [
		    "_id",
		    "code",
		    "name",
		    "location",
			"maximum",
			"facility"
		  ],
		  "sort": [
		    {
		      "code": "asc"
		    }
		  ]
	    };
	    
    	var httpReq = 
    		$http({
    			method: 'POST',
    			url: SERVER_PATH + '/_find',
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Basic ' + auth
    			},
    			data: searchData
    		});
    	
    	httpReq.success(function(results, status, headers, config) {
    		roomsResult = results.docs;
    	
    		for (var i = 0; i < roomsResult.length; i++) {
    			var room = roomsResult[i];
    			var facilities = '';
    			
    			for (var j = 0; j < room.facility.length; j++) {
    				if (j == 0) {
    					facilities = room.facility[j];
    				} else {
    					facilities = facilities + ', ' + room.facility[j];
    				}
    				
    			}
    			room.facilities = facilities;
    			
    		}
    		
    		getAllRoomsCallBack(roomsResult);
    		
    		
    	}).error(function(data, status, headers, config) { 
    		// Handle the error
    	});
    	
    	var ret = roomsResult;
    
    	return ret; 
    }
  };
});