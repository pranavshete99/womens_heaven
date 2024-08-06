import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:7000/api/user/profile', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          setUser(data.data.user);
          setReady(true);
        })
      }, []);

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;