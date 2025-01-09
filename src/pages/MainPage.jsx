import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";

const apiUrl = import.meta.env.VITE_API_URL;
const postEndPoint = "/posts";

export const MainPage = () => {
    const [posts, setPosts] = useState([]);

    // Shortcut di useEffect se contiene solo una riga di codice
    useEffect(getData, []);

    function getData() {
        axios.get(`${apiUrl}${postEndPoint}`)
            .then((res) => {
                console.log(res.data);
                
                setPosts(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Finito");
            });
    } 

    function deleteItem(e, id) {
        e.preventDefault();
        console.log(e);
        //console.log("sono qui al libro " + data.title);
        axios.delete(`${apiUrl}${postEndPoint}/${id}`).then((res) => {
            console.log(res);
            console.log(res.data);
            getData();
            // USO LA FUNZIONE getData() AL POSTO DELL'ISTRUZIONE DI SEGUITO (setPosts(posts.filter((post) => post.id !== id));
            // PERCHE' IN CASO DI UTENTI MULTIPLI CONNESSI, RICHIAMARE L'ID COSI' POTREBBE DARE PROBLEMMI DI CONCORRENZA, 
            // SE DUE O PIU' UTENTI CANCELLASSERO L'ELEMENTO CON QUELL'ID IN CONTEMPORANEA

            //setPosts(posts.filter((post) => post.id !== id));
        });
    }

    return (
        <main className="container py-3">
            <div className="row gy-4 ">
                {posts.map((post) => (
                    <div className="col-12 col-md-4 col-lg-3" key={post.id}>
                        <CardComponent
                            data={post}
                            onDeletePost={(e) => {
                                deleteItem(e, post.id);
                            }}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
};
