import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate successful email verification and redirect after 2 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>Email verified successfully! Redirecting to home...</div>
    );
};

export default EmailVerify;