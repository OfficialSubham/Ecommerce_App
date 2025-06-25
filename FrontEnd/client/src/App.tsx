import CenterImage from "./components/CenterImage";
import Contents from "./components/Contents";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen w-[100vw] bg-(--primary)">
        <Navbar/>
        <CenterImage/>
        <Contents/>
      </div>
    </>
  );
}

export default App;
