import { useState, useEffect } from "react";
import axios from "axios";
// import { Card } from "react-bootstrap";
import Card from "./Card";

const apiUrl = import.meta.env.VITE_API_URL;
const movieEndPoint = "/movies";

function MainComponent() {
    const [movies, setMovies] = useState([]);

    // Shortcut di useEffect se contiene solo una riga di codice
    useEffect(getData, []);

    function getData() {
        axios.get(`${apiUrl}${movieEndPoint}`)
            .then((res) => {
                setMovies(res.data.results.data);
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
            <div className="row gy-4 ">
                {movies.map((movie) => (
                    <div className="col-12 col-md-4 col-lg-3" key={movie.id}>
                        <Card
                            data={movie}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
export default MainComponent;