function Pagination({ currentPage, lastPage, onPageChange }) {
    const getPages = () => {
        const pages = [];

        if (lastPage <= 7) {
            // Se le pagine totali sono poche, mostro tutte
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", lastPage);
            } else if (currentPage >= lastPage - 3) {
                pages.push(1, "...", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage);
            }
        }

        return pages;
    };

    const goTo = (page) => {
        if (page !== "..." && page !== currentPage) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
            {/* MOBILE: solo pulsanti */}
            <div className="d-md-none d-flex gap-2">
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => goTo(currentPage - 1)}
                >
                    ← Precedente
                </button>
                <span className="align-self-center">Pagina {currentPage} di {lastPage}</span>
                <button
                    className="btn btn-secondary"
                    disabled={currentPage === lastPage}
                    onClick={() => goTo(currentPage + 1)}
                >
                    Successiva →
                </button>
            </div>

            {/* DESKTOP: numeri + frecce */}
            <div className="d-none d-md-flex gap-2 flex-wrap">
                <button className="button next-prev-page" disabled={currentPage === 1} onClick={() => goTo(1)}>
                    «
                </button>
                <button className="button next-prev-page" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)}>
                    ‹
                </button>

                {getPages().map((page, i) => (
                    <button
                        key={i}
                        className={`button ${page === currentPage ? "selected" : "button"}`}
                        disabled={page === "..."}
                        onClick={() => goTo(page)}
                    >
                        {page}
                    </button>
                ))}

                <button className="button next-prev-page" disabled={currentPage === lastPage} onClick={() => goTo(currentPage + 1)}>
                    ›
                </button>
                <button className="button next-prev-page" disabled={currentPage === lastPage} onClick={() => goTo(lastPage)}>
                    »
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