import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setAdding(false);
    setColorToEdit(color);
  };

  const addColor = color => {
    setAdding(true);
    setEditing(false);
  };

  const saveEdit = e => {
    e.preventDefault();
    setEditing(false);
    axiosWithAuth()
      .put("http://localhost:5000/api/colors/" + colorToEdit.id, colorToEdit)
      .then(res => updateColors([...colors.filter(c => c.id !== colorToEdit.id), colorToEdit]))
      .catch(err => console.log(err));
    setColorToEdit(initialColor);
  };

  const saveAdd = e => {
    e.preventDefault();
    setAdding(false);
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", colorToAdd)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err));
    setColorToAdd(initialColor);
  };

  const deleteColor = color => {
    setColorToAdd(initialColor);
    setColorToEdit(initialColor);
    axiosWithAuth()
      .delete("http://localhost:5000/api/colors/" + color.id)
      .then(res => updateColors(colors.filter(c => c.id !== color.id)))
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors <button onClick={addColor}>Add</button></p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color);
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => { setEditing(false); setColorToEdit(initialColor); }}>cancel</button>
          </div>
        </form>
      )}
      {adding && (
        <form onSubmit={saveAdd}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button onClick={() => { setAdding(false); setColorToAdd(initialColor); }}>cancel</button>
        </div>
      </form>
      )}
    </div>
  );
};

export default ColorList;
