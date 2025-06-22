import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ImageUpload from "./Pages/ImageUpload";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<ImageUpload />} path="/"></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
