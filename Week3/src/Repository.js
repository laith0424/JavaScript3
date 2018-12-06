'use strict';
 
    ///////////////////////////////////////////////////////////////////////
    //////////                a parent class                 /////////////
    /////////////////////////////////////////////////////////////////////



function Repository( repository , forks , updated , description ) {
     
        this.repository = repository;

        this.forks = forks;

        this.updated = updated;

        this.description = description;

    
        Repository.prototype.getRepository = function() {
        return this.repository ;
        }


        Repository.prototype.getForks = function() {
            return this.forks ;
        }


        Repository.prototype.getUpdated = function() {
            return this.updated ;
        }


        Repository.prototype.getDescription = function() {
            return this.description ;
        }  


}
