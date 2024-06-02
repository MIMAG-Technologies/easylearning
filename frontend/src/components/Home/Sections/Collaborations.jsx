function Collaborations() {
  const collaborate = [
    "colab1.png",
    "colab2.png",
    "colab3.png",
    "colab4.png",
    "colab5.png",
    "colab6.png",
    "colab7.png",
    "colab8.png",
  ];
  return (
    <div className="Collaborations">
      <h1>
        We collaborate with <span>325+ leading universities and companies</span>
      </h1>
      <div>
        {collaborate.map((collab, index) => {
          return (
            <img src={"/assets/Collaborators/" + collab} alt="" key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default Collaborations;
