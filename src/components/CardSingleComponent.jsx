// Importo i CSS Modules delle Card
import style from "./card.module.css";
// Importo il componente Link che utilizzo al posto del tag <a href=""> così da evitare il ricaricamento della pagina
import { Link } from "react-router-dom";

/* Funzione che crea le Cards */
export default function CardSingleComponent({ data, onDelete }) {
    // function canc(e) {
    //   e.preventDefault();
    //   onDeleteBook(data.id);
    // }

    // Destrutturo l'oggetto data
    const { id, title, image = "https://picsum.photos/640/480", content, published, tags } = data;

    return (
        <div className={`${style.cards} card`}>


            {/* Operatore ternario che verifica la presenza dell'immagine e nel caso non fosse presente le assegna un'immagine casuale 600x400px dal sito https://picsum.photos/*/}
            {image === "" ?
                <img src={"https://picsum.photos/640/480"} className={`card-img-top ${style["img-custom"]}`} alt={title} />
                : <img src={`${image}`} className={`card-img-top ${style["img-custom"]}`} alt={title} />}


            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                {/* Controllo se sono stati selezionati tag per il post, in caso contrario stampa "Nessuna tag selezionato" */}
                <p className={`card-text ${style.colorTag}`}>Tag: {tags.length === 0 ? "Nessuna tag selezionato" : tags.join(", ")}</p>
                <p className=" card-text">
                    {published ? <span className={`${style["published-text"]}`}>Pubblicato</span> : <span className={`${style["not-published-text"]}`}>Non pubblicato</span>}
                </p>
            </div>
        </div>
    );
}