angular.module('ctcroombookingapp.controllers', [])

.controller('BrowseRoomsCtl', function($scope, $state, $ionicLoading, RoomService, LogService) {
	
	$scope.getAllRoomsCallBack = function(roomsResult) {
		$scope.rooms = roomsResult;
	}
	
	$scope.rooms = RoomService.getAllRooms($scope.getAllRoomsCallBack);
	
	LogService.log("BrowseRooms", {});
	
	$scope.viewRoom = function(room) {
	  //alert('You have chosen ' + room.name + '. Thank you!');
		
	   LogService.log("BrowseRooms-ViewRoom", room);
		
	  var request = {
		"room": room
	  };
	  console.log(request);
	  var requestJson = angular.toJson(request);
	  $state.go('tab.listroombookings', {'request' : requestJson});
			
	};
	  
})

.controller('ListRoomBookingsCtl', function($scope, $state, $ionicLoading, $stateParams, RoomService, LogService, BookingService) {
	
	var requestObj = angular.fromJson($stateParams.request);
	
	LogService.log("ListRoomBookings", requestObj);
	$scope.room = requestObj.room;
	
	$scope.getRoomBookingsCallBack = function(bookingResult) {
		$scope.bookings = bookingResult;
	};
	
	$scope.bookings = RoomService.getRoomBookings($scope.getRoomBookingsCallBack, requestObj.room.code);
	
	$scope.bookRoomCallBack = function(room) {
		alert("You have just request to book " + room.name + ".\nThank you.");
		location.href = '#/tab/welcome';
	};
	
	$scope.bookRoom = function(room) {
			
		LogService.log("ListRoomBookings-BookRoom", room);
		
		console.log("Book room");
		
		room.booker = "Fernando Karnagi";
		
		BookingService.bookRoom($scope.bookRoomCallBack, room);
	};
	
	$scope.sendMessageToBooker = function(booking) {
	
		if (confirm('Are you sure you want to sender to ' + booking.booker + '?')) {
			LogService.log("ListRoomBookings-SendMessageToBooker", booking);
			
			console.log("Sending message to booker");
			console.log(booking);
			alert("Message has been sent to " + booking.booker + ".\nThank you.");
			location.href = '#/tab/welcome';
		}
		
	}
		
})

.controller('WelcomeCtrl', function($scope, $stateParams, LogService) {

	LogService.log("Welcome", {});
})

.controller('AboutUsCtl', function($scope, $stateParams, LogService) {
	LogService.log("AboutUs", {});
})

.controller('MakeABookingCtl', function($scope, $stateParams, $state, LogService) {

	LogService.log("MakeABooking", {});
	
	$scope.facilitiesList = [{
		"text": "Conference Bridge",
		"checked": false
	}, {
		"text": "Phone Line",
		"checked": false
	},{
		"text": "White Board",
		"checked": false
	}, {
		"text": "Wireless",
		"checked": false
	}, {
		"text": "TV Projector",
		"checked": false
	}, {
		"text": "Table Bar",
		"checked": false
	}, {
		"text": "Wall Dart Games",
		"checked": false
	}, {
		"text": "Karaoke",
		"checked": false
	}];  
	
	$scope.findRoomForBooking = function(booking) {
		console.log("Find rooms for booking");
		LogService.log("MakeABooking-FindRoomForBooking", booking);
		 
		console.log(booking);
		var request = {
			"booking": booking
		  };
		  var requestJson = angular.toJson(request);
		  $state.go('tab.makeabooking-listrooms', {'request' : requestJson});
	  
	}
	
})


.controller('MakeABookingListRoomsCtl', function($scope, $state, $ionicLoading, $stateParams, RoomService, LogService, BookingService) {
	
	var roomSearchParams = angular.fromJson($stateParams.request);
	console.log(roomSearchParams);
	
	$scope.bookingRequest = roomSearchParams.booking;
	
	LogService.log("MakeABookingListRooms", roomSearchParams);
	
	$scope.getAvailableRoomsCallBack = function(roomsResult) {
		$scope.rooms = roomsResult;
	};
	
	$scope.bookings = RoomService.getAvailableRooms($scope.getAvailableRoomsCallBack, roomSearchParams);
	
	$scope.bookRoomCallBack = function(room) {
		alert("You have successfully made booking for " + room.name + ".\nThank you.");
		location.href = '#/tab/welcome';
	}
	
	$scope.bookRoom = function(room) {
		
		if (confirm('Are you sure you want to book this room?')) {
			console.log("Book room");
			console.log($scope.bookingRequest);
			room.date = $scope.bookingRequest.date;
			room.noOfAttendees= $scope.bookingRequest.noOfAttendees;
			room.time = $scope.bookingRequest.time;
			room.duration = $scope.bookingRequest.duration;
			room.purpose = $scope.bookingRequest.purpose;
			room.booker = "Fernando Karnagi";
			console.log(room);
			
			LogService.log("MakeABookingListRooms-BookRoom", room);
			
			BookingService.bookRoom($scope.bookRoomCallBack, room);
			
		}
		
	}
})
	
.controller('MyBookingsCtl', function($scope, $stateParams, BookingService, LogService) {

	LogService.log("MyBookings", {});
	
	$scope.getMyBookingCallback = function(bookingResult) {
		$scope.bookings = bookingResult;
	}
	
	$scope.bookings = BookingService.getMyBookings($scope.getMyBookingCallback);

	$scope.cancelMyBookingCallBack = function(booking) {
		alert("You have successfully cancelled booking " + booking.room + ".\nThank you.");
		location.href = '#/tab/welcome';
	};
	
	$scope.cancelMyBooking = function(booking) {
		
		if (confirm('Are you sure you want to cancel this booking?')) {
			LogService.log("MyBookings-CancelMyBooking", booking);
			BookingService.cancelMyBooking($scope.cancelMyBookingCallBack, booking);
		}
	}
})

;
