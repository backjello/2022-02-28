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
    console.log(controllaDati(form));

    if(form.password == form.confermaPassword){
        registrazioneDB(form)
    }
    else{
        var erroriBox = document.getElementById('errori')
        erroriBox.innerHTML="Le password non coincidono"
    }

}

function controllaDati(form){
    var dataDiNascita= new Date(form.dataDiNascita)
    if(dataDiNascita.getTime() > new Date().getTime())
        return {errore : "la data di nascita non può essere futura"}
    
    var maiuscolo=false,minisculo=false,numero=false,speciale=false;

    for(var i=0;i<form.password.length;i++){
        var car=form.password[i]
        var num = parseInt(car);
        if( car == car.toUpperCase() )
            maiuscolo=true;
        if( car == car.toLowerCase() )
            minisculo=true
        if (typeof parseInt(car) != typeof NaN){
            numero=true
        }
        
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
                erroriBox.innerHTML="password sbagliata"
            }
        }
    }
    if(utente==undefined){
        erroriBox.innerHTML="la mail non è registrata"
    }
}



