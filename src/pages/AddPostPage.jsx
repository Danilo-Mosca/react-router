import { useState, useEffect } from "react";
// Importo l'hook useNavigate PER PERMETTERE LA NAVIGAZIONE PROGRAMMATICA (IL REDIRECT) tra le pagine dell'applicazione
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Importo il componente Loader che simula il caricamento della pagina
import Loader from "../components/Loader";
//Api url per axios
const apiUrl = import.meta.env.VITE_API_URL;

// Variabile usata per riempire lo useState formData con i contenuti inseriti nel form
const newPost = {
    title: "",
    image: "https://picsum.photos/640/480",
    content: "",
    published: false,
    tags: [],
};

// Funzione che aggiunge un nuovo post
function AddPostPage() {
    // Variabile di stato dove metterò l'oggetto con il nuovo post inserito nel form (chiamato formData invece di postData
    // perchè i dati mi arrivano dal form)
    const [formData, setFormData] = useState(newPost);
    // Variabile di stato contenente la lista dei tags (che all'avvio inizializzo con un array vuoto)
    const [tagList, setTagList] = useState([]);
    // variabile di stato per il Loader
    const [isLoading, setIsLoading] = useState(false);

    // Appena entro nel componente, grazie all'hook useEffect, richiamo la funzione getTags che andrà a riempire la lista degli ingredienti con
    // i valori prelevati con axios tramite API dal models del backend
    useEffect(() => {
        getTags();
    }, []);

    // assegno alla costante navigate l'hook di useNavigate per permettere la reindirizzazione dell'utente alla pagina da noi desiderata
    const navigate = useNavigate();

    // Funzione che riempie tramite urlAPI chiamata con axios la variabile di stato tagList con tutti gli ingredienti
    function getTags() {
        axios.get(apiUrl + "/tags")
            .then((res) => {
                setTagList(res.data.data);
            })
            .catch((error) => console.log(error))
            .finally(() => {
                // Istruzioni di finally
            });
    }

    // Funzione che aggiunge il valore catturato dalle input box e dalle checkbox e lo assegna alla variabile di stato formData
    function handleInput(event) {
        // Se l'event catturato è una checkbox, prendo il checked della checkbox, altrimenti prendo il valore dell'input text
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        // Aggiorno la variabile di stato formData con il valore catturato nell'input (che è una chiave dinamica quindi va tra parentesi quadre [])
        // e assegnato alla costante value
        setFormData({ ...formData, [event.target.name]: value });
    }

    // Funzione che aggiunge il valore catturato dalla lista di tag della checkbox e lo assegna alla variabile di stato tagList
    function handleTags(event) {
        setFormData((formData) => {
            // Mi destrutturo e seleziono solo la chiave tags
            let { tags, ...other } = formData;
            // In base alla selezione del tag lo aggiungo o tolgo dalla chiave (che è un array) dei tags
            if (tags.includes(event.target.value)) {
                tags = tags.filter((flag) => {
                    return flag !== event.target.value
                });
            }
            else {
                tags = [...tags, event.target.value];
            }
            return { tags, ...other, };
        });
    }


    function addPost(event) {
        event.preventDefault();
        // Al caricamento dei post setto la variabile di stato isLoading a true, così da permettere la visualizzazione 
        // del componente <Loader /> mentre le cards con i post vengono caricate
        setIsLoading(true);

        // Con axios.post vado ad aggiungere post al server... (fino a quando non sarà spento! 
        // Perchè non lo sto aggiungendo ad un database, e non sto nemmeno riscrivendo il file posts.js dei models del server)
        axios.post(apiUrl + "/posts", formData)
            .then((res) => {
                console.log("res.data.item.id: ", res.data.item.id);
                // Dopo aver aggiunto il nuovo post reindirizzo l'utente alla pagina dei dettagli del post aggiunto
                const id = res.data.item.id;
                navigate("/posts/" + id);
                // Oppure posso reindirizzare l'utente alla pagina con la lista di tutti i post
                // navigate("/posts");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                // Una volta completato il caricamento setto la variabile di stato isLoading a false così da nascondere il componente <Loader />
                setIsLoading(false);
            });
    }

    return (
        <section className="my-4 container">

            {/* Se la variabile di stato isLoading è true, allora visualizzo il componente Loader */}
            {isLoading && <Loader />}

            <h2>Aggiungi un nuovo post</h2>
            <form onSubmit={addPost}>
                <div className="mb-3">
                    <label htmlFor="pizzaname" className="form-label">Titolo del post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titlelHelp"
                        value={formData.title}
                        onChange={handleInput}
                        name="title"
                        placeholder="Titolo del post"
                    />
                    <div id="titlelHelp" className="form-text">
                        Il tuo articolo sarà pubblicato nel nostro blog!
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Immagine del post
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        aria-describedby="imagelHelp"
                        value={formData.image}
                        onChange={handleInput}
                        name="image"
                        placeholder="Url di una immagine"
                    />
                    <div id="imagelHelp" className="form-text">
                        Inserisci l'url di un'immagine
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Contenuto del post
                    </label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="content"
                        value={formData.content}
                        onChange={handleInput}
                        name="content"
                        placeholder="Testo del post">
                    </textarea>
                </div>

                <div className="card p-4">
                    {tagList.map((tag) => (
                        <div className="mb-3 form-check" key={tag.id}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="tags"
                                name="tags"
                                onChange={handleTags}
                                value={tag.title}
                                checked={formData.tags.includes(tag.title)}
                            />
                            <label className="form-check-label" htmlFor="published">
                                {tag.title}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="published"
                        name="published"
                        onChange={handleInput}
                        value={formData.published}
                        checked={formData.published}
                    />
                    <label className="form-check-label" htmlFor="published">
                        Spunta per pubblicare subito il post
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Inserisci post
                </button>
            </form >
        </section >
    );
}
export default AddPostPage;