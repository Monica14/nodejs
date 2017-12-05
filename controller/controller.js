app.controller('testController', function($scope, $http) {
 // alert("sadsadsa")
 $scope.skillList = [];
 $scope.showAdd = false;
 $scope.addSkills = {
  "id": "",
  "name": "",
  "status": null
 }

 var localData = localStorage.getItem('data');
 $scope.skillList.push(JSON.parse(localData))

 $scope.addSkill = function() {

  $scope.addSkills.id = $scope.skillList.length + 1;
  $scope.skillList.push($scope.addSkills)
  localStorage.setItem('data', JSON.stringify($scope.addSkills))
  $scope.addSkills = {}  
 }

 $scope.changeSkill = function(obj) {
  var a = $scope.skillList.indexOf(obj);
  $scope.skillList[a] = {
   "id": obj.id,
   "name": obj.name,
   "status": obj.status
  }
  
   $scope.openEdit = false;
  localStorage.setItem('data', JSON.stringify(obj))

 }

 $scope.changeStatus = function(obj){
  alert("Your skill is " + obj)
 }


/***************************************************************************************

            Please refer below angular code for calling apis

***************************************************************************************/



   $http.get('http://localhost:3015/api/skills').then(function(res) {
    //alert("sadasdas")
        // Must return below array of json
        // *******************************************************
        //   Sample JSON
        // *******************************************************  
        // [{
        //   "id": "",
        //   "name": "",
        //   "status": null   //for approval (0 or 1)
        // }]

    
    $scope.skillList = res.data; 
 });



  //Add 
  $scope.add = function() {
    $scope.data = $scope.addSkills;
    //alert($scope.data.name+"   "+$scope.data.status);
   $http
    .post('http://localhost:3015/api/skills', { name: $scope.data.name, status: $scope.data.status })
    .then(function(res) {
      console.log(res);
    });
  }

  //Edit

  $scope.edit = function(index) {
    $scope.data = index;
    //console.log($scope.data);
    $http
      .put('http://localhost:3015/api/skills/'+ $scope.data._id +'/update', { name: $scope.data.name })
      .then(function(res) {
        alert('Skill updated Successfully');
      });
    $scope.openEdit = false;
  }


  //Change Statuys

  $scope.status = function(index, status){
    //Approve 
    $scope.data = index;
    console.log($scope.data);
    $http
      .put('http://localhost:3015/api/skills/'+ $scope.data._id +'/approve', { status: $scope.data.status })
      .then(function(res) {
        if($scope.data.status == true)
        {
          status = 1;
        }
        else{
          status = 0;
        }
       // alert($scope.data.status);
        alert('This skill is ' + (status === 1 ? 'Approved' : 'Rejected'));
      });   
  }

})