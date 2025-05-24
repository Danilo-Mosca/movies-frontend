// importo l'hook UseParams che serve a estrarre i parametri dinamici dall'URL e lo useNavigate che permette la reindirizzazione manuale dell'utente alla pagina da noi desiderata
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";   // importo il GlobalContext
import CardSingleMovie from "../components/CardSingleMovie";

export default function MovieDetails() {
    // Funzione che restituisce un oggetto con tutti i parametri dinamici dell'URL, in questo caso lo slug
    const { slug } = useParams()  //slug: slug-del-film ricavato dall'url
    // Destrutturo useGlobalContext da cui prelevo la funzione getMovie() che richiama axios per l'API del singolo film:
    const { movie, getMovie } = useGlobalContext();

    // Mi creo la costante navigate e le assegno l'hook di useNavigate per permettere la reindirizzazione dell'utente alla pagina da noi desiderata
    // nello speficio reindirizzo l'utente se questo inserisce un url con un dettaglio ad un film con slug inesistente, come ad esempio:
    const navigate = useNavigate();

    // Con l'hook useEffect richiamo la funzione getMovie solo alla modifica dell'id dell'hook useParams
    useEffect(() => {
        // passo alla funzione sia lo slug che il navigate da usare come reindirizzamento in caso di errore 404 not found:
        getMovie(slug, navigate);
    }, [slug]);

    return (
        <>
            <section className="container py-4">
                <div>Pagina dettagli film. Lo slug di questo film è: {slug}</div>

                {/* Se il film non è null, cioè esiste, allora ritorno l'immagine e la descrizione dello stesso richiamando il componente CardSingleMovie */}
                {movie && (
                    <CardSingleMovie data={movie} />
                )}
            </section >
        </>
    );
}