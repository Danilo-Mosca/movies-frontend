import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext
import CardSearchPage from "../components/CardSearchPage";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";     // importo un'icona per il messaggio personalizzato di nessun risultato trovato per la ricerca
import Loader from "../components/Loader";
import { debounce } from "lodash";      // importo debounce dalla libreria la funzione lodash

export default function MoviesSearch() {
    // Destrutturo useGlobalContext da cui prelevo le variabili di stato movies, currentPage, lastPage e la funzione getMovies() che richiama axios per l'API di tutti i film:
    const { movies, currentPage, lastPage, totalPage, getMovies, isLoading, genresList, getAllGenres } = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();     // hook che fornisce informazioni sull’URL attuale

    /* Debounce di lodash: crea una funzione debounce di lodash che viene memorizzata e non ricreata ad ogni render del componente,
    questa funzione, ritarda l’esecuzione di getMovies di 1000 millisecondi(1 secondo) dopo l’ultima chiamata.
    Utile quando l'utente digita in un campo di ricerca, per evitare chiamate API a ogni tasto premuto.
    useRef è un hook di React che mantiene un valore persistente tra i render.
    .current è la proprietà che contiene il valore effettivo, qui viene usato per memorizzare la funzione debounce in modo che non venga ricreata ad ogni render. Quindi:
    Crea una sola volta (al primo render) una funzione debounce di getMovies (che si attiva 1 secondo dopo l’ultima chiamata), la memorizza in debounceGetMovie, e con "useRef" la mantiene stabile. così che in tutti i render successivi, React riutilizza la stessa funzione, evitando sprechi e problemi di comportamento. */
    const debounceGetMovie = useRef(debounce(getMovies, 1000)).current;     // RIGA DI CODICE AGGIUNTA DOPO L'IMPORTAZIONE DELLA FUNZIONE debounce() DALLA LIBRERIA LODASH
    
    // URLSearchParams è una classe JavaScript nativa che permette di leggere e gestire i parametri della query string. Mi creo un oggetto "queryParams" da cui estraggo i valori dei parametri
    // location.search restituisce la query string, ad esempio: "?title=Matrix"
    const queryParams = new URLSearchParams(location.search);
    // console.log("queryParams: " + queryParams);

    // Prendo i valori dal query string (se presenti)
    // queryParams.get("title") restituisce il valore del parametro "title" presente nell'URL (es. "Matrix")
    // Se non esiste(null), allora con || "" la variabile "titleFromUrl" diventa una stringa vuota
    const titleFromUrl = queryParams.get("title") || "";
    const genreFromUrl = queryParams.get("genre") || "";
    const directorFromUrl = queryParams.get("director") || "";
    const actorFromUrl = queryParams.get("actor") || "";
    const yearFromUrl = queryParams.get("year") || "";
    // console.log("queryParams: " + queryFromUrl);

    // Stato filtri
    // Stato locale per memorizzare i filtri attivi (nel caso in cui il risultato di ricerca sia suddiviso in più pagine)
    const [filters, setFilters] = useState({
        title: titleFromUrl,
        genre: genreFromUrl,
        director: directorFromUrl,
        actor: actorFromUrl,
        year: yearFromUrl,
    });

    // UseEffect eseguita all'inizio per caricare tutti i generi dei film nella sua e distribuirli nella <select>
    useEffect(() => {
        getAllGenres();
    }, []);

    // Quando cambia l'URL (query params), sincronizzo i filtri nello stato
    useEffect(() => {
        setFilters({
            title: titleFromUrl,
            genre: genreFromUrl,
            director: directorFromUrl,
            actor: actorFromUrl,
            year: yearFromUrl,
        });
    }, [location.search]); // rieseguo lo useEffect ogni volta che cambia la query nell'url

    // Quando cambiano i filtri, aggiorno l'URL e faccio la ricerca da pagina 1
    useEffect(() => {
        // Costruisco la query string da filtri (escludo i vuoti)
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value.trim() !== "") {
                params.set(key, value.trim());
            }
        });

        // Aggiorno la URL senza ricaricare la pagina (pushState)
        const newSearch = params.toString();
        if (newSearch !== location.search.substring(1)) {
            navigate({
                pathname: location.pathname,
                search: newSearch,
            }, { replace: true });
        }

        // Chiamo getMovies pagina 1 con filtri aggiornati
        // getMovies(1, filters);       // vecchio codice senza la libreria lodash e senza il componente debounce
        debounceGetMovie(1, filters);   // nuovo codice con aggiunta la funzione debounceGetMovie()
    }, [filters]);  // rieseguo lo useEffect ogni volta che cambia la useState filter

    // Funzione che Aggiorna filtro e resetta pagina a 1 (ricerca live al cambio input)
    function handleFilterChange(field, value) {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Cambia pagina mantenendo filtri
    function handlePageChange(page) {
        getMovies(page, filters);
    };

    return (
        <>
            <section className="container py-4">
                <h2>Ricerca avanzata</h2>

                {/* LOADER */}
                {/* Se la variabile di stato isLoading è true, allora visualizzo il componente Loader con l'icona di caricamento, altrimenti nulla */}
                {isLoading && <Loader />}
                {/* FINE LOADER */}

                {/* COMPONENTE PAGINATION MOBILE */}
                {/* In versione mobile aggiungo la paginazione sia in alto qui: */}
                <div className="d-md-none d-flex gap-2 pb-3">
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                {/* END COMPONENTE PAGINATION MOBILE */}

                <div className="row gy-4">
                    <div className="col-sm-12 col-md-3">
                        <p style={{fontWeight: "500"}}>Form di ricerca</p>

                        {/* INPUT FILTRO TITOLO */}
                        <input
                            type="text"
                            placeholder="Titolo film"
                            value={filters.title}
                            onChange={(e) => handleFilterChange("title", e.target.value)}
                            className="form-control mb-2 filter-form"
                        />

                        {/* INPUT FILTRO GENERE */}
                        <label htmlFor="genreSelect" style={{ fontWeight: "500" }}>Seleziona un genere:</label>
                        <select
                            id="genreSelect"
                            value={filters.genre}
                            onChange={(e) => handleFilterChange("genre", e.target.value)}
                            className="form-control mb-2 filter-form"
                        >
                            <option value="">Tutti i generi</option>
                            {genresList.map((genre) => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>

                        {/* INPUT FILTRO REGISTA */}
                        <input
                            type="text"
                            placeholder="Regista"
                            value={filters.director}
                            onChange={(e) => handleFilterChange("director", e.target.value)}
                            className="form-control mb-2 filter-form"
                        />

                        {/* INPUT FILTRO ATTORE */}
                        <input
                            type="text"
                            placeholder="Attore"
                            value={filters.actor}
                            onChange={(e) => handleFilterChange("actor", e.target.value)}
                            className="form-control mb-2 filter-form"
                        />

                        {/* INPUT FILTRO ANNO */}
                        <input
                            type="number"
                            placeholder="Anno uscita"
                            value={filters.year}
                            onChange={(e) => handleFilterChange("year", e.target.value)}
                            className="form-control mb-2 filter-form"
                            min="1901"
                            max={new Date().getFullYear()}
                        />
                    </div>

                    <div className="col-sm-12 col-md-9">
                        {/* Controllo la lunghezza di movies per vedere se ritorna risultati, utile nella search dell'header nel caso in cui questa non ritornasse risultati allora mostro un messaggio personalizzato */}
                        {movies.length === 0 ? (
                            <div className="text-center w-100 mt-5">
                                <FaSadTear size={64} className="text-secondary mb-3" />
                                <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                                    <img
                                        src="/img/search-no-results.png"
                                        alt="Nessun risultato trovato"
                                        className="mb-3 m-3"
                                        style={{ maxWidth: "200px" }}
                                    />
                                    <h5 className="m-3">Nessun film trovato.</h5>
                                </div>
                                <p className="text-muted">Prova con un'altra parola chiave o modifica i filtri.</p>
                            </div>
                        ) : (
                            <div className="row">
                                <h5>
                                    <span style={{ color: "#DB2B39", fontSize: "24px", fontWeight: "500" }}>{totalPage}</span> film trovati
                                    {titleFromUrl !== "" && (
                                        <>
                                                &nbsp;per: <span style={{ color: "#DB2B39", fontSize: "24px", fontWeight: "500" }}>{'"' + titleFromUrl + '"'}</span>
                                        </>
                                    )}
                                </h5>
                                {movies.map((movie) => (
                                    <div className="col-12 col-md-6 col-lg-4 mb-3" key={movie.id}>
                                        <CardSearchPage data={movie} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* COMPONENTE PAGINATION DESKTOP */}
                {/* In versione mobile aggiungo la paginazione sia in alto come sopra che in basso come qui: */}
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={handlePageChange}
                />
                {/* END COMPONENTE PAGINATION DESKTOP */}
            </section>
        </>
    );
}