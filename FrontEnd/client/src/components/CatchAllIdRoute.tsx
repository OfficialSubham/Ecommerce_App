import { Navigate, useLocation } from "react-router";
import SingleProduct from "../Pages/SingleProduct";

const CatchAllIdRoute = () => {
const location = useLocation();
  const path = location.pathname; // e.g. /something/123

  const segments = path.split("/").filter(Boolean); // ['something', '123']
  const lastSegment = segments[segments.length - 1];

  const isNumericId = /^\d+$/.test(lastSegment); // You can customize this if your ID is not numeric

  if (isNumericId) {
    // You could also pass lastSegment as a prop or via context
    return <SingleProduct/>;
  }

  // If it doesn't match, redirect or 404
  return <Navigate to="/404" replace />;
}

export default CatchAllIdRoute
