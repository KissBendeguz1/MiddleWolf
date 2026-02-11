function CreateUser(userName, userRole) { 
    users = localStorage.getItem("Users");
    if (users == null) {
        console.log("user length <0")
        usersList = []
        console.log(usersList)
                
        loggedinuserid = JSON.parse(localStorage.getItem("Profiles"))[0].Id;     
        user = {
          id: Date.now(),
          name: userName,
          role: userRole,
          companyid: loggedinuserid,
        };
        usersList.push(user)
        localStorage.setItem("Users", JSON.stringify(usersList))
    } else { 
        usersList = JSON.parse(localStorage.getItem("Users"));
        loggedinuserid = JSON.parse(localStorage.getItem("Profiles"))[0].Id;
        console.log(usersList)
        console.log(loggedinuserid)
        
        user = {
          id: Date.now(),
          name: userName,
          role: userRole,
          companyid: loggedinuserid,
        };

        usersList.push(user)
        localStorage.setItem("Users", JSON.stringify(usersList));
    }

}

function TestAddUser(userName, userRole) {
  console.log("user length <0");
  usersList = Array(2);
  console.log(usersList);

  companyId = JSON.parse(localStorage.getItem("Profiles")).id;
  user = {
    id: Date.now(),
    name: userName,
    role: userRole,
    companyid: companyId,
  };
  usersList.push(user);
  localStorage.setItem("Users", JSON.stringify(user));
}
