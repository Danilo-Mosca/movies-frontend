import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';

// Importo il CSS Modules dell'header:
import style from "./Header.module.css";
// Importo l'hook useState:
import { useState } from 'react';
// Importo il GlobalContext:
import { useGlobalContext } from '../contexts/GlobalContext';

function Header() {
    const { search } = useGlobalContext();    // richiamo e destrutturo il metodo search del GlobalContext
    const [querySelected, setQuerySelected] = useState("");     // variabile di stato che conterrà il valore inserito nel form della search nell'header
    // Mi creo la costante navigate e le assegno l'hook di useNavigate per permettere la reindirizzazione dell'utente alla pagina da noi desiderata
    const navigate = useNavigate();     // importa useNavigate

    /* Funzione richiamata ogni volta che si inserisce del testo nella input search */
    function handleInput(event) {
        // Assegno alla variabile di stato querySelected il valore contenuto nella input search ogni volta che questa viene modificata
        setQuerySelected(event.target.value);
    }

    /* Funzione richiamata al click sul pulsante Cerca */
    function handleSearch(event) {
        event.preventDefault();     // prevenisco il ricaricamento della pagina
        // Al click sul pulsante assegno il valore della variabile di stato querySelected al GlobalContext
        search(querySelected);        // Eseguo la ricerca
        // E poi reindirizzo l'utente alla pagina di ricerca se questo, in qualunque pagina si trovi, ha eseguito una ricerca dal pulsante cerca nell'header.
        // Agganciando ad esso la o le query della ricerca che ho eseguito all’URL, es: /movies?query=Matrix che in questo caso sarà: /movies?title=Matrix
        navigate(`/movies?title=${encodeURIComponent(querySelected)}`);
    }

    return (
        <>
            <header className={style.header}>
                <Navbar expand="md">
                    <Container fluid>
                        <Navbar.Brand>
                            <NavLink to="/" className={({ isActive }) => `nav-link ${style["link-custom"]} ${isActive ? style["item-selected"] : ""}`}>
                                <img src="./../favicon.png" width="30" height="30" alt="logo Movie App" />Movie App.net
                            </NavLink>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbarScroll" className={style["toggle-navigation"]} />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-md-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <NavLink to="/" end className={({ isActive }) => `nav-link ${style["link-custom"]} ${isActive ? style["item-selected"] : ""}`}>Home</NavLink>
                                <NavLink to="/movies" end className={({ isActive }) => `nav-link ${style["link-custom"]} ${isActive ? style["item-selected"] : ""}`}>Ricerca avanzata</NavLink>
                            </Nav>
                            <Form className="d-flex" onSubmit={handleSearch}>
                                <Form.Control
                                    type="search"
                                    placeholder="Cerca un film"
                                    className="me-2"
                                    aria-label="Search"
                                    name="title"
                                    id={style.title}
                                    onChange={handleInput}
                                    // style={{ borderRadius: '0px' }}
                                />
                                <Button type="submit" className={style.searchButton}>Cerca</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;