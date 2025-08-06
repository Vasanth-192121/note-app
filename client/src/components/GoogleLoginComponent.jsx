// client/src/GoogleLoginComponent.jsx
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

/**
 * GoogleLoginComponent
 * A component to handle Google OAuth login, designed to be lazy-loaded.
 * It encapsulates the GoogleOAuthProvider and GoogleLogin components.
 *
 * @param {object} props - Component props.
 * @param {string} props.googleClientId - The Google OAuth client ID.
 * @param {function} props.onSuccess - Callback function for successful Google login.
 * @param {function} props.onError - Callback function for failed Google login.
 */
const GoogleLoginComponent = ({ googleClientId, onSuccess, onError }) => {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme='filled_blue'
        text='continue_with'
        shape='circle'
        width={"250"}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
