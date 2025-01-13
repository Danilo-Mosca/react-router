import { useNavigate, useParams } from "react-router-dom";      // importo l'hook params che serve a estrarre i parametri dinamici dall'URL 
import { useState, useEffect } from "react";
import axios from "axios";
import CardSingleComponent from "../components/CardSingleComponent";

//Api url per axios
const apiUrl = import.meta.env.VITE_API_URL;

export default function PostPage() {
    // Funzione che restituisce un oggetto con tutti i parametri dinamici dell'URL
    const { id } = useParams();     // destrutturo l'oggetto con i parametri che mi ritorna (in questo caso solo la chiave con l'id)
    const [post, setPost] = useState(null); // Variabile di stato contenente il singolo post con quell'id :id dinamico (se esistente) ottenuto dalla chiamata axios

    // Con l'hook useEffect richiamo la funzione getData solo alla modifica dell'id dell'hook useParams
    useEffect(getData, [id]);

    // Mi creo la costante navigate e le assegno l'hook di useNavigate per permettere la reindirizzazione dell'utente alla pagina da noi desiderata
    // nello speficio reindirizzo l'utente se questo inserisce un url con un dettaglio ad un post con id inesistente, come ad esempio:
    const navigate = useNavigate();

    function getData() {
        axios.get(apiUrl + "/posts/" + id)
            .then((res) => {
                // console.log(res);
                setPost(res.data.item);
            }).catch((error) => {
                console.log(error);
                // Se inserisco un id non esistente reindirizzo l'utente alla rotta "/error" che non esiste, 
                // quindi automaticamente verrò reindirizzato alla pagina NotFoundPage.jsx
                // In questo modo gestisco ed evito la visualizzazione della pagina dei dettagli per un post con id inesistente:
                navigate("/error")
            }).finally(() => {
                console.log("Finito");
            });
    }

    return (
        <section className="container">
            <h1>Sono il post con id: {id}</h1>
            {/* Se post non è null, cioè esiste, allora ritorno l'immagine e la descrizione della card: */}
            {post && (
                <CardSingleComponent data={post} />
            )}
        </section>
    );
}