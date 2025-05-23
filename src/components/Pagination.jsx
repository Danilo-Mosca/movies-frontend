function Pagination({ currentPage, lastPage, onPageChange }) {
    // Calcola l'elenco delle pagine da mostrare
    const getPages = () => {
        const pages = [];

        if (lastPage <= 7) {
            // Se le pagine totali sono poche: fino a 7, le mostro tutte
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            // Se sono nelle prime 4 pagine
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", lastPage);
            }
            // Se sono nelle ultime 4 pagine
            else if (currentPage >= lastPage - 3) {
                pages.push(1, "...", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
            }
            // Se sono in mezzo
            else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage);
            }
        }

        return pages;
    };

    // Al cambio pagina faccio lo scroll automatico in cima
    const goTo = (page) => {
        if (page !== "..." && page !== currentPage) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
            {/* MOBILE: visualizzo solo i due pulsanti di navigazione. Con d-md-none nascondo gli altri dispositivi*/}
            <div className="d-md-none d-flex gap-2">
                <button
                    className="button-pagination"
                    disabled={currentPage === 1}
                    onClick={() => goTo(currentPage - 1)}
                >
                    ← Precedente
                </button>
                <span className="align-self-center">Pagina {currentPage} di {lastPage}</span>
                <button
                    className="button-pagination"
                    disabled={currentPage === lastPage}
                    onClick={() => goTo(currentPage + 1)}
                >
                    Successiva →
                </button>
            </div>

            {/* DESKTOP: numeri + icone frecce. Con d-none escludo la visualizzazione ai dispositivi small quali gli smartphone */}
            <div className="d-none d-md-flex gap-2 flex-wrap">
                {/* Vai alla prima */}
                <button className="button-pagination previous-page" disabled={currentPage === 1} onClick={() => goTo(1)}>
                    {/* Icona Bootstrap sinistra */}
                    <i className="bi bi-chevron-double-left"></i>
                </button>
                {/* Pagina precedente */}
                <button className="button-pagination previous-page" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)}>
                    <i className="bi bi-chevron-left"></i>
                </button>

                {getPages().map((page, i) => (
                    <button
                        key={i}
                        className={`button-pagination ${page === currentPage ? "selected" : "button-pagination"}`}
                        disabled={page === "..."}
                        onClick={() => goTo(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Pagina successiva */}
                <button className="button-pagination next-page" disabled={currentPage === lastPage} onClick={() => goTo(currentPage + 1)}>
                    <i className="bi bi-chevron-right"></i>
                </button>
                {/* Vai all'ultima pagina */}
                <button className="button-pagination next-page" disabled={currentPage === lastPage} onClick={() => goTo(lastPage)}>
                    <i className="bi bi-chevron-double-right"></i>
                </button>
            </div>
        </div>
    );
}

export default Pagination;


/* ------------------------- Codice precedente ------------------------- */
// function Pagination({ currentPage, lastPage, onPageChange }) {
//     const pages = [];
//     for (let i = 1; i <= lastPage; i++) {
//         pages.push(i);
//     }

//     return (
//         <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">

//             {/* MOBILE: visibile solo da XS a SM */}
//             <div className="d-md-none d-flex gap-2">
//                 <button
//                     className="btn btn-secondary"
//                     disabled={currentPage === 1}
//                     onClick={() => onPageChange(currentPage - 1)}
//                 >
//                     Pagina precedente
//                 </button>
//                 <span className="align-self-center">Pagina {currentPage} di {lastPage}</span>
//                 <button
//                     className="btn btn-secondary"
//                     disabled={currentPage === lastPage}
//                     onClick={() => onPageChange(currentPage + 1)}
//                 >
//                     Pagina successiva
//                 </button>
//             </div>

//             {/* DESKTOP: visibile da MD in su */}
//             <div className="d-none d-md-flex gap-2 flex-wrap">
//                 {pages.map((page) => (
//                     <button
//                         key={page}
//                         className={`btn ${page === currentPage ? "btn-primary" : "btn-outline-primary"}`}
//                         onClick={() => onPageChange(page)}
//                     >
//                         {page}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Pagination;
/* ------------------------- Fine Codice precedente ------------------------- */