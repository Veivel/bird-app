import axios from 'axios';
import { useRouter } from 'next/router';
import secureLocalStorage from 'react-secure-storage';
export default function CallBackPage():JSX.Element {
    const router = useRouter();

    if (router.isReady) {
        let queryString = router.asPath.split("?")[1]
        queryString = queryString.concat("&access_type=offline")
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth2/callback?${queryString}`)
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth2/callback?${queryString}`, {withCredentials: true})
            .then(res => {
                const token = res.data.raw.IDtoken
                console.log(token)
                secureLocalStorage.setItem("token", token)
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <div>weeee</div>
        </>
    );
}