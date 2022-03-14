function registrazione(){
    var form={
        nome:document.getElementById('nome').value,
        cognome:document.getElementById('cognome').value,
        email:document.getElementById('email').value,
        dataDiNascita:document.getElementById('dataDiNascita').value,
        password:document.getElementById('password').value,
        confermaPassword:document.getElementById('confermaPassword').value,
    }
    console.log(form);
    var errori=controllaDati(form)
    console.log(errori)
    if(errori.errore != undefined)
        printError(errori.errore)
    else{
        var err=[]
        if(!errori.maiuscolo)
            err.push("Deve essere presente una maiuscola")
        if(!errori.minisculo)
            err.push("Deve essere presente una miniscuola")
        printError(err)
    }    

    if(form.password == form.confermaPassword){
        registrazioneDB(form)
    }
    else{
        var erroriBox = document.getElementById('errori')
        printError("Le password non coincidono")
    }

}

function printError(errore){
    var erroriBox = document.getElementById("errori")
    erroriBox.innerHTML='';
    if(typeof errore == 'object')
        for(var i=0;i<errore.length;i++){
            erroriBox.innerHTML+=errore[i]+"<br>"
        }
    else
        erroriBox.innerHTML=errore;
}
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}


function controllaDati(form){
    var dataDiNascita= new Date(form.dataDiNascita)
    if(dataDiNascita.getTime() > new Date().getTime())
        return {errore : "la data di nascita non può essere futura"}
    
    var maiuscolo=false,minisculo=false,numero=false,speciale=false;

    for(var i=0;i<form.password.length;i++){
        var car=form.password[i]
        if( car == car.toUpperCase() )
            maiuscolo=true;
        if( car == car.toLowerCase() )
            minisculo=true
        if( !isNaN(parseInt(car)))
            numero=true
        if( containsSpecialChars(car))
            speciale=true
    }

    return {
        maiuscolo : maiuscolo,
        minisculo : minisculo,
        numero : numero,
        speciale : speciale
    }

}

function login(){
    var utente=undefined
    var email=document.getElementById("email").value
    var password=document.getElementById("password").value
    var erroriBox = document.getElementById("errori")
    console.log(utenti)
    for (var i=0;i<utenti.length;i++){
        var u=utenti[i];
        if(u.email==email){ //ho trovato l'utente
            utente=u;
            if(u.password==password){
                alert("LOGIN EFFETTUATO CON SUCCESSO")
            }
            else{
                printError("password sbagliata")
            }
        }
    }
    if(utente==undefined){
        printError("la mail non è registrata")
    }
}



