import React, { useState, useEffect } from 'react';
import './App.css'
function Iteam(props) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(props.iteam);
  let inputIteamRef = React.useRef();

  useEffect(() => {
    // componentwillmount in functional component.
    // Anything in here is fired on component mount.
    return () => {
      console.log('******************* UNMOUNTED');
    };
  }, []);
  const editButtom = () => {
    if (edit) {
      let value = inputIteamRef.current.value;
      setText(value)
      let lista = props.List;
      lista[props.index] = value;
      props.handleChange(lista)
    }
    setEdit(!edit)
  }

  const deleteIteam = () => {
    console.log("pase");
    let lista = props.List;
    lista.splice(props.index, 1);
    console.log("lista ", lista);
    props.handleChange(lista)
    console.log("props.List ", props.List);
  }

  return (
    <>
      {!edit &&
        <li>
          <span>{text}</span>
          <button onClick={editButtom}>editar</button>
          <button onClick={() => deleteIteam()}>eliminar</button>
        </li>
      }

      {edit &&
        <li>
          <input defaultValue={text} ref={inputIteamRef}></input>
          <button onClick={editButtom}>editar</button>
          <button disabled>eliminar</button>
        </li>
      }
    </>
  )
}

function App() {
  const [List, setList] = useState([]);
  let inputRef = React.useRef();

  useEffect(() => {
    console.log(" List ", List);
    setList(List);
    return () => {
      console.log('******************* UNMOUNTED');
    };
  }, [List])

  const updateList = (list) => {
    setList(list);
    inputRef.current.value = ""
  }

  const addEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.target.value) {
        let newList = [...List, event.target.value];
        updateList(newList)
      }
    }
  }

  const addButom = (text) => {
    if (text) {
      let newList = [...List, text];
      updateList(newList)
    }
  }

  const handleChange = (newValue) => {
    console.log("newValue handleChange ", newValue)
    console.log("List handleChange ", List)
    setList(newValue);
    console.log("new List handleChange ", List)
  }

  return (
    <>
      <h1>Lista</h1>
      <h2>{List.length}</h2>
      <label>
        <input type="text" name="lista" ref={inputRef} onKeyPress={(event) => addEnter(event)} />
        <button onClick={() => addButom(inputRef.current.value)}>ingresa un elemento</button>
      </label>

      <ul id="lista">
        {List &&
          List.map((element, index) => {
            return <Iteam iteam={element} key={index} index={index} List={List} handleChange={handleChange}></Iteam>
          })
        }
      </ul>
    </>
  );
}

export default App;
