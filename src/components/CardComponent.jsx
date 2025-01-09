export default function CardComponent({ data, onDeleteBook }) {
    // function canc(e) {
    //   e.preventDefault();
    //   onDeleteBook(data.id);
    // }
    return (
        <div className="card">
            <img src={data.thumbnail} className="card-img-top" alt="immagine-libro" />
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description.substring(0, 60) + "..."}</p>
                <a href="#" className="btn btn-primary" onClick={onDeleteBook}>
                    Cancella
                </a>
            </div>
        </div>
    );
}