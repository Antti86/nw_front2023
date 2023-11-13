
import React, {useState, useEffect} from "react";
import CustomerService from '../Services/customer';
import CustomerForm from "./AddCustomerForm";
import '../Styles/Lists&Forms.css';
import Customer from "./Customer";
import ListGroup from 'react-bootstrap/ListGroup';
import Paginations from '../Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';


const CustomerList = ({setMessage, setIsPositive, setShowMessage}) => 
{

    const [customers, setcustomers] = useState([]);

    const [search, setsearch] = useState("");

    const [adding, setAdding] = useState(false);

    const [reload, setreload] = useState(false);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1); // Nykyinen sivu
    const [sortBy, setSortBy] = useState(""); // Tämä tila pitää järjestämisen tilan

    // Sivu Filtteröinti
    const filteredCustomers = customers.filter(c => {
        const lowerCaseName = c.companyName.toLowerCase();
        return lowerCaseName.indexOf(search.toLowerCase()) > -1;
    });

    let currentItems = [...filteredCustomers]; // Kloonataan filteredCustomers-joukko

    if (sortBy === "asc") {
        currentItems.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sortBy === "desc") {
        currentItems.sort((a, b) => b.companyName.localeCompare(a.companyName));
    }

    // Sivu matematiikka
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (order) => {
        setSortBy(order);
    };

    useEffect(() => 
    {
        let token = localStorage.getItem("token");
        CustomerService.setToken(token);
        CustomerService.Get()
        .then(data => setcustomers(data));

    }, [reload]);


    return(
        <div className="List">
            <h2>Asiakkaat</h2>

            {/* Jos ei lisäys moodi päällä */}
            {!adding && 
            <><div className="Actions">

                <input onChange={({ target }) => setsearch(target.value)} type="text" placeholder="Etsi yrityksen nimellä" />

                <DropdownButton id="dropdown-basic-button" title="Järjestä">
                    <Dropdown.Item onClick={() => handleSort("asc")}>A-Ö</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("desc")}>Ö-A</Dropdown.Item>
                </DropdownButton>

                <Button variant="secondary" onClick={() => setAdding(true)}>Lisää asiakas</Button>

                </div><ListGroup className="List">
                        {currentItems.map(c => (
                            <Customer
                                key={c.customerId}
                                customer={c}
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
            <CustomerForm 
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

export default CustomerList


