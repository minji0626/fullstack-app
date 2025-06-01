import React from 'react'

function CartTable({ products, onRemoveItem }) {

    const renderCartImage = (images) => {
        if(images.length > 0){
            let image = images[0];
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        }
    }

    const renderItems = (
        products.length > 0 && products.map((product, index) => (
            <tr key={index} className="border-b-[1.5px]">
                <td className="p-4 align-middle">
                    <img className="w-[70px] mx-auto block rounded" alt="product" src={renderCartImage(product.images)} />
                </td>
                <td className="p-4">{product.quantity} 개</td>
                <td className="p-4">{product.price.toLocaleString()} 원</td>
                <td className="p-4">
                    <button
                        onClick={() => onRemoveItem(product._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition"
                    >
                        X
                    </button>
                </td>
            </tr>
        ))
    )

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-center text-gray-700">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                    <tr>
                        <th className="p-3">사진</th>
                        <th className="p-3">개수</th>
                        <th className="p-3">가격</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {renderItems}
                </tbody>
            </table>
        </div>
    )
}

export default CartTable
