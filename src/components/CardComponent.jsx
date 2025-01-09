import { Link } from "react-router-dom"; // Import il componente Link che utilizzo al posto del tag <a href=""> così da evitare il ricaricamento della pagina
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
                <p>
                    {/* Stampo a schermo il link per vedere i dettagli sul post selezionato tramite id */}
                    <Link to={`/posts/${data.id}`}>Vedi dettagli</Link>
                </p>
                <a href="#" className="btn btn-primary" onClick={onDeletePost}>
                    Cancella
                </a>
            </div>
        </div>
    );
}