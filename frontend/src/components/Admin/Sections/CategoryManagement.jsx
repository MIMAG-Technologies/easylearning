import { CirclePlus, Pencil, Save, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

function CategoryManagement() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");
  const token = localStorage.getItem("token");
  const { setisLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/categories/all"
      );
      setCategoriesList(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setisLoading(false);
    }
  };

  const handleSaveClick = async (category) => {
    setisLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/v1/categories/${category._id}`,
        { name: editingName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoriesList(
        categoriesList.map((cat) =>
          cat._id === category._id ? { ...cat, name: editingName } : cat
        )
      );
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setisLoading(false);
    }
  };

  const handleDeleteClick = async (category) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This process is irreversible."
      )
    ) {
      setisLoading(true);
      try {
        await axios.delete(
          `http://localhost:5000/api/v1/categories/${category._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoriesList(
          categoriesList.filter((cat) => cat._id !== category._id)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setisLoading(false);
      }
    }
  };

  const handleAddCategory = async () => {
    const newCategoryName = `New Category ${categoriesList.length + 1}`;
    setisLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/categories/create",
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newCategory = response.data;
      setCategoriesList([...categoriesList, newCategory]);
      window.alert("New Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setisLoading(false);
    }
  };

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
        <p>No of Courses: {category.numCourses}</p>
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
