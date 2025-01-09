import { useParams } from "react-router-dom";      // importo l'hook params che serve a estrarre i parametri dinamici dall'URL 
export default function PostPage() {
    // Funzione che restituisce un oggetto con tutti i parametri dinamici dell'URL
    const { id } = useParams();     // destrutturo l'oggetto con i parametri che mi ritorna (in questo caso solo la chiave con l'id)
    return (
        <section className="container">
            <h1>Sono il post con id: {id}</h1>
        </section>
    );
}