import { useState, useEffect } from "react";
import axios from "axios";
// import { Card } from "react-bootstrap";
import Card from "./Card";
import Pagination from "./Pagination";

const apiUrl = import.meta.env.VITE_API_URL;
const movieEndPoint = "/movies";

function MainComponent() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);

    // Shortcut di useEffect se contiene solo una riga di codice
    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    function getData(page = 1) {
        axios.get(`${apiUrl}${movieEndPoint}?page=${page}`)
            .then((res) => {
                setMovies(res.data.results.data);
                setCurrentPage(res.data.results.current_page);
                setLastPage(res.data.results.last_page);

                console.log(res.data.results.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Finito");
            });
    }


    return (
        <main className="container py-3">

            <div className="d-md-none d-flex gap-2 pb-3">
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

            <div className="row gy-4">
                {movies.map((movie) => (
                    <div className="col-12 col-md-4 col-lg-3" key={movie.id}>
                        <Card data={movie} />
                    </div>
                ))}
            </div>


            {/* Pulsanti di paginazione */}
            {/* <div className="d-flex justify-content-center mt-4 gap-2">
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => getData(currentPage - 1)}
                >
                    Pagina precedente
                </button>
                <span className="align-self-center">Pagina {currentPage} di {lastPage}</span>
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === lastPage}
                    onClick={() => getData(currentPage + 1)}
                >
                    Pagina successiva
                </button>
            </div> */}

            {/* Componente Pagination */}
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={(page) => setCurrentPage(page)}
            />



        </main>
    );
}
export default MainComponent;