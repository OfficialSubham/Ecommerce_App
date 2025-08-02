import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageUpload from "./Pages/ImageUpload";
import ProtectedRoute from "./Pages/ProtectedRoute";
import LoginPage from "./Pages/LoginPage";
import ProductList from "./Pages/ProductList";

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<ImageUpload />} path="/" />
              <Route element={<ProductList />} path="/yourproducts" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </Router>
    </>
  );
}

export default App;
