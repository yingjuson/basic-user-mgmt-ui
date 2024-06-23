import { Route, Routes } from "react-router-dom";
// import Authenticated from "./layouts/authenticated-layout";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
  // <Authenticated user={{ name: "James", email: "jj@email.com", type: "type" }}>
  //   <div>Hello</div>
  // </Authenticated>
);

export default App;
