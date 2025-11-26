import React, { useState, useEffect } from 'react';
import {
    Search,
    ShoppingCart,
    Heart,
    Star,
    Filter,
    Grid3X3,
    List,
    ChevronDown,
    Package,
    Truck,
    Shield,
    Clock
} from 'lucide-react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import AnimatedSuccess from "@/components/ui/AnimatedSuccess"
import { motion, AnimatePresence } from "framer-motion";

const Homepage = ({ setActivePage }) => {
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('featured');
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false)
    const [succes, setSuccess] = useState(false)

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    // Mock product data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/produk')

                await delay(5000)

                const produk = res.data.data

                setProducts(produk)
                setLoading(false)


            } catch (error) {
                console.error(error)
            }
        }

        fetchProducts()

    }, []);


    const handleCart = async (produkId) => {

        const userId = localStorage.getItem('UUID')

        try {
            const res = await axios.post('http://localhost:3001/add-cart', {
                userId,
                produkId,
                quantity: 1
            })

            const result = res.data

            setSuccess('Your purchase has been confirmed!')
            await delay(2000)
            setSuccess('')


        } catch (error) {
            console.error(error)
        }
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                size={14}
                className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
            />
        ));
    };

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            New
                        </span>
                    )}
                    {product.isFeatured && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => setLike(prev => !prev)} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        {like ? <Heart size={16} fill='red' className="text-red-500" /> : <Heart size={16} className="text-gray-600" />}
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <ShoppingCart size={16} className="text-gray-600" />
                    </button>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase font-semibold">{product.category}</span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-800">${product.price}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button onClick={() => handleCart(product.id)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header show={Boolean(succes)} className="bg-white shadow-sm border-b border-gray-200">
                <AnimatePresence>
                    {succes && (<motion.div initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="w-full">
                        <div role="alert" className="fixed z-99 translate-y-1.5 translate-x-6 w-[1100px] alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{succes}</span>
                        </div>
                    </motion.div>)}
                </AnimatePresence>


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div htmlFor="my-drawer-4" aria-label="open sidebar" className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center ">
                                <Package className="text-white" size={20} />
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-800">ShopNow</span>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Cart & Actions */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => setActivePage('cart')} className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                <ShoppingCart size={24} />
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Truck className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                                <p className="text-sm text-gray-600">On orders over $50</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Shield className="text-green-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Secure Payment</h3>
                                <p className="text-sm text-gray-600">100% secure</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                                <p className="text-sm text-gray-600">Dedicated support</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Package className="text-orange-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Easy Returns</h3>
                                <p className="text-sm text-gray-600">30-day returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
                        <p className="text-gray-600">Discover our most popular items</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        {/* View Toggle */}
                        <div className="flex bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <Grid3X3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                <List size={20} />
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn bg-white border border-gray-300 hover:border-blue-500">
                                <Filter size={16} />
                                Sort
                                <ChevronDown size={16} />
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Featured</a></li>
                                <li><a>Price: Low to High</a></li>
                                <li><a>Price: High to Low</a></li>
                                <li><a>Newest First</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Products Grid - 4 items per row */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 animate-pulse">
                                <div className="bg-gray-300 h-48 rounded-xl mb-4 flex justify-center items-center">
                                    <span className="loading loading-dots loading-xl bg-gray-50 animate-pulse"></span>

                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <button className="btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200">
                        Load More Products
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Homepage;