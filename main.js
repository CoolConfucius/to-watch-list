'use strict'; 

var app = angular.module('MyApp', ['ngStorage']); 

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage) {
  
  $scope.$storage = $localStorage; 
  if (!$scope.$storage.films) {
    $scope.$storage = $localStorage.$default({
      films: []
    });
  } 

  console.log("mainCtrl");
  var resetFilm = {
    title: "title",
    category: "category", 
    minutes: 0
  };
  $scope.newFilm = resetFilm; 

  $scope.films = $scope.$storage.films;

  $scope.editState = false; 

  $scope.addFilm = function(){
    var film = {
      title: $scope.newFilm.title || ' ',
      category: $scope.newFilm.category || ' ',
      minutes: $scope.newFilm.minutes || 0
    }
    $scope.films.push(film);
    $scope.newFilm = resetFilm;
  }

  
  $scope.removeFilm = function(film){
    var index = $scope.films.indexOf(film);
    $scope.films.splice(index, 1);
    $scope.$storage.films = $scope.films; 
  };

  $scope.openEdit = function(film){
    $scope.editIndex = $scope.films.indexOf(film); 
    $scope.editState = !$scope.editState;
    if ($scope.editState) {
      $scope.newFilm = $scope.films[$scope.editIndex]; 
    } else {
      $scope.newFilm = resetFilm; 
    }
  }

  $scope.editFilm = function(film){
    $scope.films[$scope.editIndex] = $scope.newFilm;
    $scope.newFilm = resetFilm;
    $scope.editState = false; 
  };


  $scope.sortFilm = function(key){
    if ($scope.sortText === key) {
      $scope.sortText = '-'+key;   
    } else {
      $scope.sortText = key; 
    }
  }
}); 