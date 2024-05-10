import React from 'react';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { fetchProtectedResource, signIn } from '../../configs/backendcogitoclient';
// Import other components as needed


function LandingPage() {
    const [signInStatus, setSignInStatus] = useState('');

    const handleSignIn = async () => {
        try {
            const idToken = await signIn();
            if (idToken) {
                setSignInStatus('Sign in successful.');
                // Optionally proceed with token for further actions
            } else {
                setSignInStatus('Authentication failed: No ID token received.');
            }
            const result = await fetchProtectedResource(idToken!);
            console.log("CONG IS HERE")
            console.log(result);
        } catch (error) {
            console.error(error);
            setSignInStatus('Sign in failed. See console for more details.');
        }
    };

    return (
        <div className="LandingPage">
            <div>
                <CustomButton customVariant='primary' onClick={() => handleSignIn()}>Sign In</CustomButton>
                {signInStatus && <p>{signInStatus}</p>}
            </div>
        </div>
    );
}

export default LandingPage;