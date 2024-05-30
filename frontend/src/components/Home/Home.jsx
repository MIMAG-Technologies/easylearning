import React from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = React.useContext(AuthContext);
  return (
    <div>
      {" "}
      Welcome {user.name} and you are a {user.role}
    </div>
  );
}

export default Home;
