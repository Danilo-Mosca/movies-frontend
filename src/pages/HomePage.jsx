import MainComponent from "../components/MainComponent"

export default function HomePage() {
    return (
        <div className=" d-flex justify-content-center align-items-center flex-column text-position-h1-p">
            <h1 id="homepage-text">Movie App</h1>
            <p className="pt-sm-5">Consulta i nostri film!</p>
            <MainComponent />
        </div>
    )
}