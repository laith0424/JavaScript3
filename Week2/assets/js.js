'use strict';


const promiseToGetXMLHttpRequest = new Promise( function( resolve , reject ){

    // Make a promise by get a XMLHttpRequest response

    const xhr = new XMLHttpRequest();
    xhr.open( 'GET' , 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100%27' );
    xhr.onload = () => {
        if (xhr.status == 200 ) {       // If successful, resolve the promise by passing back the request response as a string
            resolve(xhr.responseText);
        } else {                        // If it fails, reject the promise with a error message as a string
            reject("Network error:" + xhr.status +' - '+ xhr.statusText);
        }
    };
    xhr.onerror = () => reject("Network error:" + xhr.status +' - '+ xhr.statusText);
    xhr.send();
    
} );



promiseToGetXMLHttpRequest.then( function(responseText){            // In state  of "fulfilled"
    const repos = JSON.parse( responseText );
        var output = '';
        for(let i in repos){
            output += '<option value="' + repos[i].name +'">' + repos[i].name + '</option>';
    }
    document.getElementById('reposs').innerHTML = output;
    document.getElementById('repository').classList.remove('NetworkError');

} ).catch( function(status){                                            // In state  of "rejected"
    document.getElementById('repository').classList.add('NetworkError');
    document.getElementById('repository').innerHTML = status;   
} );



    

document.getElementById('reposs').addEventListener("change" , loadRepository);

document.getElementById('reposs').addEventListener("change" , loadUsers);



function loadRepository() {
    const option  = this.options[this.selectedIndex].value;
    const promiseToGetXMLHttpRequest = new Promise( function( resolve , reject ){  // Make a promise by get a XMLHttpRequest response
        const xhr = new XMLHttpRequest();
        xhr.open( 'GET' , 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100%27' );
        xhr.onload = () => {
            if (xhr.status == 200 ) {                           // If successful, resolve the promise by passing back the request response as a string
                resolve(xhr.responseText);
            } else {                                            // If it fails, reject the promise with a error message as a string
                reject("Network error:" + xhr.status +' - '+ xhr.statusText);
            }
        };
        xhr.onerror = () => reject("Network error:" + xhr.status +' - '+ xhr.statusText);
        xhr.send();
        
    } );



    promiseToGetXMLHttpRequest.then( function(responseText){        // In state  of "fulfilled"
        const repos = JSON.parse( responseText );
         
            var output = '';
            for(let i in repos){
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
       
        document.getElementById('repository').innerHTML = output;
        document.getElementById('repository').classList.remove('NetworkError');

    } ).catch( function(status){                                                  // In state  of "rejected"
        document.getElementById('repository').classList.add('NetworkError');
        document.getElementById('repository').innerHTML = status;   
    } );

}



function loadUsers(){
    const option  = this.options[this.selectedIndex].value;
    const url = `https://api.github.com/repos/HackYourFuture/${option}/contributors`;
    
    const promiseToGetXMLHttpRequest = new Promise( function( resolve , reject ){   // Make a promise by get a XMLHttpRequest response

        const xhr = new XMLHttpRequest();
        xhr.open( 'GET' , url );
        xhr.onload = () => {
            if (xhr.status == 200 ) {                  // If successful, resolve the promise by passing back the request response as a string
                resolve(xhr.responseText);
            } else {                                   // If it fails, reject the promise with a error message as a string
                reject("Network error:" + xhr.status +' - '+ xhr.statusText);
            }
        };
        xhr.onerror = () => reject("Network error:" + xhr.status +' - '+ xhr.statusText);
        xhr.send();
        
    } );



    promiseToGetXMLHttpRequest.then( function(responseText){          // In state  of "fulfilled"
        const repos = JSON.parse( responseText );
            //
            var output = '';
            for(let i in repos){
                output += '<div class="user">' + 
                          '<img src="' + repos[i].avatar_url + '" width="70" height="70">' +
                          '<ul>' + 
                          '<li><span>name:</span> ' + repos[i].login +'</li>' +
                          '<li><span>contributions:</span> ' + repos[i].contributions +'</li>' +
                          '</ul>' +
                          '</div>';
        }
       
        document.getElementById('users').innerHTML = output;
        document.getElementById('users').classList.remove('NetworkError');


    } ).catch( function(status){                                               // In state  of "rejected"
        document.getElementById('users').classList.add('NetworkError');
        document.getElementById('users').innerHTML = status;   
    } );

}



