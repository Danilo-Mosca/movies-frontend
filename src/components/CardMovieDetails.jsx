// Importo il CSS Modules della card
import style from "./CardMovieDetails.module.css";
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
                <div>Pagina dettagli film. Lo slug di questo film è: {data.slug}</div>
            </section >
        </>
    );
}