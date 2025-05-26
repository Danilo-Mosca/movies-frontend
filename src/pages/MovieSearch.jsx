import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";     // importo un'icona per il messaggio personalizzato di nessun risultato trovato per la ricerca
import Loader from "../components/Loader";

export default function MoviesSearch() {
    // Destrutturo useGlobalContext da cui prelevo le variabili di stato movies, currentPage, lastPage e la funzione getMovies() che richiama axios per l'API di tutti i film:
    const { movies, currentPage, lastPage, totalPage, getMovies, isLoading, genresList, getAllGenres } = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();     // hook che fornisce informazioni sull’URL attuale
    // URLSearchParams è una classe JavaScript nativa che permette di leggere e gestire i parametri della query string. Mi creo un oggetto "queryParams" da cui estraggo i valori dei parametri
    // location.search restituisce la query string, ad esempio: "?query=Matrix"
    const queryParams = new URLSearchParams(location.search);
    // console.log("queryParams: " + queryParams);

    // Prendo i valori dal query string (se presenti)
    // queryParams.get("query") restituisce il valore del parametro query presente nell'URL (es. "Matrix")
    // Se non esiste(null), allora con || "" la variabile "queryFromUrl" diventa una stringa vuota
    const queryFromUrl = queryParams.get("query") || "";
    const genreFromUrl = queryParams.get("genre") || "";
    const directorFromUrl = queryParams.get("director") || "";
    const actorFromUrl = queryParams.get("actor") || "";
    const yearFromUrl = queryParams.get("year") || "";
    // console.log("queryParams: " + queryFromUrl);

    // Stato filtri
    // Stato locale per memorizzare i filtri attivi (nel caso in cui il risultato di ricerca sia suddiviso in più pagine)
    const [filters, setFilters] = useState({
        query: queryFromUrl,
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
            query: queryFromUrl,
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
        getMovies(1, filters);
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
                        <p>Search bar</p>

                        {/* INPUT FILTRO TITOLO */}
                        <input
                            type="text"
                            placeholder="Titolo film"
                            value={filters.query}
                            onChange={(e) => handleFilterChange("query", e.target.value)}
                            className="form-control mb-2"
                        />

                        {/* INPUT FILTRO GENERE */}
                        <label htmlFor="genreSelect">Genere</label>
                        <select
                            id="genreSelect"
                            value={filters.genre}
                            onChange={(e) => handleFilterChange("genre", e.target.value)}
                            className="form-control mb-2"
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
                            className="form-control mb-2"
                        />

                        {/* INPUT FILTRO ATTORE */}
                        <input
                            type="text"
                            placeholder="Attore"
                            value={filters.actor}
                            onChange={(e) => handleFilterChange("actor", e.target.value)}
                            className="form-control mb-2"
                        />

                        {/* INPUT FILTRO ANNO */}
                        <input
                            type="number"
                            placeholder="Anno uscita"
                            value={filters.year}
                            onChange={(e) => handleFilterChange("year", e.target.value)}
                            className="form-control mb-2"
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
                                        src="/src/assets/img/search-no-results.png"
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
                                    {queryFromUrl !== "" && (
                                        <>
                                                &nbsp;per: <span style={{ color: "#DB2B39", fontSize: "24px", fontWeight: "500" }}>{'"' + queryFromUrl + '"'}</span>
                                        </>
                                    )}
                                </h5>
                                {movies.map((movie) => (
                                    <div className="col-12 col-md-4 col-lg-3" key={movie.id}>
                                        <Card data={movie} />
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