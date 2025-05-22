import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/MainComponent";
import MoviesSearch from "./pages/MovieSearch";
import MovieDetails from "./pages/MovieDetails";
import NotFoundPage from "./pages/NotFoundPage";
import DefaultLayout from "./pages/DefaultLayout";

function App() {
  return (
    <>
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
    </>
  );
}

export default App
