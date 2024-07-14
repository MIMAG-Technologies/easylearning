import { CirclePlus, Pencil, Save, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function CategoryManagement() {
  const [categoriesList, setCategoriesList] = useState([]);
  const { setisLoading } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/categories/all`
        );
        if (isMounted) {
          setCategoriesList(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching categories:", error);
          toast.error("Error fetching categories");
        }
      } finally {
        setisLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveClick = async (category) => {
    setisLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/categories/${category._id}`,
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
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category");
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
          `${import.meta.env.VITE_API_BASE_URL}/categories/${category._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoriesList(
          categoriesList.filter((cat) => cat._id !== category._id)
        );
        toast.success("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category");
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
        `${import.meta.env.VITE_API_BASE_URL}/categories/create`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newCategory = response.data;
      setCategoriesList([...categoriesList, newCategory]);
      toast.success("New category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error adding category");
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
        {filteredCategories.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>No Categories to Display</h1>
        ) : (
          filteredCategories.map((category) => oneCategory(category))
        )}
      </div>
    </>
  );
}

export default CategoryManagement;
