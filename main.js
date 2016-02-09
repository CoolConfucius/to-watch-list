'use strict'; 

var app = angular.module('MyApp', ['ngStorage']); 

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage) {
  
  $scope.$storage = $localStorage; 
  if (!$scope.$storage.films) {
    $scope.$storage = $localStorage.$default({
      films: [ 
        { title: "HP Philosopher's Stone", category: "fantasy", minutes: 159 },
        { title: "LotR Fellowship of the Ring", category: "fantasy", minutes: 228 },
        { title: "Star Wars: the Force Awakens", category: "science fiction", minutes: 136 }, 
        { title: "Goldfinger", category: "action", minutes: 112 }, 
        { title: "Fight Club", category: "drama", minutes: 151 }, 
      ]
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