
import HomePage from "./Pages/HomePage"
import { HOME } from "./Routers/router"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

// falta importar browserRouter
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
