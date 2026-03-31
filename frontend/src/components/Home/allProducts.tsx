'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useStore } from '@/src/context/store_context';

const CATEGORY_IMAGES: Record<string, string> = {
  all: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800',
  jackets: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800',
  pants: 'https://images.unsplash.com/photo-1493357335960-4583bfa6f8d9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  shirts: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
};

export default function AllProducts() {

  const {
    products,
    isLoadingProducts,
    openProductDetail,
    addToCart,
    currentUser,
    setSelectedProductToDelete,
    setDeleteProductModalOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>('all');
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('search') || '';

  const filtered = products.filter((p) => {

    const pCategory = (p.category || '').toLowerCase();

    const matchCategory = activeTab === 'all' || pCategory === activeTab.toLowerCase();


    const matchSearch = p.name.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="py-20 bg-gray-50" id="all-products">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-600 mb-2">= All Products =</h2>
          <p className="text-gray-500 text-lg">Explore our full collection</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">


          <div className="lg:w-2/3 w-full">

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 border-b-2 border-indigo-100 pb-1">
              {['all', 'jackets', 'pants', 'shirts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-4 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-lg rounded-t-lg transition-all capitalize
                    ${activeTab === tab
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md translate-y-[2px]'
                      : 'bg-transparent text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>


            {isLoadingProducts ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-white rounded-xl shadow-sm border border-gray-100">
                <i className="fas fa-box-open text-4xl mb-3 block" />
                <p>No products found in this category.</p>
              </div>
            ) : (

              <div className="space-y-4 animate-fade-in">
                {filtered.map((product) => {

                  const price = product.price ?? product.originalPrice ?? 0;
                  const originalPrice = product.originalPrice ?? price;
                  const discount = originalPrice > price
                    ? Math.round(((originalPrice - price) / originalPrice) * 100)
                    : 0;
                  const imageSrc = product.img ?? 'https://via.placeholder.com/400x300?text=No+Image';
                  const soldCount = product.sold ?? 0;

                  return (
                    <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 flex gap-4 items-center">


                      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer" onClick={() => openProductDetail(product)}>
                        <img src={imageSrc} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <button className="bg-white text-gray-800 px-2 py-1 rounded-lg text-xs sm:text-sm font-semibold shadow">
                            <i className="fas fa-eye mr-1"></i>View
                          </button>
                        </div>
                      </div>


                      <div className="flex-grow min-w-0">
                        <h3
                          className="font-bold text-gray-800 text-base sm:text-lg cursor-pointer hover:text-indigo-600 truncate"
                          onClick={() => openProductDetail(product)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-1 sm:line-clamp-2">{product.description}</p>

                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {discount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <i className="fas fa-fire"></i> -{discount}%
                            </span>
                          )}
                          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            Sold {soldCount}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mt-1 gap-3">
                          <div>
                            <span className="text-indigo-600 font-bold text-lg sm:text-xl mr-2">
                              {price.toLocaleString('vi-VN')}₫
                            </span>
                            {discount > 0 && (
                              <del className="text-gray-400 text-xs sm:text-sm">{originalPrice.toLocaleString('vi-VN')}₫</del>
                            )}
                          </div>


                          <div className="flex gap-2">
                            <button
                              onClick={() => addToCart(product)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1 sm:gap-2"
                            >
                              <i className="fas fa-cart-plus"></i> Add
                            </button>


                            {currentUser?.role === 'admin' && (
                              <button
                                onClick={() => {
                                  setSelectedProductToDelete(product);
                                  setDeleteProductModalOpen(true);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center"
                                title="Delete product"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>


          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-24 transition-all duration-500 ease-in-out">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={CATEGORY_IMAGES[activeTab] || CATEGORY_IMAGES['all']}
                  alt={`${activeTab} Collection`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-white text-3xl font-bold capitalize">
                    {activeTab === 'all' ? 'Our Collection' : `${activeTab} Collection`}
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}