
import React, {useState, useEffect} from "react";
import ProductService from '../Services/product';
import ProductForm from "./AddProduct";
import '../Styles/Customer.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Paginations from '../Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Product from "./Product";


const ProductList = ({setMessage, setIsPositive, setShowMessage}) => 
{

    const [products, setproducts] = useState([]);

    const [search, setsearch] = useState("");

    const [adding, setAdding] = useState(false);

    const [reload, setreload] = useState(false);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1); // Nykyinen sivu
    const [sortBy, setSortBy] = useState(""); // Tämä tila pitää järjestämisen tilan

    // Sivu Filtteröinti
    const filteredProducts = products.filter(c => {
        const lowerCaseName = c.productName.toLowerCase();
        return lowerCaseName.indexOf(search.toLowerCase()) > -1;
    });

    let currentItems = [...filteredProducts];

    if (sortBy === "asc") {
        currentItems.sort((a, b) => a.productName.localeCompare(b.productName)); 
    } else if (sortBy === "desc") {
        currentItems.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    // Sivu matematiikka
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (order) => {
        setSortBy(order);
    };

    useEffect(() => 
    {
        let token = localStorage.getItem("token");
        ProductService.setToken(token);
        ProductService.Get()
        .then(data => setproducts(data));

    }, [reload]);


    return(
        <div className="Customers">
            <h2>Tuotteet</h2>

            {/* Jos ei lisäys moodi päällä */}
            {!adding && 
            <><div className="Actions">

                <input onChange={({ target }) => setsearch(target.value)} type="text" placeholder="Etsi tuotteen nimellä" />

                <DropdownButton id="dropdown-basic-button" title="Järjestä">
                    <Dropdown.Item onClick={() => handleSort("asc")}>A-Ö</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("desc")}>Ö-A</Dropdown.Item>
                </DropdownButton>

                <Button variant="secondary" onClick={() => setAdding(true)}>Lisää tuote</Button>

                </div><ListGroup className="List">
                        {currentItems.map(c => (
                            <Product
                                key={c.productId}
                                product={c}
                                reload={reload}
                                setreload={setreload}
                                setMessage={setMessage}
                                setIsPositive={setIsPositive}
                                setShowMessage={setShowMessage}
                            />
                        ))}
                </ListGroup><Paginations
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange} 
                /></>
            }

            {/* Lisäys moodi */}
            {adding && 
            <ProductForm 
                setAdding={setAdding}
                reload={reload}
                setreload={setreload}
                setMessage={setMessage}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
            />}
        </div>
    )

};

export default ProductList


