import { CirclePlus, Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";

function CategoryManagement() {
  const [categoriesList, setCategoriesList] = useState([
    {
      _id: "60b7c2b5f1d2b10c8c8d2b10",
      name: "Psychology",
      __v: 0,
    },
    {
      _id: "60b7c2b6f1d2b10c8c8d2b11",
      name: "Sociology",
      __v: 0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categoriesList.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (category) => {
    setEditingCategory(category._id);
    setEditingName(category.name);
  };

  const handleSaveClick = (category) => {
    setCategoriesList(
      categoriesList.map((cat) =>
        cat._id === category._id ? { ...cat, name: editingName } : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteClick = (category) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This process is irreversible."
      )
    ) {
      setCategoriesList(
        categoriesList.filter((cat) => cat._id !== category._id)
      );
    }
  };

  const handleAddCategory = () => {
    const newCategoryName = `New Category ${categoriesList.length + 1}`;
    const newCategory = {
      _id: Date.now().toString(),
      name: newCategoryName,
      __v: 0,
    };
    setCategoriesList([...categoriesList, newCategory]);
  };

  const oneCategory = (category) => {
    const isEditing = editingCategory === category._id;
    return (
      <div key={category._id} className="category-item">
        <input
          type="text"
          value={isEditing ? editingName : category.name}
          disabled={!isEditing}
          style={
            !isEditing ? { border: "none" } : { border: "1px solid white" }
          }
          onChange={(e) => setEditingName(e.target.value)}
        />
        {isEditing ? (
          <button
            className="edit-btn"
            onClick={() => handleSaveClick(category)}
          >
            <Save />
            Save
          </button>
        ) : (
          <button
            className="edit-btn"
            onClick={() => handleEditClick(category)}
          >
            <Pencil />
            Edit
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => handleDeleteClick(category)}
        >
          <Trash2 />
          Delete
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="admin-searchbar">
        <input
          placeholder="Search"
          className="input-style"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleAddCategory}>
          <CirclePlus />
          Add Category
        </button>
      </div>
      <div className="categoryList">
        {filteredCategories.map((category) => oneCategory(category))}
      </div>
    </>
  );
}

export default CategoryManagement;
