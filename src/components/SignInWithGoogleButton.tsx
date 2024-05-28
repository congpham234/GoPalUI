import React, { useEffect } from 'react';
import { loadGooglePlatform } from 'configs/googlesignin';

function SignInWithGoogleButton() {
  useEffect(() => {
    loadGooglePlatform();
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="1075356791057-ul0maefutsvuparst0u7nc33q1ib4b6i.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="https://d2v9cv67ztousb.cloudfront.net/"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="center"
      ></div>
    </>
  );
}

export default SignInWithGoogleButton;
