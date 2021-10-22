import Cookies from 'universal-cookie';

const getToken = () => {
    const cookies = new Cookies();
	const token = cookies.get("token");
    return token;
}

export default getToken;
