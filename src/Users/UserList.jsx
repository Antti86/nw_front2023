
import React, {useState, useEffect} from "react";
import UserService from '../Services/user'
import Table from 'react-bootstrap/Table';
import '../Styles/Lists&Forms.css';
import UserAdd from "./UserAdd";
import Button from 'react-bootstrap/Button';
import UserEdit from "./UserEdit";



const UserList = ({setMessage, setIsPositive, setShowMessage}) => 
{

    const [users, setusers] = useState("");

    const [adding, setAdding] = useState(false);

    const [editing, setEditing] = useState(false);
    const [modUser, setmodUser] = useState({});

    const [reload, setreload] = useState(false);

    const remove = (user) => {
        let answer = window.confirm("Poistetaan käyttäjä: " + user.userName)
        if (!answer)
        {
            return;
        }
        if (user.userName === localStorage.getItem("username"))
        {
            alert("Ei voida poistaa käyttäjää millä on kirjauduttu!");
            return;
        }
        UserService.Remove(user.userId)
        .then (data => alert(data))
        .then(() => setreload(!reload))
        .catch (error => alert(error.message))
    };

    useEffect(() => 
    {
        let token = localStorage.getItem("token");
        UserService.setToken(token);
        UserService.Get()
        .then(data => setusers(data));

    }, [reload]);


    return(
        <div className="List">
            <h2>Käyttäjät</h2>

            {!adding && !editing && 
            <div>
                <Button className="Forms" variant="secondary" onClick={() => setAdding(true)}>Uusi käyttäjä</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nimi</th>
                            <th>Puhelin</th>
                            <th>Käyttäjänimi</th>
                            <th>Admin</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(u => 
                            <tr key={u.userId}>
                            <td>{u.firstName} {u.lastName}</td>
                            <td>{u.phone}</td>
                            <td>{u.userName}</td>
                            {u.accessLevelid < 1 ? <td>Ei</td> : <td>Kyllä</td>}
                            <td><Button onClick={() => {setEditing(true); setmodUser(u); }}>Muokkaa</Button></td>
                            <td><Button variant="danger" onClick={() => remove(u)}>Poista</Button></td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>}

            {adding && <UserAdd setAdding={setAdding} reload={reload} setreload={setreload}
             setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}

            {!adding && editing && <UserEdit setEditing={setEditing} reload={reload} setreload={setreload}
             setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} user={modUser}/>}

        </div>
    )


};

export default UserList


