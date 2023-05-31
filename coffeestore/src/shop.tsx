import React, { useState, useEffect } from "react";
import Inventory from "./interfaces/inventory";
import { useNavigate, Link } from 'react-router-dom';
import User from "./user";
import userStore from "./userStore";
import * as Icon from 'react-bootstrap-icons';
import * as Icon2 from 'react-icons';
import axios from "axios";


//okay, time to make this REAL

const fetchInventory = async () => {
  try {
    console.log("Reaching out to the server for shop data.");
    const response = await axios.get('http://localhost:3500/api/inventory');
    const inventoryData = response.data;
    // Process the inventory data as needed
    console.log(inventoryData);
  } catch (error) {
    console.error(error);
  }
};

/*
const FakeInventoryData: Inventory[] = [
  {
    productID: "1233456",
    name: "Ferrara Brand One",
    description: "A damn fine cup of coffee.",
    quantity: "10",
    price: "10"
  },
  {
    productID: "7890123",
    name: "Ferrara Brand Two",
    description: "Basically mudwater.",
    quantity: "50",
    price: "12"
  }
];
*/ 

const OrderReceived: boolean = true;
 
const Shop = () => {

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
  
  const sendOrderDataToServer = () => {
    //send data to server 
    //send user to confirmation page (ideally this happens after we get a response from the server, but for now we will fake it)
    if (OrderReceived === true){
      navigate('/confirmation', { state: { selectedItems } }); // pass selectedItems to confirmation page
    }
  }

  const handlePurchase = (event: React.MouseEvent<HTMLButtonElement>, transactionType: string) => {
    if (selectedItems.length > 0){
      alert("Processing order for " + selectedItems);
      //Send the user to an "order confirmation" page that shows them what they have ordered.
      sendOrderDataToServer();
    } else {
      alert("No items selected. Please select an item.");
    }
    }

    return (
      <div className="container">
        <h2>Coffee Store <Icon.CupHot/></h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map(item => (
                  <tr key={item.productID}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.productID)}
                        onChange={(event) => handleCheckboxChange(event, item.productID)}
                      />
                    </td>
                    <td>{item.productID}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={(event) => handlePurchase(event, "OTP")}>
              One Time Purchase
            </button>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    );
};

export default Shop;
