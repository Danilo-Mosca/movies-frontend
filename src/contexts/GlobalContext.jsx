/* Creazione della GlobalContext che conterrà tutte le chiamate API al server http://127.0.0.1:8000 */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

//Api url e endpoint per axios
const apiUrl = import.meta.env.VITE_API_URL;
const posterUrl = import.meta.env.VITE_API_POSTER;
const movieEndPoint = "/movies";

const GlobalContext = createContext();  //creo il Context e gli do il nome GlobalContext

// Creo un Provider (customizzato per fornire i dati)
// Per creare un Provider dobbiamo passare i children ai componenti figli (i componenti che consumeranno i dati che gli passeremo):
const GlobalProvider = ({ children }) => {
    // Stati del Provider accessibili ai componenti Consumer che inizializzo a zero:
    // useState di tutti i film:
    const [movies, setMovies] = useState([]);
    // useState del singolo film:
    const [movie, setMovie] = useState(null); // Variabile di stato contenente il singolo film con quello slug :slug (se esistente) ottenuto dalla chiamata axios
    /* --------------- Variabili di stato per la paginazione --------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    /* --------------- Fine variabili di stato per la paginazione --------------- */

    // variabile di stato per il Loader:
    // const [isLoading, setIsLoading] = useState(false);

    // variabile di stato che controlla se è stata eseguita una ricerca (inizialmente impostata a false)
    const [isSearching, setIsSearching] = useState(false);






    /* Funzione che richiama l'API per la visualizzazione di tutti i film */
    // axios.get(`${apiUrl}${movieEndPoint}?page=${page}`)     //avrei potuto usare anche questa chiamata axios al posto di quella di seguito
    function getMovies(page = 1) {
        // axios.get(`${apiUrl}${movieEndPoint}?page=${page}`)     //avrei potuto usare anche questa chiamata axios al posto di quella di seguito
        axios.get(apiUrl + movieEndPoint, { params: { page } })
            .then((res) => {
                setMovies(res.data.results.data);
                setCurrentPage(res.data.results.current_page);
                setLastPage(res.data.results.last_page);

                console.log(res.data.results.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Finito");
            });
    }

    /* Funzione che richiama l'API per la visualizzazione del singolo film e dei vari dettagli */
    function getMovie(slug, navigate) {
        axios.get(apiUrl + "/movies/" + slug)
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                // console.log(res.data.data);
                setMovie(res.data.data);
            }).catch((error) => {
                console.log(error);
                // console.log("Errore status: " + error.status);
                // console.log("Errore response: " + error.response.status);
                // Se lo status dell'errore è 404 allora reindirizza alla NotFoundPage ( si poteva inserire anche: navigate("/url-inesistente"); )
                if (error.response?.status === 404) {
                    // L'istruzione di sopra indica: Se response esiste (grazie al "?"), controlla response.status se è 404. Se response non esiste, restituisce undefined quindi il confronto undefined === 404 è false, e il blocco if non si esegue
                    console.log("Slug del movie Not found");
                    // Se inserisco uno slug non esistente reindirizzo l'utente alla rotta "/error" che non esiste, 
                    // quindi automaticamente verrò reindirizzato alla pagina NotFoundPage.jsx
                    // In questo modo gestisco ed evito la visualizzazione della pagina dei dettagli per un film con slug inesistente:
                    navigate("/error");
                }
            }).finally(() => {
                console.log("Finito");
            });
    }

    function search() {
        setCurrentPage(1);
        getMovies(1);
        // Imposto la variabile di stato isSearching a true perchè se quando richiamo search significa che è stata fatta una ricerca
        setIsSearching(true);

    }

    // Oggetto contenente i dati da passare al value per offrirli ai Consumer (i componenti racchiusi nel Provider di GLobalContext)
    // ovvero lo useState movies e la funzione search
    const collectionData = {
        movie,
        movies,
        setMovie,
        setMovies,
        currentPage,
        setCurrentPage,
        lastPage,
        setLastPage,
        getMovie,
        getMovies
    }

    return (
        <GlobalContext.Provider value={collectionData}>{children}</GlobalContext.Provider>
    );
}

// Creo una hook customizzato (per consumare dati)
function useGlobalContext() {
    // Gli hook personalizzati utilizzano altri hook esistenti e ritornano un nuovo hook, in questo caso ritornerò GlobalContext:
    const context = useContext(GlobalContext);

    // Se per sbaglio non dovessi inserire correttamente il Provider nel file App.jsx, allora genero un errore per facilitare il debug:
    if (!context) {
        throw new Error("useGlobalContext is not inside the context provider GlobalProvider");
    }
    return context;
}

export { GlobalProvider, useGlobalContext };