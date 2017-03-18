var filterApp = angular.module('filterApp', ['angular.filter']);

filterApp.controller('UserController', function ($scope, $http) {

    // Initialize controller function
    $scope.initUserController = function() {
        $scope.getFromUrl("https://randomuser.me/api/?results=50");
        $scope.sortParameter = "name";
    };

    // Get data from API
    $scope.getFromUrl = function(url) {
        $http.get(url).then(
            function successCallback(response) {
                $scope.userData = $scope.formatResponse(response.data.results);
              },
            function errorCallback() {
                alert("API call failed");
              }
        );
    };

    // Format data
    $scope.formatResponse = function(data) {
        var returnData = [];
        for(var i=0; i<data.length; i++)
        {
            returnData.push({
                'name': data[i].name.first + ' ' + data[i].name.last,
                'gender': data[i].gender,
                'state': data[i].location.state,
                'city': data[i].location.city,
                'postcode': data[i].location.postcode
            })
        }
        return returnData;
    };

    //Gender Filter
    $scope.genderFilter = [];
    $scope.modifyGenderFilter = function(gender)
    {
        var i = $scope.genderFilter.indexOf(gender);
        if (i != -1)
            $scope.genderFilter.splice(i, 1);
        else
            $scope.genderFilter.push(gender);
    };
    $scope.applyGenderFilter = function(user)
    {
        if ($scope.genderFilter.length > 0)
        {
            if ($scope.genderFilter.indexOf(user.gender) == -1)
                return;
        }
        return user;
    };

    //State Filter
    $scope.stateFilter = [];
    $scope.modifyStateFilter = function(state)
    {
        var i = $scope.stateFilter.indexOf(state);
        if (i != -1)
            $scope.stateFilter.splice(i, 1);
        else
            $scope.stateFilter.push(state);
    };
    $scope.applyStateFilter = function(user)
    {
        if ($scope.stateFilter.length > 0)
        {
            if ($scope.stateFilter.indexOf(user.state) == -1)
                return;
        }
        return user;
    };

    //City Filter
    $scope.cityFilter = [];
    $scope.modifyCityFilter = function(city)
    {
        var i = $scope.cityFilter.indexOf(city);
        if (i != -1)
            $scope.cityFilter.splice(i, 1);
        else
            $scope.cityFilter.push(city);
    };
    $scope.applyCityFilter = function(user)
    {
        if ($scope.cityFilter.length > 0)
        {
            if ($scope.cityFilter.indexOf(user.city) == -1)
                return;
        }
        return user;
    };

    // Change Sort type
    $scope.changeSort = function (sortItem) {
        console.log(sortItem);
        if($scope.sortParameter == sortItem)
            $scope.sortParameter = '-' + sortItem;
        else
            $scope.sortParameter = sortItem;
    };

    // Actual initilization
    $scope.initUserController();
});