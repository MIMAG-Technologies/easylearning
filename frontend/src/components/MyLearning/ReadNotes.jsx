import React, { useRef } from "react";
import { fetchMaterial } from "../utils/materialUtils";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function ReadNotes() {
  const { materialId } = useParams();
  const [materialInfo, setMaterialInfo] = React.useState({});
  const moduleContainerRef = useRef(null);

  React.useEffect(() => {
    const getMaterials = async () => {
      try {
        const material = await fetchMaterial(materialId);
        setMaterialInfo(material);
      } catch (error) {
        console.error(error);
      }
    };

    getMaterials();
  }, [materialId]);

  const handlePrint = () => {
    if (moduleContainerRef.current) {
      const printContent = moduleContainerRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // To reload the content after printing
    }
  };

  return (
    <section className="module-container">
      <h1 className="notes-heading">
        Notes
        <button onClick={handlePrint} style={{ marginLeft: "10px" }}>
          Print
        </button>
      </h1>
      <div className="notes-container" ref={moduleContainerRef}>
        <h1>{materialInfo.title}</h1>

        <div className="notes">
          <ReactMarkdown>{materialInfo.content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default ReadNotes;
