import { useState, useEffect } from "react";    // Importo gli hook useState e useEffect
import { Link } from "react-router-dom";    // Importo l'hook Link
import axios from "axios";
import CardComponent from "../components/CardComponent";
import Loader from "../components/Loader";

//Api url e endpoint per axios
const apiUrl = import.meta.env.VITE_API_URL;
const postEndPoint = "/posts";

// // Variabile usata per inizializzare lo useState post e successivamente per svuotare i campi del form
// const initialPost = {
//     id: "",
//     title: "",
//     image: "https://picsum.photos/640/480",
//     content: "",
//     category: "",
//     tags: ["storia", "arte", "sport", "attualità"],
//     published: false,
// };

// // Costante contenente i valori da passare alla <select> del form
// const categoriesAvaible = ["news", "informatica", "musica", "cucina"];



export const MainPage = () => {
    // Variabile di stato dei post, che conterrà l'oggetto dei post ottenuto dalla chiamata axios
    const [posts, setPosts] = useState([]);
    // Variabile di stato per l'input tipe search
    const [search, setSearch] = useState("");


    const [isLoading, setIsLoading] = useState(false);  // variabile di stato per il Loader




    //Shortcut di useEffect se contiene solo una riga di codice
    useEffect(() => getData(search), [search]);

    /* -------- Abbreviazione di questo --------
    useEffect(() => {
        //console.log("E' stato eseguito use effect");
        getData(search);
    }, [search]);
    -------------------------------------------- */


    function getData(search) {
        let options = null;
        if (search) {
            options = { params: { search } };
        };
        setIsLoading(true);     // Al caricamento dei post setto la variabile di stato isLoading a true, così da permettere la visualizzazione del componente <Loader />

        axios.get(`${apiUrl}${postEndPoint}`, `/${options}`)
            .then((res) => {
                console.log(res.data);
                setPosts(res.data.results);
                setIsLoading(false);    // Una volta completato il caricamento setto la variabile di stato isLoading a false così da nascondere il componente <Loader />
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);    // Per sicurezza setto anche qui a false la variabile di stato isLoading per nascondere il componente <Loader />
                console.log("Finito");
            });
    }

    function deleteItem(e, id) {
        e.preventDefault();
        // console.log(e);
        //console.log("sono qui al libro " + data.title);
        axios.delete(`${apiUrl}${postEndPoint}/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                getData(search);
                // USO LA FUNZIONE getData() AL POSTO DELL'ISTRUZIONE DI SEGUITO (setPosts(posts.filter((post) => post.id !== id));
                // PERCHE' IN CASO DI UTENTI MULTIPLI CONNESSI, RICHIAMARE L'ID COSI' POTREBBE DARE PROBLEMMI DI CONCORRENZA, 
                // SE DUE O PIU' UTENTI CANCELLASSERO L'ELEMENTO CON QUELL'ID IN CONTEMPORANEA

                //setPosts(posts.filter((post) => post.id !== id));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => { console.log("Finally") });
    }


    // Funzione richiamata ogni volta che cambia il contenuto della barra di ricerca e che setta la variabile di stato search con il valore in essa contenuto
    function handleSearch(event) {
        setSearch(event.target.value);
    }

    return (
        <section className="container">
            {/* Se la variabile di stato isLoading è true, allora visualizzo il componente Loader */}
            {isLoading && <Loader />}
            <main className="container py-3">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="search" className="form-label">
                            Cerca
                        </label>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            value={search}
                            className="form-control"
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-12  py-4">
                        <Link to="/posts/create" className="btn btn-success">
                            Aggiungi un nuovo post
                        </Link>
                    </div>

                    <h2>Lista dei post</h2>
                    <div className="row gy-4">
                        {posts.length > 0 ?
                            posts.map((post) => (
                                <div className="col-12 col-md-4 col-lg-3" key={post.id}>
                                    <CardComponent
                                        data={post}
                                        onDelete={(e) => {
                                            deleteItem(e, post.id);
                                        }}
                                    />
                                </div>
                            ))
                            : "Non ci sono post!"
                        }
                    </div>
                </div>
            </main>
        </section>
    );
};
