import "./App.css";
import MainPage from "./Components/MainPage";
import DetailsPage from "./Components/DetailsPage";
import { Routes, Route } from "react-router-dom";

function App(): any {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
