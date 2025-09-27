import { useState } from "react";
import { Button } from "../components/Button";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users(){
    const [users,setUsers] = useState([])
    const [filter,setFilter] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => setUsers(response.data.user))
    },[filter])

    return <div>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input placeholder="Search Users..." className="w-full border border-gray-400 rounded-md px-2 py-1"
            onChange={e => setFilter(e.target.value)}></input>
        </div>
        {users.map((user) => <User user={user} />)}
    </div>
}


function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between items-center m-2">
        <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-slate-300 flex justify-center items-center">
                <div>
                    {user.firstName[0]}
                </div>
            </div>
            <div className="ml-2">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div>
            <Button label={"Send Money"} onClick={(e) => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }}></Button>
        </div>
    </div>
}