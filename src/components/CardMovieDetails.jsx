// Importo il CSS Modules della card
import style from "./CardMovieDetails.module.css";
// Importo la libreria di Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Importo le varie icone:
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
/* importo le icone FaStar e FaRegStar di React dopo averle installate con il comando:
   npm install react-icons --save */
import { FaStar, FaRegStar } from "react-icons/fa";
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

    // Funzione che disegna le stelle:
    function drawStars() {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            // Controllo le star con Math.ceil che arrotonda per eccesso:
            const star = i <= Math.ceil(data.rating / 2) ? (
                // Disegno le stelle come fossero un componente e gli assegno una key:
                <FaStar key={i} style={{ fontSize: "26px" }} />
            ) : (
                <FaRegStar key={i} style={{ fontSize: "26px" }} />
            );
            stars.push(star);   // le riempio nell'array
        }
        return stars;
    };

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

                    <article className="card-body">

                        {/* d-block visualizza come blocco su dispositivi piccoli (mobile).
                        d-md-flex da 768px in su (tablet e desktop), l’elemento diventa un contenitore flex.
                        justify-content-md-start e align-items-md-start → applicano l’allineamento solo da md in poi. */}

                        {/* --------------------------------- Anno di uscita ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Anno di uscita:</span>
                            </span>
                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>{data.release_year}</span>
                        </div>

                        {/* --------------------------------- Durata ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Durata:</span>
                            </span>
                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>{data.duration} minuti</span>
                        </div>

                        {/* --------------------------------- Genere ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Genere:</span>
                            </span>

                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>
                                {data.genres.length > 0 ?
                                    (
                                        data.genres.map((genre, index) => (
                                            index < data.genres.length - 1 ? (
                                                <span key={genre.name} style={{ color: "black" }} className={style["span-content"]}>{genre.name},&nbsp;</span>
                                            ) : <span key={genre.name} style={{ color: "black" }} className={style["span-content"]}>{genre.name}</span>
                                        ))
                                    )
                                    : ("Genere non inserito")}
                            </span>
                        </div>

                        {/* --------------------------------- Nazionalità ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Nazionalità del film:</span>
                            </span>

                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>
                                {data.director !== null ?
                                    (
                                        <span style={{ color: "black" }} className={style["span-content"]}>{data.nationality}</span>
                                    )
                                    : ("Non inserita")}
                            </span>
                        </div>

                        {/* --------------------------------- Descrizione ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Descrizione:</span>
                            </span>
                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>{data.description}</span>
                        </div>

                        {/* --------------------------------- Regista ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Regista:</span>
                            </span>

                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>
                                {data.director !== null ?
                                    (
                                        <span style={{ color: "black" }} className={style["span-content"]}>{data.director.first_name} {data.director.last_name}</span>
                                    )
                                    : ("Regista non inserito")}
                            </span>
                        </div>

                        {/* --------------------------------- Attori ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span className={`pe-1 ${style["span-content"]}`}>Attori:</span>
                            </span>

                            <span style={{ color: "black" }} className={`col-md-8 ${style["span-content"]}`}>
                                {data.actors.length > 0 ?
                                    (
                                        data.actors.map((actor, index) => (
                                            index < data.actors.length - 1 ? (
                                                <span key={actor.index} style={{ color: "black" }} className={style["span-content"]}>{actor.first_name} {actor.last_name},&nbsp;</span>
                                            ) : <span key={actor.index} style={{ color: "black" }} className={style["span-content"]}>{actor.first_name} {actor.last_name}</span>
                                        ))
                                    )
                                    : ("Attori non inseriti")}
                            </span>
                        </div>

                        {/* --------------------------------- Voto ---------------------------------*/}
                        <div className="d-block d-md-flex justify-content-start align-items-center mb-4">
                            <span className="col-md-4">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black", fontSize: "26px" }} className="pe-3" />
                                <span style={{ color: "#90030f" }} className={`pe-2 ${style["span-content"]}`}>Voto:</span>
                            </span>

                            <span className={`col-md-8 ${style["span-content"]} ${style.cardStar}`}>
                                {data.rating !== null ?
                                    (
                                        <span className="align-top">{drawStars()}</span>
                                    )
                                    : ("Voto non inserito")}
                            </span>
                        </div>

                    </article>
                </div>
            </section >
        </>
    );
}