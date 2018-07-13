"option strict"
//new user table #
function CreateUserTable(){
    var table = document.getElementById('Side-Table');
    table.innerHTML = '';
    var row = '';
    row += '<th style="text-align: right"> Create</th><th style="text-align: left">User</th>';
    row += '<tr id="row1" ><td> First Name</td> <td><input id="fFirstName" placeholder="First Name"> </td></tr>'
    row += '<tr id="row2"><td> Last Name</td> <td><input id="fLastName" placeholder="Last Name"> </td></tr>'
    row += '<tr id="row3"><td> Email Address</td> <td><input id="fEmail" placeholder="Email Address"> </td>'
    row += '</tr><tr id="row4"><td> Username</td> <td><input id="fUserName" placeholder="Username"> </td></tr>'
    row += '<tr id="row5"><td> Password</td> <td><input id="fPassword" placeholder="Password" type="password"> </td></tr>'
    row += '<tr id="row6"><td></td><td><button class="button" onclick="create()" on-release="" >Submit</button></td></tr>'
    table.innerHTML += row;
}







//create a new user
function create(){
    var User = {
        Id:0,
        Username: document.getElementById("fUserName").value,
        Password: document.getElementById("fPassword").value,
        Firstname: document.getElementById("fFirstName").value,
        Lastname: document.getElementById("fLastName").value,
        Email: document.getElementById("fEmail").value,
        IsManager: false

    }

    $.post("http://localhost:51660/Users/Create" , User)
        .done(function(Resp){
            list();
        });//the code below will wipe the form! :p
    document.getElementById('fUserName').value = '';
    document.getElementById('fPassword').value = '';
    document.getElementById('fFirstName').value = '';
    document.getElementById('fLastName').value = '';
    document.getElementById('fEmail').value = '';

}
//creates a list of all users
function list(){
    $.getJSON('http://localhost:51660/Users/List')
    .done(function(response){
        displayAll(response.Data);
    });
}
//sorts the list of users in alphabetical order by last name.
function listsort(){
    $.getJSON('http://localhost:51660/Users/List-sort')
    .done(function(response){
        displayAll(response.Data);
    });
}
//will display each and every user only gets called by line 48 and line 55.
function displayAll(users){
    var tbody = document.getElementById("table-main");
    tbody.innerHTML = '';
    tbody.innerHTML = '<thead><th>Id</th><th>Todolist</th><th>New tasker</th><th>Username</th><th>Name</th><th>Email</th><th>Manager</th></thead>';   
    for(var user of users){
        var row ='';
        row+= "<tr>";
        row+='<td id="userid">' + user.Id + '</td>';
        row+='<td><button type="button" onclick="tasklist('+ user.Id + ');">Current</button></td>';
        row+='<td><button type="button" onclick="addtolist('+ user.Id +  ');">New</button></td>';
        row+="<td>" + user.Username + "</td>";
        row+="<td>" + user.Firstname + " "+ user.Lastname + "</td>";
        row+="<td>" + user.Email + "</td>";
        row+="<td>" + user.IsManager + "</td>";
        row+="</tr>";
        tbody.innerHTML +=row;
    }
    tbody.innerHTML += '<tr><td><button type="button" onclick="listsort();">Alphabetical Sort</td></tr>';
}
//searches through users by id in the search bar.
function find(){
    id = document.getElementById("findId").value;
    $.getJSON('http://localhost:51660/Users/Find/' + id)
    .done(function(response){
        displayfind(response.Data);
    });
}
//gets called by the function above to display a single user
function displayfind(user){
    var tbody = document.getElementById("table-main");
    tbody.innerHTML = '';
    tbody.innerHTML = '<thead><th>Id</th><th>Todolist</th><th>New tasker</th><th>Username</th><th>Name</th><th>Email</th><th>Manager</th></thead>';
        var row ='';
        row+= "<tr>";
        row+='<td id="userid">' + user.Id + '</td>';
        row+='<td><button type="button" onclick="tasklist('+ user.Id + ');">Current</button></td>';
        row+='<td><button type="button" onclick="addtolist('+ user.Id +  ');">New</button></td>';
        row+="<td>" + user.Username + "</td>";
        row+="<td>" + user.Firstname + " "+ user.Lastname + "</td>";
        row+="<td>" + user.Email + "</td>";
        row+="<td>" + user.IsManager + "</td>";
        row+="</tr>";
        tbody.innerHTML +=row + '<tr><td><button type="button" onclick="list();">Show all</td></tr>'
    }
 //add a new task for a user.
function addtolist(userID){ 
    var table =document.getElementById("Side-Table");
    table.innerHTML = '';
    table.innerHTML= ' <tbody><thead id="thead"><th style="text-align: right"> Create</th><th style="text-align: left">Tasker</th>'
    
    table.innerHTML+='<tr><td> User Id</td><td><input id="fUserId" value="'+ userID + '" readonly></td></tr>';
    table.innerHTML+='<tr><td> Description</td><td><input id="fdescription"></td></tr>';
    table.innerHTML+='<tr><td> Notes</td><td><input id="fnotes"></td></tr>';
    table.innerHTML+='<tr><td> Priority</td><td><select name="Priority" id="fpriority" type="number"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> 1 highest 5 lowest</td></tr>';
    table.innerHTML+= '<tr><td><button type="button" class="btn-sm" onclick="createuserlist();">Submit</button></td></tr></tbody>';
}

   // body.innerHTML+='<thead><th> Create tasker</th></thead>';
    //body.innerHTML+= 
    //body.innerHTML+= '<tr><td> Description</td><td><input id="fdescription" placeholder="Description"></td>';
    //body.innerHTML+='</tbody></table>'


// create new list for a user
    function createuserlist(){
        var List = {
            Id:0,
            Description: document.getElementById("fdescription").value,
            Notes: document.getElementById("fnotes").value,
            Priority: document.getElementById("fpriority").value,
            UserId: document.getElementById("fUserId").value,
            IsCompleted: false
    
        }
    
        $.post("http://localhost:51660/lists/Create" , List)
            .done(function(Resp){
                console.log(Resp.Data)
                lister();
            });
    }

    //creates a list of all tasks for everyone!
    function lister(){
        $.getJSON('http://localhost:51660/Lists/List')
    .done(function(response){
        console.log(response.Data);
        displayAlllists(response.Data);
    });

    }

    function displayAlllists(lists){
        var table = document.getElementById("table-main");
        table.innerHTML = "";
        var row = '';
        table.innerHTML+='<thead><th>Id</th><th>Priority</th><th>Description</th><th>User</th><th>Complete</th></thead>';
        for(var list of lists){
        row+= '<tr>';
        row+= '<td id="listId'+ list.Id + '">'+ list.Id + '</td>';
        row+= '<td id="listPriority'+ list.Id + '">'+ list.Priority + '</td>';
        row+= '<td id="listDescription'+ list.Id + '">'+ list.Description + '</td>';
        row+= '<td>'+ list.User.Firstname + ' ' + list.User.Lastname + '</td>';
        row+= '<td><button type="button" class="btn-sm" onclick="UpdateList('+ list.Id +')">Mark Complete</button></td>';
        row+= '</tr>';
        }
        row+= '<tr><td><button type="button" class="btn-sm" onclick="sortlists();">Sort by Priority</button></td></tr></tbody>';
        table.innerHTML += row;
    }
    function sortlists(){
        $.getJSON('http://localhost:51660/Lists/List-sort')
        .done(function(response){
            console.log(response.Data);
            displayAlllists(response.Data);
        });
    }

    function tasklist(Id){
        
        $.getJSON('http://localhost:51660/Lists/ListbyUser/' + Id)
        .done(function(response){
            console.log(response.Data)
            displayAlllistsSingleUser(response.Data)
        });
    }
    function displayAlllistsSingleUser(lists){
        var table = document.getElementById("table-main");
        table.innerHTML = "";
        var row = '';
        var id = 0;
        table.innerHTML+='<thead><th>Id</th><th>Priority</th><th>Description</th><th>Name</th><th>UserId</th><th>Notes</th><th>Complete</th></thead>';
        for(var list of lists){
        row+= '<tr>';
        row+= '<td>'+ list.Id + '</td>';
        row+= '<td><input type="number" id="listPriority'+list.Id+'" value="' +list.Priority +'" readonly></td>';
        row+= '<td><input type="text" id="listDescription'+list.Id+'" value="' +list.Description +'" readonly></td>';
        row+= '<td>'+ list.User.Firstname + ' ' + list.User.Lastname + '</td><td><input type="text" id="user_ID'+list.Id+'" value="' +list.UserId +'" readonly></td>';
        row+= '<td><input type="text" id="listNotes'+list.Id+'" value="' +list.Notes+'" readonly></td>';
        row+= '<td><button type="button" class="btn-sm" onclick="UpdateList('+ list.Id +')">Mark Complete</button></td>';
        row+= '</tr>';
        id = list.UserId;
        
        }
        row+= '<tr><td><button type="button" class="btn-sm" onclick="sortlistsSingleUser('+ id +');">Sort by Priority</button></td><td><button type="button" onclick="addtolist('+ id +  ');">New Task</button></td></tr></tbody>';
        table.innerHTML += row;
    }

    


    function sortlistsSingleUser(Id){
        
        $.getJSON('http://localhost:51660/Lists/ListbyUser-sorted/' + Id)
        .done(function(response){
            console.log(response.Data)
            displayAlllistsSingleUser(response.Data)
        });
    }

    function UpdateList(id){
        var Description = 'listDescription' + id;
        var Notes = 'listNotes' + id;
        var Priority = 'listPriority' + id;
        var user_ID = 'user_ID' + id;
        var secret = document.getElementById(user_ID).value;

        var List = {
            Id:id,
            Description : document.getElementById(Description).value,
            Notes: document.getElementById(Notes).value,
            Priority: document.getElementById(Priority).value,
            UserId: document.getElementById(user_ID).value,
            IsCompleted: true
    
        }

        $.post('http://localhost:51660/Lists/Edit', List)
        .done(function(response){
            console.log(response)
            console.log(List)
            tasklist(secret);

        });

    }
      
          
      
        
    
    
    
    
    