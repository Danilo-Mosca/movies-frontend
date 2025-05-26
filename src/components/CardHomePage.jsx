// Importo il CSS Modules della card
import style from "./CardHomePage.module.css";
import { Link } from "react-router-dom";

/* importo le icone FaStar e FaRegStar di React dopo averle installate con il comando:
   npm install react-icons --save */
import { FaStar, FaRegStar } from "react-icons/fa";
// Mi ricavo il percorso dell'immagine:
const posterUrl = import.meta.env.VITE_API_POSTER;

function CardHomePage({ data }) {
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
        <div className={`card ${style.cardWrapper} ${style.cardEffect}`}>
            <img
                src={data.poster !== null ?
                    posterUrl + "/" + data.poster
                    :
                    `/img/poster-placeholder.webp`}
                className={`card-img-top ${style.cardImg}`}
                alt={data.title}
            />

            <div className={`card-body ${style.cardInner}`}>
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description}</p>
                <div className="card-text">Regista:</div>
                <p className="card-text">{data.director_id !== null ? `${data.director.first_name} ${data.director.last_name}` : "Regista non inserito"}</p>
                <div className="card-text">Nazionalità:</div>
                <div className="card-text text-uppercase">{data.nationality}</div>
                <div>Media recensioni:</div>
                <div className={style.cardStar}>{drawStars()}</div>
                <button className={`mt-3 ${style["btn-card"]}`}><Link to={`/movies/${data.slug}`}>Dettagli</Link></button>
            </div>
        </div>
    );
}
export default CardHomePage;