'use strict'; 

// Watch Later List 

$(document).ready(init); 
function init(){

};

var app = angular.module('MyApp', ['ngStorage']); 

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage) {
  
  $scope.$storage = $localStorage; 
  if (!$scope.$storage.films) {
    $scope.$storage = $localStorage.$default({
      films: [
        { title: "growth film", category: "green", minutes: 29.99 },
        { title: "invisibility film", category: "white", minutes: 59.99 },
        { title: "love film", category: "red", minutes: 100 }, 
        { title: "speed film", category: "orange", minutes: 4.99 }, 
        { title: "sensitivity film", category: "pink", minutes: 67.89 }, 
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
  // $scope.films = [
  //   { title: "growth film", category: "green", minutes: 29.99 },
  //   { title: "invisibility film", category: "white", minutes: 59.99 },
  //   { title: "love film", category: "red", minutes: 100 }, 
  //   { title: "speed film", category: "orange", minutes: 4.99 }, 
  //   { title: "sensitivity film", category: "pink", minutes: 67.89 }, 
  // ]

  $scope.films = $scope.$storage.films;

  // $scope.keys = Object.keys; 

  $scope.editState = false; 

  $scope.addFilm = function(){
    var film = {
      title: $scope.newFilm.title || ' ',
      category: $scope.newFilm.category || ' ',
      minutes: $scope.newFilm.minutes || 0
    }
    // $scope.films.push($scope.newFilm);
    $scope.films.push(film);
    // $scope.newFilm = {};
    $scope.newFilm = resetFilm;
  }

  
  $scope.removeFilm = function(film){
    // console.log('this', this);
    console.log("film:", film);
    console.log('this.key', this.key);
    console.log('this.film', this.film);
    var index = $scope.films.indexOf(film);
    $scope.films.splice(index, 1);
    $scope.$storage.films = $scope.films; 
    // $('#myModal').modal(); 
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
}); 