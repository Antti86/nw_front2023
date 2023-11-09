
import React, {useState} from "react"
import ProductService from '../Services/product';
import ListGroup from 'react-bootstrap/ListGroup';
import '../Styles/Customer.css';
import EditProduct from "./EditProduct";
import Button from 'react-bootstrap/Button';

const Product = ({product, reload, setreload, setMessage, setIsPositive, setShowMessage}) => 
{

    const [showdetails, setshowdetails] = useState(false);
    const [editing, setEditing] = useState(false);

    const remove = (product) => {
        let answer = window.confirm("Poistetaan tuote: " + product.productName)
        if (!answer)
        {
            return
        }
        ProductService.Remove(product.productId)
        .then (data => alert(data))
        .then(() => setreload(!reload))
        .catch (error => alert(error.message))
    }

    return(
        <div >
            <ListGroup.Item className="Item" variant="primary" onClick={() => setshowdetails(!showdetails)}>
            <strong>{product.productName}</strong>
                <br />
                {product.unitPrice + " €"}
                </ListGroup.Item>
            {showdetails && 
            <div className="customerDetails">

                {editing && <EditProduct setEditing={setEditing} reload={reload} setreload={setreload} setMessage={setMessage}
                 setIsPositive={setIsPositive} setShowMessage={setShowMessage} product={product}></EditProduct>}

                <table className="tab">
                    <thead>
                        <tr>
                            <th>Hyllyssä</th>
                            <th>Määrä/kpl</th>
                            <th>Tilauksessa</th>
                            <th>Kategoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.unitsInStock}</td>
                            <td>{product.quantityPerUnit}</td>
                            <td>{product.unitsOnOrder}</td>
                            <td>{product.category.categoryName}</td>
                            <td>
                                <Button variant="secondary" className="hidebtn" onClick={() => 
                                    {setshowdetails(!showdetails); setEditing(false)}}>Sulje</Button>
                            </td>
                            <td><Button onClick={() => setEditing(true)}>Muokkaa</Button></td>
                            <td><Button variant="danger" onClick={() => remove(product)}>Poista</Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
};

export default Product


