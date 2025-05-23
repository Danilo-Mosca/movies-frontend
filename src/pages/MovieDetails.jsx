// UseParams restituisce i parametri della url:
import { useParams } from "react-router-dom";

export default function MovieDetails() {
    const { slug } = useParams()  //slug: slug-del-film ricavato dall'url
    return (
        <>
            <section className="container py-4">
                <div>Pagina dettagli film. Lo slug di questo film è: {slug}</div>
            </section >
        </>
    );
}