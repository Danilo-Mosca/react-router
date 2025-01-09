import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";

const apiUrl = import.meta.env.VITE_API_URL;
const bookEndPoint = "/posts";

export const MainPage = () => {
    const [books, setBooks] = useState([]);

    // Shortcut di useEffect se contiene solo una riga di codice
    useEffect(getData, []);

    function getData() {
        axios.get(`${apiUrl}${bookEndPoint}`)
            .then((res) => {
                console.log(res.data);
                
                setBooks(res.data.results);
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
        axios.delete(`${apiUrl}${bookEndPoint}/${id}`).then((res) => {
            console.log(res);
            console.log(res.data);
            getData();
            // USO LA FUNZIONE getData() AL POSTO DELL'ISTRUZIONE DI SEGUITO (setBooks(books.filter((book) => book.id !== id)); 
            // PERCHE' IN CASO DI UTENTI MULTIPLI CONNESSI, RICHIAMARE L'ID COSI' POTREBBE DARE PROBLEMMI DI CONCORRENZA, 
            // SE DUE O PIU' UTENTI CANCELLASSERO L'ELEMENTO CON QUELL'ID IN CONTEMPORANEA

            //setBooks(books.filter((book) => book.id !== id));
        });
    }

    return (
        <main className="container py-3">
            <div className="row gy-4 ">
                {books.map((book) => (
                    <div className="col-12 col-md-4 col-lg-3" key={book.id}>
                        <CardComponent
                            data={book}
                            onDeleteBook={(e) => {
                                deleteItem(e, book.id);
                            }}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
};
