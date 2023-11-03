
import React, {useState, useEffect} from "react"
import UserService from '../Services/user'
// import CustomerAdd from "./AddCustomer";
import '../App.css'
import UserAdd from "./UserAdd";



const UserList = ({setMessage, setIsPositive, setShowMessage}) => 
{

    const [users, setusers] = useState("");
    const [showusers, setshowusers] = useState(true);


    const [adding, setAdding] = useState(false)

    const [reload, setreload] = useState(false)

    useEffect(() => 
    {
        UserService.GetUsers()
        .then(data => setusers(data));

    }, [])


    return(
        <div className="Customers">
            <h2>Users</h2>


            {!adding && <button onClick={() => setAdding(true)}>Add new User</button>}

            {adding && <UserAdd setAdding={setAdding} reload={reload} setreload={setreload}
             setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/>}



            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>UserName</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(u => 
                        <tr key={u.userId}>
                            <td>{u.firstName}</td>
                            <td>{u.phone}</td>
                            <td>{u.userName}</td>
                            {u.accessLevelid > 0 ? <td>No</td> : <td>Yes</td>}
                        </tr>)}
                </tbody>
            </table>



        </div>
    )


};

export default UserList


