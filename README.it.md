<p align="center">
  <a href="https://phasezero.pages.dev">
    <img src="public/social/it.png" width="840"
         alt="Phase Zero. Parti da zero. Capisci tutto." />
  </a>
</p>

<p align="center">
  Una guida aperta e multilingua agli universi cinematografici Marvel.<br />
  <strong><a href="https://phasezero.pages.dev">Si legge su phasezero.pages.dev</a></strong>
</p>

<p align="center">
  <a href="README.md">English</a> · <strong>Italiano</strong>
</p>

<img src="public/social/livery.svg" width="100%" alt="" />

> [!NOTE]
> Ogni colore qui sopra è una saga, ed è lo stesso colore ovunque un titolo di
> quella saga compaia sul sito. La scheda e la barra sono generate dai token di
> design del progetto, ed è il motivo per cui qui non c'è nessuna immagine presa
> in prestito.

## Cosa c'è dentro

Contato il 10 settembre 2026. Il colophon del sito conta le stesse cose dal
vivo, quindi se i due non concordano ha ragione il colophon e questa tabella è
vecchia.

| | | | |
|---|---|---|---|
| **161** titoli | **257** personaggi | **48** voci di glossario | **22** organizzazioni |
| **9** collezioni, 90 pezzi | **9** percorsi | **24** domande | **5** guide |
| **770** citazioni su **451** fonti | **2** lingue, complete | **894** pagine statiche | **0** script di terze parti |

---

## Cos'è

Phase Zero spiega il Marvel Cinematic Universe e gli universi collegati prodotti
da altri studi: i film Fox su X-Men e Deadpool, e quelli Sony su Spider-Man e
Venom. In tutto sono più di centosessanta tra film e serie, realizzati in quasi
vent'anni, usciti in un ordine e ambientati in un altro, da tre aziende che non
avevano sempre previsto di essere collegate.

Non è un elenco. Gli elenchi esistono già. È una guida che spiega: cosa guardare
e in che ordine, ma anche perché un personaggio diventa quello che diventa, come
si intrecciano le storie, cosa significa davvero "multiverso" e cosa si può
saltare senza rimpianti.

Quando esce un film nuovo, l'ordine di visione qui viene aggiornato e pubblicato.

## Per chi è

Per due persone contemporaneamente, e questa cosa condiziona ogni decisione del
progetto.

**Chi non ha visto niente** e si trova davanti a un muro di centosessanta titoli
chiedendosi dove sia la porta d'ingresso.

**Chi ha visto tutto** e vuole sapere perché una data in una serie contraddice
una battuta in un film, o quale fonte dice cosa.

Leggono la stessa pagina. Niente è semplificato all'osso, e niente dà per
scontato che voi sappiate già. Ogni scheda è a strati: una frase semplice per chi
arriva da zero, una lettura normale al centro, e blocchi richiudibili con la
profondità per cui l'esperto è venuto fin qui.

## Le scelte, e perché le abbiamo fatte

Sembrano piccole decisioni tecniche. Sono i motivi per cui il progetto può essere
affidabile e può crescere, quindi vale la pena metterle per iscritto.

### Fatti e prosa stanno separati

`data/` contiene quello che non cambia tra una lingua e l'altra: date, durate,
numeri di fase, ordine cronologico, relazioni tra le schede, nomi degli
interpreti. Scritto una volta, usato da tutte le lingue.

`content/<codice>/` contiene quello che va tradotto: sinossi, biografie,
definizioni del glossario, guide, stringhe di interfaccia.

L'alternativa, un file solo che contiene entrambe le cose, obbligherebbe un
traduttore a lavorare dentro un file pieno di date che non deve toccare, e
costringerebbe a correggere la stessa data separatamente in ogni lingua. Questa
separazione rende sicura la traduzione ed economica la correzione dei fatti.

### Un file per scheda

Un film è un file. Un personaggio è un file.

La versione privata precedente di questo progetto teneva tutti i film in un solo
file da quasi tremila righe. Per una persona sola funziona. Per un progetto
pubblico no: due persone che modificano due film diversi finiscono in conflitto
sullo stesso file, e chi rivede non riesce a vedere cosa è cambiato davvero.

Adesso una modifica che corregge la durata di un film tocca una riga di un file,
e si legge in pochi secondi.

### Le pagine si generano durante la build, non si assemblano nel browser

I contenuti stanno in JSON, YAML e Markdown. Nessuno scrive HTML a mano, mai. La
build legge quei file e genera una pagina statica completa per ogni indirizzo in
ogni lingua.

L'alternativa è una pagina sola che scarica un file di traduzione e sostituisce i
testi nel browser. È più semplice da mettere in piedi ed è la scelta sbagliata
qui. I motori di ricerca indicizzano la pagina prima che quel JavaScript giri,
quindi per loro le versioni tradotte praticamente non esisterebbero. Non ci
sarebbe un indirizzo condivisibile per lingua, il testo arriverebbe in ritardo, e
il sito sarebbe bianco senza JavaScript.

Generando le pagine, invece, ogni lingua ha un indirizzo vero, viene indicizzata,
si carica subito e funziona anche con JavaScript disattivato. I file che scrivono
i contributor sono identici nei due casi. Cambia solo il momento in cui il testo
incontra il modello di pagina.

### Una traduzione mancante è uno stato normale

Se una pagina non esiste ancora nella vostra lingua, vedete il testo inglese con
un avviso e un link diretto per tradurre esattamente quel file.

Niente si rompe mentre una lingua è incompleta, quindi una lingua può cominciare
con una persona sola che traduce l'interfaccia e crescere da lì. Ogni buco è un
invito.

Aggiungere una lingua vuol dire aggiungere una voce in `config/languages.json` e
creare una cartella. Nessuna modifica al codice. Se una lingua richiedesse mai di
toccare il codice, quello è il bug da sistemare.

### Ogni fatto porta la sua fonte

Ogni scheda in `data/` registra da dove vengono i suoi dati e la data in cui una
persona li ha controllati l'ultima volta.

È quello che separa un riferimento da un blog di appassionati, e ha un effetto
pratico su come funziona il progetto: la revisione diventa oggettiva. Chi rivede
non deve saperne più di chi contribuisce. Deve controllare che la fonte dica
quello che dice la scheda.

Quando le fonti sono in disaccordo, si registrano entrambe e il disaccordo viene
spiegato invece che nascosto. Quelle contraddizioni sono reali, e per i lettori
più appassionati sono spesso la cosa più interessante della pagina.

### Nessuna immagine di terzi

Niente locandine, niente loghi degli studi, niente materiale promozionale,
niente fotogrammi.

Sono materiali protetti da copyright. Ospitarli esporrebbe il progetto, e
costringerebbe chiunque ne faccia una copia a ereditare quel rischio. Al loro
posto, l'identità visiva è costruita con grafica vettoriale generata a partire
dai dati di questo repository.

C'è un effetto collaterale che ci piace: il sito somiglia a se stesso, invece che
a tutti gli altri siti costruiti sulle stesse foto promozionali.

L'unico segno che viene da fuori è il logo di GitHub nel piè di pagina, disegnato
come SVG in questo repository e usato soltanto per rimandare qui. La regola
riguarda i film, e tutto ciò che è di qualcun altro.

### I vostri progressi restano nel vostro browser

Potete segnare quello che avete già visto, e lo ritrovate la volta dopo che
aprite il sito nello stesso browser. Farsi centosessanta titoli richiede mesi, e
perdere il segno a ogni visita renderebbe la guida molto meno utile.

Succede interamente nella memoria del browser. Niente viene mandato da nessuna
parte, non c'è nessun account da creare, e il progetto non viene mai a sapere
cosa avete visto. Il compromesso va detto chiaramente: se cancellate i dati del
browser o passate a un altro dispositivo, i segni spariscono, perché non
esisteva nessun altro posto in cui tenerli senza raccoglierli. Per spostare i
progressi tra dispositivi si esporta un piccolo file e lo si importa dall'altra
parte, senza server e senza account.

Tutto il resto è statico. Nessun backend da mantenere o pagare, nessuna analitica
che identifichi qualcuno, e nessuno script di terze parti che non serva a
disegnare la pagina.

### Niente emoji, niente em dash

È una regola di stile della casa, applicata senza eccezioni.

Il motivo per non fare eccezioni è che così una questione di gusto diventa una
cosa che uno script può controllare, e non deve più essere discussa in revisione.
La build rifiuta entrambi. Le icone sono SVG. Il trattino medio è ammesso solo
tra cifre, come in 2008–2012.

### Due licenze

Il codice è MIT. I contenuti sono CC BY-SA 4.0.

Il codice deve essere il più riutilizzabile possibile, quindi è permissivo. I
contenuti sono conoscenza collaborativa, quindi restano aperti: potete usarli
ovunque, anche commercialmente, a patto di citare il progetto e di mantenere la
stessa licenza sulle vostre modifiche. È la stessa scelta di Wikipedia, per la
stessa ragione.

## Struttura

```
config/     lingue e impostazioni del sito
data/       fatti, un file per scheda, indipendenti dalla lingua
  titles/
  characters/
content/    prosa, una cartella per lingua
  en/
  it/
src/        codice, senza nessun testo scritto dentro
scripts/    le verifiche che la CI esegue, e cosa scrive la build dopo
public/     file serviti così come sono, comprese le schede di anteprima
```

Ecco un film attraverso tutto il sistema.

`data/titles/iron-man.yml`, scritto una volta sola per tutte le lingue. È il
file vero, senza i campi che per questo titolo sono vuoti:

```yaml
id: iron-man
type: film
universe: earth-616
franchise: iron-man
saga: infinity
phase: 1
tier: essential

release:
  date: 2008-05-02
  runtime: 126
  status: released

chronology:
  order: 600
  setting: "2010"
  source: "https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe_timeline"

requires: []
leadsTo:
  - the-avengers

sources:
  - url: https://en.wikipedia.org/wiki/Iron_Man_(2008_film)
    title: Iron Man (2008 film), Wikipedia
    accessed: 2026-09-07
  - url: https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe_timeline
    title: Marvel Cinematic Universe timeline, Wikipedia
    accessed: 2026-09-07
verified: 2026-09-07
```

`content/it/titles/iron-man.md`, la prosa:

```markdown
---
title: Iron Man
oneLine: Un fabbricante di armi costruisce un'armatura volante per scappare dai
  suoi sequestratori, e poi la usa contro le armi vendute dalla sua azienda.
tagline: Il film da cui è cominciato tutto
---

Tony Stark ha ereditato un'azienda di armi e non se l'è mai chiesto. È
brillante, ricco e del tutto disinteressato a cosa succede dopo che una
spedizione esce dalla fabbrica. Finisce quando lo attaccano durante una
dimostrazione in Afghanistan, ferito da un suo stesso ordigno e chiuso in una
grotta da chi quell'ordigno lo aveva comprato.

:::detail{title="Perché conta"}
È il film che ha stabilito il formato dell'universo condiviso, e la scena dopo i
titoli di coda è la prima volta in cui quel piano viene detto ad alta voce.
:::
```

`content/en/titles/iron-man.md` ha la stessa forma con frasi in inglese. Chi
traduce copia il file inglese e lo traduce. Non serve toccare codice.

## Come si esegue in locale

Serve Node 20 o superiore.

```sh
git clone https://github.com/synaps3s/phase-zero.git
cd phase-zero
nvm use
npm install
npm run dev
```

Il sito è su http://localhost:4321.

Prima di aprire una pull request:

```sh
npm run validate
```

Per correggere un dato o tradurre una pagina non serve niente di tutto questo:
si può fare interamente dal sito di GitHub.

## Contribuire

Sono benvenuti tutti, comprese le persone che non hanno mai aperto una pull
request.

La guida completa è in [CONTRIBUTING.md](CONTRIBUTING.md), la versione breve in
[CLAUDE.md](CLAUDE.md). Il [codice di condotta](CODE_OF_CONDUCT.md) vale per
chiunque partecipi.

Il contributo più piccolo e comunque utile è aprire una segnalazione su qualcosa
che sembra sbagliato. Serve davvero, e vi costa due minuti.

Chi ha migliorato il catalogo senza aprire una pull request è registrato in
[CREDITS.md](CREDITS.md).

## Licenze

Il codice è sotto [MIT](LICENSE). I contenuti sono sotto
[CC BY-SA 4.0](LICENSE-CONTENT).

## Avvertenza

Phase Zero è un progetto non ufficiale, realizzato da appassionati. Non è
affiliato, approvato o sponsorizzato da Marvel Studios, The Walt Disney Company,
20th Century Studios, Sony Pictures o da nessuna delle loro società controllate.

Tutti i titoli di film e serie, i nomi dei personaggi e i marchi appartengono ai
rispettivi proprietari e sono usati qui a fini di identificazione e commento.
