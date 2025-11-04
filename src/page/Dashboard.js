import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      try {
        // In a real application, you would fetch from your backend API
        // const response = await fetch('/api/products');
        // const data = await response.json();
        
        // For now, we'll use mock data
        const mockProducts = [
          { id: 1, name: 'สินค้า 1', price: 100, quantity: 10 },
          { id: 2, name: 'สินค้า 2', price: 200, quantity: 5 },
          { id: 3, name: 'สินค้า 3', price: 150, quantity: 20 },
          { id: 4, name: 'สินค้า 4', price: 300, quantity: 3 },
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('currentUser');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>แดชบอร์ด</h1>
        <button className="logout-button" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </div>
      
      <div className="dashboard-content">
        <h2>รายการสินค้า</h2>
        
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>รหัสสินค้า</th>
                <th>ชื่อสินค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} บาท</td>
                  <td>{product.quantity} ชิ้น</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;