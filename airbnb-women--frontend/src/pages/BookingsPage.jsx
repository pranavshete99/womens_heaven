import { useEffect } from "react";
import AccountNav from "./AccountNav";
import { useParams } from "react-router-dom";

export default function BookingsPage(){

    const {id} = useParams();

    const [booking, setBooking] = useState(null);

    useEffect(() => {
        
    }, []);

    // const getBooking = async () => {
    //     if(id) {
    //         const response = await fetch('http://localhost:7000/api/booking', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type' : 'application/json'
    //             }
    //         })

    //         const res_data = await response.json();

    //         if(response.ok){
                
    //         }
    //     }
    // }

    return (
        <>
            {/* <AccountNav /> */}
            <div>
                booking id : {id}
            </div>
        </>
    )
}