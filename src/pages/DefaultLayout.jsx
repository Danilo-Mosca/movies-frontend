import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";      //Placeholter dell'outlet personalizzato

function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default DefaultLayout;