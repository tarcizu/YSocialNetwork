import cookies from 'js-cookie';

export async function logout(navigate) {

    cookies.remove('access_token');

    navigate("/login", { replace: true });

};