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
    if(!errori){
        //ok
        registrazioneDB(form);
        window.location.href="login.html";
    }
    else{
        // errori
        if(errori.errore != undefined)
            printError(errori.errore)
        else{
            var err=[]
            if(!errori.maiuscolo)
                err.push("Deve essere presente una maiuscola")
            if(!errori.minisculo)
                err.push("Deve essere presente una miniscuola")
            if(!errori.numero)
                err.push("Deve essere presente un numero")
            if(!errori.speciale)
                err.push("Deve essere presente un carattere speciale")
            printError(err)
        }  
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
    //check password
    if(form.password != form.confermaPassword)
        return {errore : "Le password non coincidono"}

    //check lunghezza password
    if(form.password.length<8)
        return {errore : "La password deve essere lunga almeno 8 caratteri"}

    //check date
    var dataDiNascita= new Date(form.dataDiNascita)
    if(dataDiNascita.getTime() > new Date().getTime())
        return {errore : "la data di nascita non può essere futura"}
    
    var maiuscolo=false,minisculo=false,numero=false,speciale=false;

    //check password char
    for(var i=0;i<form.password.length;i++){
        var car=form.password[i]
        if( containsSpecialChars(car) )
            speciale=true
        else if( !isNaN(parseInt(car)))
            numero=true
        else if( car == car.toUpperCase() )
            maiuscolo=true;
        else if( car == car.toLowerCase() )
            minisculo=true
    }

    if(maiuscolo && minisculo && numero && speciale)
        return false

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

    
    if(email.length==0 || password.length==0)
        printError("Compila tutti i campi")

    for (var i=0;i<utenti.length;i++){
        var u=utenti[i];
        if(u.email==email){ //ho trovato l'utente
            utente=u;
            if(u.password==password){
                goToPage("home.html")
                return utente;
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


function goToPage(page){
    window.location.href=page
}
