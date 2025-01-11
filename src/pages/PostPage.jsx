import { useParams } from "react-router-dom";      // importo l'hook params che serve a estrarre i parametri dinamici dall'URL 
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

    function getData() {
        axios.get(apiUrl + "/posts/" + id)
            .then((res) => {
                // console.log(res);
                setPost(res.data.item);
            }).catch((error) => {
                console.log(error);
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