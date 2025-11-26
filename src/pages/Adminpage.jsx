import React, { useEffect, useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Eye,
    Package,
    TrendingUp,
    ShoppingCart,
    Tag,
    MoreVertical,
    Image,
    MessageCircleX,
    MailCheck
} from 'lucide-react';
import axios from 'axios'
import AnimatedSuccess from "@/components/ui/AnimatedSuccess"
import AnimatedAlert from "@/components/ui/AnimatedAlert"


const AdminDashboard = () => {
    const [products, setProducts] = useState([])
    const [add, setAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [produckName, setProductName] = useState('')
    const [produckPrice, setProductPrice] = useState('')
    const [produckReviews, setProductReviews] = useState('')
    const [produckRating, setProductRating] = useState('')
    const [produckCategory, setProductCategory] = useState('')
    const [produckStock, setProductStock] = useState('')
    const [produckDelivery, setProductDelivery] = useState('')
    const [produckOriginalPrice, setProductOriginalPrice] = useState('')

    const [error, setError] = useState('test error')
    const [success, setSuccess] = useState('Product added successfully!')

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    // Static data for display
    const loadProduct = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/produk`)

            const produk = res.data.data
            setProducts(produk)
        } catch (error) {
            console.error(error)
        }
    }

    const handleAdd = async () => {
        if (image || produckName || produckPrice || produckReviews || produckRating || produckCategory || produckStock || produckDelivery || produckOriginalPrice) {
            setLoading(true)
        } else {
            setLoading(false)
            return
        }


        try {
            const formData = new FormData()

            formData.append('file', image)
            formData.append('name', produckName)
            formData.append('price', produckPrice)
            formData.append('review', produckReviews)
            formData.append('rating', produckRating)
            formData.append('category', produckCategory)
            formData.append('stock', produckStock)
            formData.append('delivery', produckDelivery)
            formData.append('originalPrice', produckOriginalPrice)

            await axios.post(`${import.meta.env.VITE_API_URL}/add-produk`, formData)

            await delay(1000)
            setAdd(false)
            setImage(null)
            setLoading(false)
            loadProduct()
        } catch (error) {
            console.error(error)
        }



    }

    useEffect(() => {
        loadProduct()
    }, [])

    const statusColors = {
        "in-stock": "bg-green-100 text-green-800",
        "out-of-stock": "bg-red-100 text-red-800",
        "low-stock": "bg-orange-100 text-orange-800"
    };



    const handleDelete = async (produkId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/delete-produk/${produkId}`)
            loadProduct()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Package className="text-white" size={20} />
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-800">Admin Dashboard</span>
                        </div>
                        <button onClick={() => setAdd(true)} className="btn bg-blue-500 hover:bg-blue-600 border-none text-white">
                            <Plus size={18} />
                            Add Product
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                        <div className="flex flex-col sm:flex-row gap-4">

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full sm:w-64"
                                />
                            </div>

                            {/* Filter */}
                            <select className="select select-bordered border-gray-300 w-full sm:w-48">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Home</option>
                                <option>Sports</option>
                            </select>
                        </div>

                        <div className="text-sm text-gray-600">
                            Showing {products.length} products
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-10 h-10 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-800">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{product.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-800">${product.price}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{product.stock} units</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock <= 0 ? statusColors['out-of-stock'] : product.stock <= 10 ? statusColors['low-stock'] : statusColors['in-stock']
                                                }`}>
                                                {(product.stock <= 0
                                                    ? 'Out-Of-Stock'
                                                    : product.stock <= 10
                                                        ? 'Low-Stock'
                                                        : 'In-Stock'
                                                ).replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Product Modal (Static) */}
                {add && <div className="fixed inset-0 backdrop-blur flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
                            <button onClick={() => setAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            {error && <div className="fixed w-full max-w-md p-5 pt-9 mb-4 z-99">
                                <AnimatedAlert
                                    type='error'
                                    message={
                                        <div className='flex items-center gap-2'>
                                            <MessageCircleX size={18} />
                                            <span className="text-sm font-medium">{error}</span>
                                        </div>
                                    }
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50"
                                />
                            </div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label font-semibold">Product Name</label>
                                    <input required onChange={(e) => setProductName(e.target.value)} value={produckName} type="text" className="outline-0 input input-bordered" placeholder="Enter product name" />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Category</label>
                                    <select required value={produckCategory} onChange={(e) => setProductCategory(e.target.value)} className="select outline-0 select-bordered">
                                        <option disabled default className='font-bold text-100'>Choose Category</option>
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Home</option>
                                        <option>Sports</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Delivery</label>
                                    <select required value={produckDelivery} onChange={(e) => setProductDelivery(e.target.value)} className="select outline-0 select-bordered">
                                        <option disabled default className='font-bold text-100'>Choose Delivery</option>
                                        <option>Free delivery</option>
                                        <option>50$</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Price</label>
                                    <input required onChange={(e) => setProductPrice(e.target.value)} value={produckPrice} type="number" className="input outline-0 input-bordered" placeholder="0.00" />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Original Price</label>
                                    <input required onChange={(e) => setProductOriginalPrice(e.target.value)} value={produckOriginalPrice} type="number" className="input outline-0 input-bordered" placeholder="0.00" />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Stock</label>
                                    <input required onChange={(e) => setProductStock(e.target.value)} value={produckStock} type="number" className="input outline-0 input-bordered" placeholder="0" />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Rating</label>
                                    <input required onChange={(e) => setProductRating(e.target.value)} value={produckRating} type="number" className="input outline-0 input-bordered" placeholder="0" />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Reviews</label>
                                    <input required onChange={(e) => setProductReviews(e.target.value)} value={produckReviews} type="number" className="input outline-0 input-bordered" placeholder="0" />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">Product Image</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                        {image ? <img
                                            src={URL.createObjectURL(image)}
                                            className="w-24 h-24 mx-auto rounded-lg mt-4 object-cover"
                                        /> : <Image className="mx-auto text-gray-400" size={48} />}
                                        <p className="mt-2 text-sm text-gray-600">Drag and drop an image or click to browse</p>
                                        <input
                                            required
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImage}
                                            className="file-input outline-0 file-input-bordered mt-4 w-full max-w-xs"
                                            name='file'
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button onClick={() => { setAdd(false), setImage(null) }} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleAdd} className="btn btn-primary">{loading ? <div className="flex items-center gap-2">
                                <span className="loading loading-spinner loading-sm"></span>
                                <span>Saving...</span>
                            </div> : "Add Product"}</button>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default AdminDashboard;