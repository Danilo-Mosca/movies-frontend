function Pagination({ currentPage, lastPage, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
    }

    return (
        <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">

            {/* MOBILE: visibile solo da XS a SM */}
            <div className="d-md-none d-flex gap-2">
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Pagina precedente
                </button>
                <span className="align-self-center">Pagina {currentPage} di {lastPage}</span>
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Pagina successiva
                </button>
            </div>

            {/* DESKTOP: visibile da MD in su */}
            <div className="d-none d-md-flex gap-2 flex-wrap">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`btn ${page === currentPage ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Pagination;
