import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { useEffect } from "react";

const MainLayout = () => {
  useEffect(() => {
    console.log("MainLayout rendered");
  });

  useEffect(() => {
    console.log("MainLayout mounted");
    return () => {
      console.log("MainLayout unmounted");
    };
  }, []);

  return (
    <div className="page flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex justify-center items-center h-full w-full overflow-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
