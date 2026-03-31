'use client';

import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Cột nội dung (Text) */}
          <div className="w-full md:w-1/2 space-y-6">
            <h5 className="text-xl font-semibold text-blue-500">Who are we?</h5>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Si20k_Store</h1>
            
            <div className="text-gray-600 leading-relaxed text-lg space-y-4">
              <p>
                <b className="text-red-600">Si20k_Store</b> is a secondhand fashion shop offering affordable quality items such as jackets,
                jeans, t-shirts... starting from just 20,000 VND. We are committed to providing customers with a
                budget-friendly shopping experience, diverse designs, youthful styles, and eco-friendly choices.
              </p>
              <p>
                Our mission is to help you confidently express your style while contributing to environmental
                protection through fashion reuse. Visit Si20k_Store to discover unique pieces at great prices!
              </p>
            </div>
             <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg focus:outline-none hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                <p className="text-2xl font-bold text-indigo-600">1M+</p>
                <p className="text-sm text-gray-600">Customers</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg focus:outline-none hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                <p className="text-2xl font-bold text-pink-600">10K+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
            </div>
          </div>

          {/* Cột hình ảnh */}
          <div className="w-full md:w-1/2 flex gap-4">
            <div className="w-1/2 transform -translate-y-6 transition-transform hover:-translate-y-8 duration-500">
              <Image 
                src="/images/woman.png" 
                alt="Women Fashion" 
                width={300} 
                height={400} 
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="w-1/2 transform translate-y-6 transition-transform hover:translate-y-4 duration-500">
              <Image 
                src="/images/man.png" 
                alt="Men Fashion" 
                width={300} 
                height={400} 
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}