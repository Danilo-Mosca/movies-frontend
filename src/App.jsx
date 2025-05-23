import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesSearch from "./pages/MovieSearch";
import MovieDetails from "./pages/MovieDetails";
import NotFoundPage from "./pages/NotFoundPage";
import DefaultLayout from "./pages/DefaultLayout";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <>
      {/* Integro il GLobalContext a tutta l'app: */}
      <GlobalProvider>
        {/* Integriamo il sistema di routing importando il componente BrowserRouter da React Router */}
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={HomePage} />
              <Route path="/movies">
                <Route index Component={MoviesSearch} />
                <Route path=":slug" Component={MovieDetails}></Route>
              </Route>
              {/* Rotta per le pagine non trovate: inserendo path="*" */}
              <Route path="*" Component={NotFoundPage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App
