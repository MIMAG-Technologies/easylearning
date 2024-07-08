import React from "react";
import { fetchMaterial } from "../utils/materialUtils";
import { useParams } from "react-router-dom";

function DoQuiz() {
  const { materialId } = useParams();
  const [materialInfo, setMaterialInfo] = React.useState({});

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

  // Function to extract the src attribute from the iframe string
  const extractIframeSrc = (iframeString) => {
    const match = iframeString.match(/src="([^"]*)"/);
    return match ? match[1] : null;
  };

  const iframeSrc = materialInfo.formIframe
    ? extractIframeSrc(materialInfo.formIframe)
    : null;

  return (
    <section className="module-container">
      {Object.keys(materialInfo).length === 0 ? (
        <>Loading</>
      ) : (
        <iframe
          src={iframeSrc}
          style={{ width: "100%", height: "100%", border: "none" }}
        >
          Loading…
        </iframe>
      )}
    </section>
  );
}

export default DoQuiz;
