var dati = localStorage.getItem("dati");
var utenti = localStorage.getItem('utenti');

dati = JSON.parse(dati);
utenti = JSON.parse(utenti);

function EliminaDaDB(elem){
	return new Promise(
		(resolve, reject)=>{
			// cerco l'indice dell'elemento
			const indice = dati.findIndex((x)=>x.id == elem.id);
			// se non trovo l'elemento, termino l'esecuzione
			if(indice === -1){
				reject();
				return;
			}
			// rimuovo elemento dall'array
			dati.splice(indice, 1);
			// aggiorno localStorage
			SalvaLS();

			// termino promise
			resolve();
		}
	);
}

function SalvaLS(){
	localStorage.setItem("dati", JSON.stringify(dati));
    localStorage.setItem("utenti",JSON.stringify(utenti))
}

function registrazioneDB(dato){
    var id;
    if(utenti==undefined || utenti.length==0){
		id=0;
		utenti=[];
	}
	else{
		id=utenti[utenti.length-1].id +1
	}
    dato.id = id
    delete dato.confermaPassword
    return new Promise(
		(resolve, reject) => {
			utenti.push(dato);
			SalvaLS();
			resolve(dato);
		}
	)
}

function InserisciInDB(frase, autore){
	var id;
	if(dati==undefined || dati.length==0){
		id=0;
		dati=[];
	}
	else{
		id=dati[dati.length-1].id +1
	}
	var elem = {
		id: id, // ultimo ID della lista +1
		frase: frase,
		autore: autore
	};
	return new Promise(
		(resolve, reject) => {
			dati.push(elem);
			SalvaLS();
			resolve(elem);
		}
	)
}

function AggiornaInDB(frase, id){
	return new Promise(
		(resolve, reject)=>{
			// cerco indice dell'elemento da modificare
			const indice = dati.findIndex((x)=>x.id == id);
			// se non lo trovo reject / stop
			if(indice === -1){
				reject();
				return;
			}
			// modifico i dati
			dati[indice].frase = frase;
			// salvo su LS
			SalvaLS();
			// ritorno il dato modificato
			resolve(dati[indice]);
		}
	);
}