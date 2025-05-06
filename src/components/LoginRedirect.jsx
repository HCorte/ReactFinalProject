import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginRedirect = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/main', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return !isLoggedIn ? <>{children}</> : null;
};

export default LoginRedirect;
