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
    // useState dei film:
    const [movies, setMovies] = useState([]);
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

    function search() {
        setCurrentPage(1);
        getMovies(1);
        // Imposto la variabile di stato isSearching a true perchè se quando richiamo search significa che è stata fatta una ricerca
        setIsSearching(true);

    }

    // Oggetto contenente i dati da passare al value per offrirli ai Consumer (i componenti racchiusi nel Provider di GLobalContext)
    // ovvero lo useState movies e la funzione search
    const collectionData = {
        movies,
        setMovies,
        currentPage,
        setCurrentPage,
        lastPage,
        setLastPage,
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