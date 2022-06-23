import firebase from "./firebaseConnection";
import { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [idPost, setIdPost] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      await firebase
        .firestore()
        .collection("posts")
        .onSnapshot((doc) => {
          let meusPosts = [];

          doc.forEach((item) => {
            meusPosts.push({
              id: item.id,
              titulo: item.data().titulo,
              autor: item.data().autor,
            });
          });

          setPosts(meusPosts);
        });
    }

    loadPosts();
  }, []);

  async function handleAdd() {
    await firebase
      .firestore()
      .collection("posts")
      .add({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.log("dados cadastrados com sucesso");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("gerou algum erro!" + error);
      });
  }

  async function buscaPost() {
    await firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .get()
      .then((snapshot) => {
        let lista = [];

        setIdPost(snapshot.id);
        setTitulo(snapshot.data().titulo);
        setAutor(snapshot.data().autor);
      })
      .catch((error) => {
        console.log("gerou algum erro!" + error);
      });
  }

  async function editarPost() {
    await firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .update({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.log("dados alterados com sucesso");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log("gerou algum erro!" + error);
      });
  }

  async function excluirPost(id){

    firebase.firestore().collection('posts').doc(id).delete().then(
      ()=>{
        alert('O POST FOI EXCLUIDO!');
      }
    );

  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>
      <br />

      <div className="container">
        <label>ID: </label>
        <input
          type="text"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        ></input>

        <label>Titulo: </label>
        <textarea
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        ></textarea>

        <label>Autor: </label>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        ></input>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscaPost}>Buscar</button>
        <button onClick={editarPost}>Editar Post</button>
        <br />

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>ID: {post.id}</span>
                <br />
                <span>Titulo: {post.titulo}</span>
                <br />
                <span>Autor: {post.autor}</span>
                <br />
                <button onClick={() => excluirPost(post.id)}>Excluir post</button>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
