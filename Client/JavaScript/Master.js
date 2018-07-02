"option strict"
//create a new user function User.html line 53
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
//will display each and every user only gets called by the function above.
function displayAll(users){
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
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
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
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
 // 
function addtolist(userID){ 
    var table =document.getElementById("div2");
    table.innerHTML = '';
    table.innerHTML= ' <tbody><thead id="thead"><th style="text-align: right"> Create</th><th style="text-align: left">Tasker</th>'
    
    table.innerHTML+='<tr><td> User Id</td><td><input id="fUserId" value="'+ userID + '" readonly></td></tr>';
    table.innerHTML+='<tr><td> Description</td><td><input id="fdescription"></td></tr>';
    table.innerHTML+='<tr><td> Notes</td><td><input id="fnotes"></td></tr>';
    table.innerHTML+='<tr><td> Priority</td><td><input id="fpriority" type="number"></td></tr>';
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
        table.innerHTML+='<thead><th>Id</th><th>Priority</th><th>Description</th><th>User</th></thead>';
        for(var list of lists){
        row+= '<tr>';
        row+= '<td>'+ list.Id + '</td>';
        row+= '<td>'+ list.Priority + '</td>';
        row+= '<td>'+ list.Description + '</td>';
        row+= '<td>'+ list.User.Firstname + ' ' + list.User.Lastname + '</td></tr>';
        
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
        table.innerHTML+='<thead><th>Id</th><th>Priority</th><th>Description</th><th>User</th></thead>';
        for(var list of lists){
        row+= '<tr>';
        row+= '<td>'+ list.Id + '</td>';
        row+= '<td>'+ list.Priority + '</td>';
        row+= '<td>'+ list.Description + '</td>';
        row+= '<td>'+ list.User.Firstname + ' ' + list.User.Lastname + '</td></tr>';
        id = list.UserId;
        
        }
        row+= '<tr><td><button type="button" class="btn-sm" onclick="sortlistsSingleUser('+ id +');">Sort by Priority</button></td></tr></tbody>';
        table.innerHTML += row;
    }

    


    function sortlistsSingleUser(Id){
        
        $.getJSON('http://localhost:51660/Lists/ListbyUser-sorted/' + Id)
        .done(function(response){
            console.log(response.Data)
            displayAlllistsSingleUser(response.Data)
        });
    }
      
          
      
        
    
