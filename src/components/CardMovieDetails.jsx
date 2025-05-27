// Importo il CSS Modules della card
import style from "./CardMovieDetails.module.css";
// Importo la libreria di Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Importo le varie icone:
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext

// Creo l'array che conterrà tutti i link alle immagini:
const jumbotronImage = ["/img/jumbotron/jumbotron-cinema-1.webp", "/img/jumbotron/jumbotron-cinema-2.webp", "/img/jumbotron/jumbotron-cinema-3.webp", "/img/jumbotron/jumbotron-cinema-4.webp", "/img/jumbotron/jumbotron-cinema-5.webp", "/img/jumbotron/jumbotron-cinema-6.webp", "/img/jumbotron/jumbotron-cinema-7.webp", "/img/jumbotron/jumbotron-cinema-8.webp", "/img/jumbotron/jumbotron-cinema-9.webp", "/img/jumbotron/jumbotron-cinema-10.webp", "/img/jumbotron/jumbotron-cinema-11.webp", "/img/jumbotron/jumbotron-cinema-12.webp", "/img/jumbotron/jumbotron-cinema-13.webp", "/img/jumbotron/jumbotron-cinema-14.webp", "/img/jumbotron/jumbotron-cinema-15.webp"];

export default function CardMovieDetails({ data }) {
    // Destrutturo useGlobalContext da cui prelevo posterUrl che contiene l'url fino alla cartella del server per prelevare le immagini
    const { posterUrl } = useGlobalContext();

    /* Inserisco il numero casuale in una useState per far in modo che questo venga generato solo al montaggio iniziale del componente:
    Genero il numero casuale con la funzione Math.random per generare un numero casuale compreso tra 0 e 14 come la lunghezza dell'array: */
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * jumbotronImage.length));

    return (
        <>
            <header className={style.jumbotron}>
                <img src={jumbotronImage[randomNum]} alt={jumbotronImage[randomNum]} className={style["jumbotron-img"]} />
            </header>

            <div className={style["overlay-image-container"]}>
                <img
                    src={data.poster !== null ?
                        posterUrl + "/" + data.poster
                        :
                        `/img/poster-placeholder.webp`}
                    className={style["overlay-img"]}
                    alt={data.title}
                />
            </div>

            <section className="container py-4">
                <div className="card shadow-sm my-2">
                    <div className="card-header bg-dark text-white">
                        <h3 className="p-2" style={{ textTransform: "uppercase" }}>
                            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "white", fontSize: "30px" }} className="pe-3" />
                            {data.title}
                        </h3>
                    </div>

                    <div className="card-body">

                        {/* d-block visualizza come blocco su dispositivi piccoli (mobile).
                        d-md-flex da 768px in su (tablet e desktop), l’elemento diventa un contenitore flex.
                        justify-content-md-start e align-items-md-start → applicano l’allineamento solo da md in poi. */}
                        <div className="d-block d-md-flex justify-content-start align-items-start">

                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span style={{ fontSize: "18px", fontWeight: "400", color: "#90030f" }} className="pe-1 pe-md-5">Anno di uscita:</span>

                                <span style={{ fontSize: "18px", fontWeight: "400", color: "black" }}>{data.release_year}</span>
                        </div>

                    </div>
                </div>
            </section >
        </>
    );
}