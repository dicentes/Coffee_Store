import React, { useState, useEffect } from "react";
import Inventory from "./interfaces/inventory";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import userStore from "./userStore";

const Admin = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/inventory");
      setInventoryData(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      setIsLoading(false); 
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const updateQuantity = (id: string, newQuantity: string) => {
    const updatedInventoryData = inventoryData.map(item => {
      if (item.productID === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setInventoryData(updatedInventoryData);
  };

  const handlePurchase = (event: React.MouseEvent<HTMLButtonElement>, transactionType: string) => {
    if (selectedItems.length > 0) {
      alert("Processing order for " + selectedItems);
      // Send the user to an "order confirmation" page that shows them what they have ordered.
      // You can include the selectedItems array in the state and pass it to the confirmation page.
    } else {
      alert("No items selected. Please select an item.");
    }
  };

  return (
    <div className="container">
      {userStore.userRole === "admin" && <h2>THIS IS A COPY OF SHOP FOR THE TIME BEING, IGNORE</h2>}
      {userStore.userRole !== 'admin' && <h2> Hey, how did you get here? Go away! </h2>}
    </div>
  );
};

export default Admin;
