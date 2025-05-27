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
    const [genresList, setGenresList] = useState([]);   // Stato per lista generi dal backend
    /* --------------- Variabili di stato per la paginazione --------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    /* --------------- Fine variabili di stato per la paginazione --------------- */

    // variabile di stato per il Loader:
    const [isLoading, setIsLoading] = useState(false);
    // searchQuery è una stringa vuota "" inizialmente, quindi: !!searchQuery; -> false
    // se invece searchQuery è una stringa non vuota, allora:   !!"qualcosa" è true
    // Quindi isSearching indica se è attiva una ricerca, cioè se la query non è vuota.
    const isSearching = !!searchQuery;

    useEffect(() => {
        getMovies();
    }, []);

    /* Funzione che richiama l'API per la visualizzazione di tutti i film ricerca */
    function getAllMovies(page = 1){
        // Al caricamento dei film setto la variabile di stato isLoading a true, così da permettere la visualizzazione del componente <Loader />
        setIsLoading(true);
        // axios.get(`${apiUrl}${movieEndPoint}?page=${page}`)     //avrei potuto usare anche questa chiamata axios al posto di quella di seguito
        axios.get(apiUrl + movieEndPoint, { params: { page} })
            .then((res) => {
                setMovies(res.data.results.data);
                setCurrentPage(res.data.results.current_page);
                setLastPage(res.data.results.last_page);
                setTotalPage(res.data.results.total);

                // console.log(res.data.results.data);
                setIsLoading(false);    // Una volta completato il caricamento setto la variabile di stato isLoading a false così da nascondere il componente <Loader />
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);    // Per sicurezza setto anche qui a false la variabile di stato isLoading per nascondere il componente <Loader /> a caricamento avvenuto
                console.log("Finito");
            });
    }

    /* Funzione che richiama l'API http://127.0.0.1:8000/api/genres per restituire tutti i generi presenti e poterli poi riempire nella <select> della pagina di ricerca avanzata */
    function getAllGenres(){
        axios.get(apiUrl + "/genres")
            .then((res) => {
                setGenresList(res.data.genres);
                console.log(res.data.genres);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Generi caricati");
            });
    }

    /* Funzione che richiama l'API per la visualizzazione dei film ricercati nella search bar dell'header */
    // axios.get(`${apiUrl}${movieEndPoint}?page=${page}`)     //avrei potuto usare anche questa chiamata axios al posto di quella di seguito
    function getMovies(page = 1, filters = {}) {
        // Al caricamento dei film setto la variabile di stato isLoading a true, così da permettere la visualizzazione del componente <Loader />
        setIsLoading(true);
        // IMPORTANTE: axios gestisce da solo con l’opzione params, quindi non ho bisogno di specificare la sua chiave valore come ad esempio:
        // params: {page: page, title: query} ma è sufficiente solo passare le variabili necessare come di seguito:
        axios.get(apiUrl + movieEndPoint, {
            params: {
                page,
                ...filters,
            }
        })
            .then((res) => {
                setMovies(res.data.results.data);
                setCurrentPage(res.data.results.current_page);
                setLastPage(res.data.results.last_page);
                setTotalPage(res.data.results.total);

                // console.log(res.data.results.data);
                setIsLoading(false);    // Una volta completato il caricamento setto la variabile di stato isLoading a false così da nascondere il componente <Loader />
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);    // Per sicurezza setto anche qui a false la variabile di stato isLoading per nascondere il componente <Loader /> a caricamento avvenuto
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
                setMovie(res.data.movie);
                console.log(res.data.movie);

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

    // Funzione richiamata al pulsante Cerca... presente nell'Header del sito
    function search(query) {
        setCurrentPage(1);
        setSearchQuery(query);     // salva la query nello stato
        getMovies(1, query);
    }

    // Oggetto contenente i dati da passare al value per offrirli ai Consumer (i componenti racchiusi nel Provider di GLobalContext)
    // ovvero lo useState movies e la funzione search
    const collectionData = {
        movie,
        movies,
        genresList,
        setMovie,
        setMovies,
        currentPage,
        setCurrentPage,
        lastPage,
        setLastPage,
        totalPage,
        getMovie,
        getMovies,
        getAllMovies,
        getAllGenres,
        search,
        isSearching,
        isLoading,
        posterUrl
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