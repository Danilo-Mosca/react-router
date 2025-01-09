export default function CardComponent({ data, onDeletePost }) {
    // function canc(e) {
    //   e.preventDefault();
    //   onDeleteBook(data.id);
    // }
    return (
        <div className="card">
            <img src={data.image} className="card-img-top" alt="immagine-post" />
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.content.substring(0, 60) + "..."}</p>
                <a href="#" className="btn btn-primary" onClick={onDeletePost}>
                    Cancella
                </a>
            </div>
        </div>
    );
}