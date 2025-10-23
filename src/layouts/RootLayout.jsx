import { Link, Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout() {
  return (
    
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        {/* Nested routes will appear here */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
