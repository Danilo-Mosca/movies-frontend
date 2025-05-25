// Importo la libreria di Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default function Loader() {
    return (
        <div id="loader">
            {/* Aggiungo l'icona di simulazione caricamento pagina di fontawesone */}
            <FontAwesomeIcon icon={faSpinner} size="8x" spinPulse />
        </div>
    );
}