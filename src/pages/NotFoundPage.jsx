import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <section className="container p-5">
            <div className="row pb-3 align-items-center">
                <div className="col-12 col-md-6">
                    <img
                        src="/img/clapperboard-page-not-found.png"
                        alt="Logo Movie App"
                        className="p-5"
                    />
                </div>
                <div className="col-12 col-md-6 text-center text-lg-start">
                    <h1 id="homepage-text">OPS! Film o pagina non trovata!</h1>
                    <p className="pt-3 pb-3">Non sono riuscito a trovare la pagina o il film che cercavi!</p>
                    <Link to="/" className="btn-not-found">Torna alla Homepage!</Link>
                    {/* style={{ width: "100%", height: "400px" }} */}
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;