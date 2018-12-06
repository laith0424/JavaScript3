'use strict';

 
const mainRepoUrl = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100%27';

function contributorUrl( option ) { 
    return `https://api.github.com/repos/HackYourFuture/${option}/contributors`;
 }


 function creatRepoSelect( parent , value , text) {

    let select = document.getElementById( parent );
    let option = document.createElement( "option" );
    option.text = text;
    option.value = value;
    select.appendChild( option )

  }


  function createAndAppend( contr  ) {

      console.log(contr);
      /*for (let i = 0 ; i < 4 ; i++) {
        console.log( Object.keys( contr[ 0 ])[ i ] )
        console.log( contr[ 0 ][ Object.keys( contr[ 0 ])[ i ] ] );
      
      } */




    ///////////////////////////////////////////////////////////////////////
    //////////             create the repo info              /////////////
    /////////////////////////////////////////////////////////////////////
      

    let repository = document.getElementById( 'repository' );
    repository.classList.remove( 'NetworkError' ); 
    repository.innerHTML = '';
    

    let div = document.createElement( 'div' );
    div.setAttribute( 'class' , 'user' );


    let ul = document.createElement( 'ul' );
    for ( let i = 0 ; i < 4 ; i++ ){
      

        let span = document.createElement( 'span' );
        span.append( Object.keys( contr[ 0 ])[ i ] + ': ' );


        let li = document.createElement( 'li' );
        li.append( span );
        li.append( contr[ 0 ][ Object.keys( contr[ 0 ])[ i ] ] );


        ul.appendChild( li );
    }


    div.appendChild( ul );

    repository.appendChild( div );

    ///////////////////////////////////////////////////////////////////////
    //////////          create the contributors info         /////////////
    /////////////////////////////////////////////////////////////////////

    
    let contributors = document.getElementById( 'Contributors' );
    contributors.classList.remove( 'NetworkError' ); 
    contributors.innerHTML = '';
    for( let i in contr ){

        let div = document.createElement( 'div' );
        div.setAttribute( 'class' , 'user' );


        let img = document.createElement( 'img' );
        img.src = contr[ i ].getAvatarUrl();
        img.setAttribute( "alt" , contr[ i ].getLogin() );

        let ul = document.createElement( 'ul' );

        let span1 = document.createElement( 'span' );
        span1.append( "name: " );


        let li1 = document.createElement( 'li' );
        li1.append( span1 );
        li1.append( contr[ i ].getLogin() );

        let span2 = document.createElement( 'span' );
        span2.append( "contributions: " );


        let li2 = document.createElement( 'li' );
        li2.append( span2 );
        li2.append( contr[ i ].getContributions() );

        ul.appendChild( li1 );
        ul.appendChild( li2 );

        div.appendChild( img );
        div.appendChild( ul );

        contributors.appendChild( div );

    }

  }


  function errorStatus( parent , status ){
    let root = document.getElementById( parent );
    root.classList.add( 'NetworkError' );
    root.innerHTML = status; 
  }


  function fetchJSON( url ) {
    return new Promise( ( resolve , reject ) => {
      const xhr = new XMLHttpRequest();
      xhr.open( 'GET', url );
      xhr.onload = () => {
        if ( xhr.status == 200 ) {
          resolve( xhr.responseText );
        } else {
          reject( new Error ( `Network error: ${xhr.status} - ${xhr.statusText}` ) );
        }
      };
      xhr.onerror = () => reject( new Error ( `Network error: ${xhr.status} - ${xhr.statusText}` ) );
      xhr.send();
    });
  }


  async function createContributorsClass( option , myRepos ){
      try{
          const responseText  = await fetchJSON( contributorUrl( option ) );
          const contri = JSON.parse( responseText  );
          let contributors = [];
          for( let i in contri ){

            let contr = new Contributor( myRepos , contri[ i ].login , contri[ i ].contributions , contri[ i ].avatar_url );

            contributors.push( contr );

           }
           createAndAppend(  contributors  );

      }
      catch(err){
        errorStatus( 'Contributors' , err );
      }

}




async  function main() {
    const option  = this.options[ this.selectedIndex ].value;
    try{ 
       const responseText  =  await fetchJSON( mainRepoUrl );
       const repos = JSON.parse( responseText  );
       let myRepos;
       for( let i in repos ){
            if( option == repos[ i ].name ) {

                myRepos = new Repository( repos[ i ].name , repos[ i ].forks , repos[ i ].updated_at , repos[ i ].description );


            }
        }
        createContributorsClass( option , myRepos);
       
     }
    catch ( err ){
        errorStatus( 'repository' , status );
    }
    
}
