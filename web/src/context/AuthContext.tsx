import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import api from '../Utils/axios';
import { useToast } from '@chakra-ui/react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (cpf: string) => Promise<void>;
    logout: () => void;
    getUser: () => {
        cargo: string;
        cpf: string;
        id: number;
        nome: string;
    };
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        const checkToken = async () => {
            // Verificar se há um token no localStorage ao carregar a página
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verificar a validade do token fazendo uma requisição ao servidor
                    const response = await api.get('http://localhost:5555/api/usuarios');

                    if (response.data) {
                        toast({
                            title: 'Bem vindo(a)!',
                            description: "Seja bem vindo(a) ao Controle de Caixa.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true
                        });
                        setIsAuthenticated(true);
                    } else {
                        // Token inválido, redirecionar para a página de login
                        toast({
                            title: 'Ops...',
                            description: "Token inválido, redirecionar para a página de login.",
                            status: 'warning',
                            duration: 9000,
                            isClosable: true
                        });

                        setIsAuthenticated(false);
                        return <Navigate to="/login" />;
                    }
                } catch (error) {
                    toast({
                        title: 'Erro!',
                        description: "Erro ao verificar token.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    });
                }
            }
        };

        checkToken();
    }, []);

    const login = async (cpf: string): Promise<void> => {
        try {
            // Fazer a requisição para o servidor
            const response = await axios.post('http://localhost:5555/api/usuarios/login', {
                cpf
            });

            // Extrair o token do response
            const token = response.data.token;
            const usuario = response.data.usuario;

            // Salvar o token no localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', usuario)

            // Atualizar o estado de autenticação
            toast({
                title: 'Bem vindo(a)!',
                description: "Seja bem vindo(a) ao Controle de Caixa.",
                status: 'success',
                duration: 9000,
                isClosable: true
            });

            setIsAuthenticated(true);
        } catch (error) {
            toast({
                title: 'Erro!',
                description: "Erro ao fazer login.",
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const logout = () => {
        // window.location.href = "http://localhost:5173/login"
        setIsAuthenticated(false);

        toast({
            title: 'Até mais!',
            description: "Logout realizado com sucesso!",
            status: 'success',
            duration: 9000,
            isClosable: true
        });

        setTimeout(function(){
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
        }, 2)

    };

    const getUser = () => {
        const data = localStorage.getItem('usuario')

        if (!!data) {
            return JSON.parse(data)
        } else {
            toast({
                title: 'Erro!',
                description: "Erro ao fazer login.",
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
