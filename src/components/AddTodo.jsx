import { useState } from "react";
function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }
  function handleKeyDown(e) {
    if (e.code === "Enter" && value.length) {
      createTodo();
      setValue("");
    }
  }
  async function createTodo() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://restapi.fr/api/rtodo", {
        method: "POST",
        body: JSON.stringify({
          content: value,
          edit: false,
          done: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      } else {
        setError("Oops, une erreur");
      }
    } catch (e) {
      setError("Oops, une erreur");
    } finally {
      setLoading(false);
    }
    setValue("");
  }

  function handleClick() {
    if (value.length) {
      createTodo();
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center mb-20">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder="Ajouter une todo"
        className="mr-15 flex-fill"
      />
      {error && <p>{error}</p>}
      <button onClick={handleClick} className="btn btn-primary">
        {loading ? "Chargement" : "Ajouter"}
      </button>
    </div>
  );
}

export default AddTodo;