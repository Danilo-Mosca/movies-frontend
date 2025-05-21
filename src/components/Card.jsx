function Card({ data }) {

    const posterUrl = import.meta.env.VITE_API_POSTER;

    return (
        <div className="card">
            <img src={`${posterUrl}/${data.poster}`} className="card-img-top" alt={data.title} />
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description.substring(0, 60) + "..."}</p>
                {/* <a href="#" className="btn btn-primary" onClick={onShowMovie}>
                    Maggiori info
                </a> */}
            </div>
        </div>
    );
}
export default Card;