import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) {
            setToken(savedToken);
        }

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));

            } catch (error) {

                console.error("Invalid user data", error);
                localStorage.removeItem("user");
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = (responseData) => {

        const { token, role, fullName } = responseData;

        if (!token) {
            throw new Error(
                "Token not received from server"
            );
        }

        const userData = { fullName, role };

        setToken(token);
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const isAuthenticated = Boolean(token);

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }


    return context;
};