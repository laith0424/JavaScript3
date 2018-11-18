'use strict';


    var xhr = new XMLHttpRequest();
    xhr.open( 'GET' , 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100%27' );
    xhr.onload = function() {
        if(this.status == 200){
           var repos = JSON.parse( this.responseText);
            var output = '';
            for(var i in repos){
                output += '<option value="' + repos[i].name +'">' + repos[i].name + '</option>';
        }
        document.getElementById('reposs').innerHTML = output; 
            
        }
    }

    xhr.send();


    

document.getElementById('reposs').addEventListener("change" , loadUsers);

document.getElementById('reposs').addEventListener("change" , loadUsers2);




function loadUsers() {
    var option  = this.options[this.selectedIndex].value;



    var xhr = new XMLHttpRequest();
    xhr.open( 'GET' , 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100%27' );
    xhr.onload = function() {
        if(this.status == 200){
            var repos = JSON.parse( this.responseText);
            var output = '';
            for(var i in repos){
                if(option == repos[i].name) {
                    output = '<div class="user">' + 
                          '<ul>' + 
                          '<li><span>Repository:</span> ' + repos[i].name +'</li>' +
                          '<li><span>Description:</span> ' + repos[i].description +'</li>' +
                          '<li><span>Forks:</span> ' + repos[i].forks +'</li>' +
                          '<li><span>Updated:</span> ' + repos[i].updated_at +'</li>' +
                          '</ul>' +
                          '</div>';
                }
            }
       
            document.getElementById('users').innerHTML = output;        
        }
        else {
            document.getElementById('users').classList.add('NetwrkError');
            document.getElementById('users').innerHTML = "Netwrk error:" + this.status +' - '+ this.statusText;
        }
    }

    xhr.send();

}



function loadUsers2(){
    
    var option  = this.options[this.selectedIndex].value;
    var url = `https://api.github.com/repos/HackYourFuture/${option}/contributors`;



    var xhr = new XMLHttpRequest();
    xhr.open( 'GET' , url );
    xhr.onload = function() {
        if(this.status == 200){
            var repos = JSON.parse( this.responseText);
            var output = '';
            for(var i in repos){
                    output += '<div class="user">' + 
                          '<img src="' + repos[i].avatar_url + '" width="70" height="70">' +
                          '<ul>' + 
                          '<li><span>name:</span> ' + repos[i].login +'</li>' +
                          '<li><span>contributions:</span> ' + repos[i].contributions +'</li>' +
                          '</ul>' +
                          '</div>';
                
            }
       
            document.getElementById('users2').innerHTML = output; 
            
            
        }
        else {//.classList.add("hide-me");
            document.getElementById('users2').classList.add('NetwrkError');
            document.getElementById('users2').innerHTML = "Netwrk error:" + this.status +' - '+ this.statusText;
        }
    }

    xhr.send();
}



