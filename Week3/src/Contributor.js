'use strict';
 
    ///////////////////////////////////////////////////////////////////////
    //////////                a child class                  /////////////
    /////////////////////////////////////////////////////////////////////



function Contributor( repos , login , contributions , avatarUrl ) {

        Repository.call(this, repos.repository , repos.forks , repos.updated , repos.description);

        this.login = login;

        this.contributions = contributions;
        
        this.avatarUrl = avatarUrl;
    


        Contributor.prototype.getLogin = function() {
        return this.login ;
        }


        Contributor.prototype.getContributions = function() {
            return this.contributions ;
        }


        Contributor.prototype.getAvatarUrl = function() { 
            return this.avatarUrl ;
        }  


}

