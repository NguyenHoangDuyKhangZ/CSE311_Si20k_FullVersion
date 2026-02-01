import AboutUs from "@/components/Home/aboutUs";
import AllProducts from "@/components/Home/allProducts2";
import BestSelling from "@/components/Home/bestSelling2";
import Contact from "@/components/Home/contact";
import FloatingCart from "@/components/Home/floatingCart";
import SuperSale from "@/components/Home/superSale";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <main className="w-full">
        <SuperSale />
        <BestSelling />
        <AllProducts />
        <AboutUs />
        <Contact />
        <FloatingCart />
      </main>
    </div>
  );
}
