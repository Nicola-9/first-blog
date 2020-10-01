var firstFakeArticle = null;
var secondFakeArticle = null;
var thirdFakeArticle = null;

function getRandomArticles(){  
    let articles = [];

    fakeArticleInitialize();

    articles.push(firstFakeArticle, secondFakeArticle, thirdFakeArticle);

    return articles;
}

const fakeArticleInitialize = () =>{
    firstFakeArticle = new Article(
        "Il caso dell'articolo fantasma citato 400 volte", 
        "Un articolo scientifico è salito agli onori della cronaca per aver ricevuto quasi 400 citazioni" +
        " in altrettanti studi. C'è un solo problema: non è mai stato scritto. La vicenda della fonte bibliografica" +
        " fantasma è stata notata la prima volta da Pieter Kroonenberg, professore emerito di Statistica dell'Università" + 
        " di Leida, Olanda, e risolta dalla collega Anne-Wil Harzing (che ne ha scritto in questo post)." + 
        " Sfogliando il manuale di stile destinato agli autori dell'editore scientifico Elsevier, Kroonenberg ha trovato" + 
        " la citazione: 'Van der Geer, J., Hanraads, J.A.J., Lupton, R.A., 2000. The art of writing a scientific article." + 
        " Journal of Science Communications 163 (2) 51-59'. Qualcosa gli è sembrato da subito strano: conosceva un John" + 
        " Van de Geer, ma non sapeva che oltre ad essere un esperto di psicologia sperimentale desse anche lezioni" +
        " sull'arte di scrivere articoli scientifici. Poi si è accorto dell'errore di spelling: il suo collega si" +
        " chiama Van de Geer e non Van der Geer, come indicato nella citazione. E poi, la rivista: esiste un Journal of" + 
        " Science Communication, ma si scrive senza la 's' finale. Dopo avere cercato invano il 'paper' si è accorto" +
        " che non esisteva. Ciò nonostante, dalle ricerche su Google Scholar risultava citato in quasi 400 altri articoli" +
        " (soprattutto di Paesi con poca dimestichezza con la lingua inglese). Come era stato possibile?" +
        " La spiegazione è semplice e disarmante: quello sulla guida dell'editore Elsevier era un esempio," +
        " un facsimile di citazione bibliografica da usare come modello a cui uniformare le proprie. Gli autori" +
        " distratti l'hanno copiato e incollato nella bibliografia per imitarne la formattazione, e poi si sono" +
        " dimenticati di toglierlo. Il caso è stato diffuso come esempio della poca accuratezza - anche in termini di" +
        " editing - di alcune pubblicazioni scientifiche. Ogni normale scienziato si accontenterebbe di raggiungere" + 
        " anche uno solo di questi risultati nell'intera carriera. Per Einstein, invece, era solo l'inizio.",
        true         
    ); 

    secondFakeArticle = new Article(
        "8 articoli scientifici rifiutati prima del Nobel",
        "Per uno scienziato al lavoro da anni sugli stessi dati, ci sono poche cose più frustranti di vedersi" +
        ' respingere un articolo da una rivista importante. Ma la peer review ("revisione paritaria"), cioè il' + 
        " processo di valutazione e correzione che precede la pubblicazione di una ricerca, è parte fondamentale" +
        " del processo e del progresso scientifico, e - quasi sempre - garanzia di correttezza e imparzialità." +
        " Non deve dunque stupire che alcuni dei paper premiati con il Nobel abbiano dovuto sopportare, prima della" +
        ' gloria, una o più "rejection", cioè che siano stati scartati prima di essere migliorati e pubblicati su' +
        " una rivista più appropriata. Ecco alcuni esempi di lavori scientifici fondamentali con una storia di" +
        " rifiuti alle spalle." +
        "\n1. IL LAVORO DI ENRICO FERMI SULL'INTERAZIONE DEBOLE.\nL'interazione o forza debole, una delle quattro" +
        " interazioni fondamentali presenti in natura, fu descritta per la prima volta dal fisico italiano Enrico" + 
        " Fermi nel 1933, in un articolo sull'inquadramento teorico del decadimento beta (un tipo di decadimento" + 
        " radioattivo) pubblicato sulla rivista tedesca Zeitschrift für Physik. In precedenza l'articolo era stato" +
        ' scartato da Nature perché "troppo lontano dalla realtà per essere di interesse per il lettore".' +
        " Cinque anni dopo, nel 1938, quel lavoro costituì la base teorica del Nobel per la Fisica assegnato a Fermi," +
        " per la scoperta della radioattività artificiale prodotta da irradiazione neutronica.",
        true
    );

    thirdFakeArticle = new Article(
        "Il 1905, l'anno d'oro di Albert Einstein",
        "1. FOTONI\nNel primo lavoro, pubblicato a marzo, Einstein sosteneva che la luce, che fino ad allora si" +
        ' pensava diffondersi in onde, fosse costituita di un numero finito di quanti di energia (in seguito denominati' + 
        " fotoni) che si muovono nello Spazio. Einstein portava questa teoria per spiegare l'effetto fotoelettrico," + 
        " il fenomeno per cui una superficie metallica, colpita da una radiazione elettromagnetica, emette elettroni." +
        " La sua ipotesi - che gli valse il Nobel per la Fisica nel 1921 - sarebbe divenuta, 20 anni dopo, una colonna" + 
        " portante del dualismo onda-particella della luce." +
        "\n\n2. ATOMI\nA maggio fu la volta di un articolo sul moto browniano (il moto disordinato delle particelle" +
        " presenti nei fluidi): Einstein partiva dall'osservazione di questo fenomeno per dimostrare che gli atomi" +
        " esistono realmente, un punto su cui fino ad allora si era discusso molto." +
        "\n\n3. SPAZIOTEMPO\nGiugno fu il mese della Teoria della Relatività ristretta, in base alla quale la velocità" +
        " dell'osservatore influenza anche la percezione del prima e del dopo, e quindi lo scorrere del tempo non è" +
        " universale: la luce rimane costante, spazio e tempo divengono un'entità fluida relativa all'osservatore." +
        "\n\n4. E=MC²\nLa teoria sarebbe stata completata con il quarto articolo, pubblicato nel settembre 1905," +
        " che enunciava l'equazione più famosa di sempre, E=mc²: esiste una relazione fissa tra energia e massa;" +
        " la prima equivale alla seconda moltiplicata per il quadrato della velocità della luce." +
        "\nOgni normale scienziato si accontenterebbe di raggiungere anche uno solo di questi risultati nell'intera" +
        " carriera. Per Einstein, invece, era solo l'inizio.",
        true
    );
};