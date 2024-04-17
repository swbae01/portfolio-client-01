import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { faLock, faLockOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LOGOUT_URL = '/logout';

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Nav = ({ viewCart, setViewCart }: PropsType) => {
    const navigate = useNavigate();
    const { auth, setAuth }: any = useAuth();

    const viewButton = viewCart
        ? <button onClick={() => {
            setViewCart(false)
            navigate('/')
        }}>View Products</button>
        : <button onClick={() => {
            setViewCart(true)
            navigate('/')
        }}>View Cart</button>

    let newBtn = null
    let loginoutBtn = null
    if (auth.accessToken) {
        newBtn = (auth?.roles[2])
            ? <FontAwesomeIcon onClick={() => navigate('/new', { replace: true })} icon={faPlus} />
            : null
        loginoutBtn = <FontAwesomeIcon onClick={() => handleLogout()} icon={faLockOpen} />
    } 
    
    if (!auth.accessToken) {
        loginoutBtn = <FontAwesomeIcon onClick={() => navigate('/login', { replace: true })} icon={faLock} />
    }
    
    const handleLogout = () => {
        const handle = async () => {  
            try {
                const response = await axios.get(LOGOUT_URL,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );            
                setAuth({});
                navigate('/', { replace: true });
            } catch (err) {
                console.log(err)
            }
        }
        console.log("------------------LogOut------------------")
        handle();       
    }

    
    const content = (
        <nav className="nav">
            {viewButton}
            {newBtn}
            {loginoutBtn}
        </nav>
    )

    return content
}
export default Nav