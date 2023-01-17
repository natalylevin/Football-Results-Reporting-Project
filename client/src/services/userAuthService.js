import { toast } from 'react-toastify';
import axios from 'axios';

let user = null;
export const login = (username, password, onToken) => {
    axios.post("/api/user/auth", {
        username,
        password
    }).then(response => {
            user = response.data;
            axios.defaults.headers.common['Token'] = user.token;
            onToken();
    }).catch(error => {
        user = null;
        toast.error(error.response.data.message);
    })
}
