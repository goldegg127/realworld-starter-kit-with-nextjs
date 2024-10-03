'use client';

import { useState } from 'react';

function useSignStates() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return { email, setEmail, username, setUsername, password, setPassword, errorMessage, setErrorMessage };
}

export { useSignStates };
