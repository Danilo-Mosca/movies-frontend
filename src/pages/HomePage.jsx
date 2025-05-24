import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext
import axios from "axios";
// import { Card } from "react-bootstrap";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

const apiUrl = import.meta.env.VITE_API_URL;
const movieEndPoint = "/movies";

function MainComponent() {
    // Destrutturo useGlobalContext da cui prelevo le variabili di stato movies, currentPage, lastPage e la funzione getMovies() che richiama axios per l'API di tutti i film:
    const { movies, currentPage, setCurrentPage, lastPage, getMovies } = useGlobalContext();
    // const [movies, setMovies] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [lastPage, setLastPage] = useState(null);

    // useEffect per al primo caricamento e per il cambio pagina:
    useEffect(() => {
        getMovies(1);
    }, []);

    return (
        <main className="container py-3">

            {/* Componente Pagination */}
            {/* In versione mobile aggiungo la paginazione sia in alto qui: */}
            <div className="d-md-none d-flex gap-2 pb-3">
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(page) => getMovies(page)}
                />
            </div>

            <div className="row gy-4">
                {movies.map((movie) => (
                    <div className="col-12 col-md-4 col-lg-3" key={movie.id}>
                        <Card data={movie} />
                    </div>
                ))}
            </div>

            {/* Componente Pagination */}
            {/* In versione mobile aggiungo la paginazione sia in alto come sopra che in basso come qui: */}
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={(page) => getMovies(page)}
            />

        </main>
    );
}
export default MainComponent;