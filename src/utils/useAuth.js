import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (setBearerToken) => {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = null;
        try {
            token = JSON.parse(tokenString);
        } catch (e) {
            console.error('Error parsing token:', e);
        }
        if (!token) {
            navigate('/signin');
            return;
        }
        fetch(`${import.meta.env.VITE_API_URL}/auth/verifyToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token validation failed: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            setBearerToken(token);
        })
        .catch(error => {
            console.error('Error validating token:', error);
            navigate('/signin');
        });
    }, [navigate, setBearerToken]);
};

export default useAuth;