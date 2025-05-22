import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className=" d-flex justify-content-center align-items-center flex-column text-position-h1-p">
            <h1 id="homepage-text">Errore 404</h1>
            <p className="pt-sm-5" id="homepage-p">Pagina non trovata, torna alla <i><Link to="/">Homepage!</Link></i></p>
        </div>
    );
}

export default NotFoundPage;