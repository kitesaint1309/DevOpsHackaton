/**
 * Created by Hans Van Staey on 17/03/2016.
 */

//Todo: Add member to db!!!!!


var res = $http.get((geturl()+"/api/addmember"));
res.success(function(data, status, headers, config) {
    var serverresp = data;
    console.log(data);
    if(serverresp.indexOf(" Member added") > -1){
        console.log("Member added to team");
    }

});
res.error(function(data, status, headers, config) {
    alert( "failure message: " + JSON.stringify({data: data}));
});

