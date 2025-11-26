import React, { useState } from 'react';
import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    Truck,
    Shield,
    CreditCard,
    Heart,
    Share2,
    Package
} from 'lucide-react';
import axios from 'axios'
import { useEffect } from 'react';

const CartPage = ({ setActivePage }) => {
    const [cartItems, setCartItems] = useState([]);

    {/* Load Cart User */ }

    const loadCart = async () => {
        const userId = localStorage.getItem('UUID')

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart/${userId}`)

            setCartItems(
                res.data.data.map(item => ({
                    id: item.id,
                    quantity: Number(item.quantity),

                    // Produk nested
                    name: item.produk?.name,
                    price: Number(item.produk?.price),
                    originalPrice: Number(item?.produk.originalPrice),
                    image: item.produk?.image,
                    delivery: item.produk?.delivery,
                    inStock: item.produk?.stock,
                    status: item.produk?.status
                }))
            );
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => { loadCart() }, [])






    {/* Update Qty */ }
    const updateQuantity = async (cartId, newQty) => {

        if (newQty <= 0) {
            return deleteCart(cartId)
        }

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-cart`, {
                cartId,
                quantity: newQty
            })
            loadCart()

        } catch (error) {
            console.error(error)
        }
    }

    const deleteCart = async (cartId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-cart/${cartId}`)
            loadCart()
        } catch (error) {
            console.error(error)
        }
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const statusColor = {
        "in-stock": "bg-green-100 text-green-800 rounded-full px-2",
        "out-of-stock": "bg-red-100 text-red-800 rounded-full px-2",
        "low-stock": "bg-orange-100 text-orange-800 rounded-full px-2"
    }

    const CartItem = ({ item }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.name}</h3>

                            <div className="flex items-center gap-4 mb-3">
                                <div className={`inline-flex items-center gap-1 text-sm ${item.inStock <= 0 ? statusColor['out-of-stock'] : item.inStock <= 10 ? statusColor['low-stock'] : statusColor['in-stock']}`}>
                                    <div className={`w-2 h-2 rounded-full ${item.inStock <= 0 ? 'bg-red-500' : item.inStock <= 10 ? 'bg-orange-500' : 'bg-green-500'
                                        }`}></div>
                                    {(item.inStock <= 0
                                        ? 'Out-Of-Stock'
                                        : item.inStock <= 10
                                            ? 'Low-Stock'
                                            : 'In-Stock'
                                    ).replace('-', ' ')}
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">{item.delivery}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                                            <Minus size={16} className="text-gray-600" />
                                        </button>
                                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                                            <Plus size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end gap-3 mt-4 lg:mt-0">
                            <div className="text-right">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                                    {item.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                                    )}
                                </div>
                                {item.originalPrice && (
                                    <div className="text-sm text-green-600 font-semibold">
                                        Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                                    <Heart size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                    <Share2 size={18} />
                                </button>
                                <button onClick={() => deleteCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setActivePage('home')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Continue Shopping</span>
                            </button>
                        </div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="text-white" size={20} />
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-800">Shopping Cart</span>
                        </div>

                        <div className="w-24"></div> {/* Spacer for balance */}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Cart Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                            </h1>
                            <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                Remove All
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Promo Code */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Have a promo code?</h3>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter promo code"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                />
                                <button className="btn bg-blue-500 hover:bg-blue-600 border-none text-white px-6 rounded-xl font-semibold transition-all duration-200">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Truck className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Free Shipping</h4>
                                    <p className="text-gray-600 text-xs">On orders over $50</p>
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Shield className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Secure Checkout</h4>
                                    <p className="text-gray-600 text-xs">256-bit encryption</p>
                                </div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Package className="text-purple-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Easy Returns</h4>
                                    <p className="text-gray-600 text-xs">30-day guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Order Summary Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                                {/* Pricing Breakdown */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    {subtotal < 50 && (
                                        <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">
                                            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                                        </div>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-800">Total</span>
                                        <span className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mb-4">
                                    Proceed to Checkout
                                </button>

                                {/* Payment Methods */}
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-3">We accept</p>
                                    <div className="flex justify-center gap-3">
                                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                                            <CreditCard size={14} className="text-gray-600" />
                                        </div>
                                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            Visa
                                        </div>
                                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            MC
                                        </div>
                                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                                            PayPal
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Continue Shopping */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Need more items?</h3>
                                <button onClick={() => setActivePage('home')} className="w-full btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;