import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext
// import { Card } from "react-bootstrap";
import CardHomePage from "../components/CardHomePage";
import Pagination from "../components/Pagination";
import { FaSadTear } from "react-icons/fa";     // importo un'icona per il messaggio personalizzato di nessun risultato trovato per la ricerca
import Loader from "../components/Loader";

function HomePage() {
    // Destrutturo useGlobalContext da cui prelevo le variabili di stato movies, currentPage, lastPage e la funzione getAllMovies() che richiama axios per l'API di tutti i film:
    const { movies, currentPage, lastPage, totalPage, getAllMovies, isSearching, isLoading } = useGlobalContext();

    // useEffect per al primo caricamento e per il cambio pagina:
    useEffect(() => {
            getAllMovies(1);
    }, [isSearching]);

    return (
        <main className="container py-3">

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
                    onPageChange={(page) => getAllMovies(page)}
                />
            </div>
            {/* END COMPONENTE PAGINATION MOBILE */}

            <div className="row gy-4">
                {/* Controllo la lunghezza di movies per vedere se ritorna risultati, utile nella search dell'header nel caso in cui questa non ritornasse risultati allora mostro un messaggio personalizzato.
                IMPORTANTE: eseguo un altro confronto con la variabile di stato "isSearching" importata dal GlobalContext perchè mi servirà come messaggio personalizzato al primo caricamento, ovvero quando viene montata la pagina HomePage.jsx */}
                {movies.length === 0 && isSearching ?
                    (<div className="text-center w-100 mt-5">
                        <FaSadTear size={64} className="text-secondary mb-3" />
                        <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                            <img src="/src/assets/img/search-no-results.png" alt="Nessun risultato trovato" className="mb-3 m-3" style={{ maxWidth: "200px" }} />
                            <h5 className="m-3">Nessuno risultato trovato per la tua ricerca!</h5>
                        </div>
                        <p className="text-muted">Prova con qualcos'altro!</p>
                    </div>
                    )
                    : (movies.length === 0 && !isSearching ?
                        (
                            <div className="text-center w-100 mt-5">
                                <h2>Caricamento in corso... nessun film disponibile.</h2>
                            </div>
                        )
                        :
                        (
                            <>
                                <h5><span style={{ color: "#DB2B39", fontSize: "24px", fontWeight: "500" }}>{totalPage}</span> film presenti</h5>
                                {movies.map((movie) => (
                                    <div className="col-12 col-md-4 col-lg-3" key={movie.id}>
                                        <CardHomePage data={movie} />
                                    </div>
                                ))}
                            </>
                        )
                    )
                }
            </div>

            {/* COMPONENTE PAGINATION DESKTOP */}
            {/* In versione mobile aggiungo la paginazione sia in alto come sopra che in basso come qui: */}
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={(page) => getAllMovies(page)}
            />
            {/* END COMPONENTE PAGINATION DESKTOP */}

        </main>
    );
}
export default HomePage;