import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext
// import { Card } from "react-bootstrap";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";     // importo un'icona per il messaggio personalizzato di nessun risultato trovato per la ricerca
import Loader from "../components/Loader";

export default function MoviesSearch() {
    // Destrutturo useGlobalContext da cui prelevo le variabili di stato movies, currentPage, lastPage e la funzione getMovies() che richiama axios per l'API di tutti i film:
    const { movies, currentPage, lastPage, totalPage, getMovies, isSearching, isLoading } = useGlobalContext();
    const location = useLocation();     // hook che fornisce informazioni sull’URL attuale
    // URLSearchParams è una classe JavaScript nativa che permette di leggere e gestire i parametri della query string. Mi creo un oggetto "queryParams" da cui estraggo i valori dei parametri
    // location.search restituisce la query string, ad esempio: "?query=Matrix"
    const queryParams = new URLSearchParams(location.search);
    console.log("queryParams: " + queryParams);
    // queryParams.get("query") restituisce il valore del parametro query presente nell'URL (es. "Matrix")
    // Se non esiste(null), allora con || "" la variabile "queryFromUrl" diventa una stringa vuota
    const queryFromUrl = queryParams.get("query") || "";
    console.log("queryParams: " + queryFromUrl);

    // useEffect per al primo caricamento e per il cambio pagina:
    useEffect(() => {
        // Se l’URL contiene una query, allora chiamo la funzione getMovies() passandogli la query con la parola da ricercare:
        if (queryFromUrl) {
            getMovies(1, queryFromUrl);
        }
            // Altrimenti se non c’è nessuna query nell’URL e non è in corso una ricerca, carico la lista di default dei film
        else if (!isSearching) {
            getMovies(1);
        }
    }, [location.search]);  // rieseguo lo useEffect ogni volta che cambia la query nell'url

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
                        onPageChange={(page) => getMovies(page)}
                    />
                </div>
                {/* END COMPONENTE PAGINATION MOBILE */}

                <div className="row gy-4">
                    <div className="col-sm-12 col-md-3">
                        <p>Search bar</p>
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
                                            &nbsp;per: <span style={{ color: "#DB2B39", fontSize: "24px", fontWeight: "500" }}>"{queryFromUrl}"</span>
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
                    onPageChange={(page) => getMovies(page)}
                />
                {/* END COMPONENTE PAGINATION DESKTOP */}
            </section>
        </>
    );
}