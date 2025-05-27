// Importo il CSS Modules della card
import style from "./CardSearchPage.module.css";
import { Link } from "react-router-dom";

/* importo le icone FaStar e FaRegStar di React dopo averle installate con il comando:
   npm install react-icons --save */
import { FaStar, FaRegStar } from "react-icons/fa";
// Mi ricavo il percorso dell'immagine:
const posterUrl = import.meta.env.VITE_API_POSTER;

function CardSearchPage({ data }) {
    // Funzione che disegna le stelle:
    const drawStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            // Controllo le star con Math.ceil che arrotonda per eccesso:
            const star = i <= Math.ceil(data.rating / 2) ? (
                // Disegno le stelle come fossero un componente e gli assegno una key:
                <FaStar key={i} />
            ) : (
                <FaRegStar key={i} />
            );
            stars.push(star);   // le riempio nell'array
        }
        return stars;
    };

    return (
        <div className={`card ${style.cardWrapper}`}>
            {/* Mobile: mostro l'immagine intera */}
            <img
                src={data.poster !== null ?
                    posterUrl + "/" + data.poster
                    :
                    `/img/poster-placeholder.webp`}
                className="d-block d-md-none card-img-top"
                alt={data.title}
            />
            {/* Tablet/Desktop: mostro l'immagine con altezza personalizzata aggiungendo la classe .cardImg*/}
            <img
                src={data.poster !== null ?
                    posterUrl + "/" + data.poster
                    :
                    `/img/poster-placeholder.webp`}
                className={`d-none d-md-block card-img-top ${style.cardImg}`}
                alt={data.title}
            />

            <div className="card-body">
                <h5 className={`card-title ${style["title-heigth"]}`}>{data.title}</h5>
                {/* Mobile: mostro la descrizione per intero: */}
                <p className="d-block d-md-none card-text">{data.description}</p>
                {/* Tablet/Desktop: mostro l'immagine la descrizione con un numero massimo di 100 caratteri e un altezza personalizzata massima di 112px tramite la classe aggiunta .description-heigth*/}
                <p className={`d-none d-md-block card-text ${style["description-heigth"]}`}>{data.description.length > 100 ? `${data.description.slice(0,100)}...` : data.description}</p>
                <div className="card-text"><strong>Regista:</strong></div>
                <div className="card-text">{data.director_id !== null ? `${data.director.first_name} ${data.director.last_name}` : "Regista non inserito"}</div>
                <div className="card-text"><strong>Nazionalità:</strong></div>
                <div className="card-text">{data.nationality !== null ? `${data.nationality}` : "Nazionalità non inserita"}</div>
                <div><strong>Media recensioni:</strong></div>
                <div>{data.rating !== null ? <div className={style.cardStar}>{drawStars()}</div> : "Media assente"}</div>
                
                <button className={`mt-3 ${style["btn-card"]}`}><Link to={`/movies/${data.slug}`}>Dettagli</Link></button>
            </div>
        </div>
    );
}
export default CardSearchPage;