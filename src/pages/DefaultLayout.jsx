import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";      //Placeholter dell'outlet personalizzato

function DefaultLayout() {
    return (
        <>
            <div className="layout">
                <Header />
                <main className="content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default DefaultLayout;