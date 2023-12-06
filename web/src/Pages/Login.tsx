import {
    Box,
    Button,
    Heading,
    Select,
    Text,
    useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import LacunaWebPKI, { CertificateModel } from 'web-pki';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Login() {
    const [certificates, setCertificates] = useState<CertificateModel[]>();
    const [selectedCertificate, setSelectedCertificate] = useState<string>("");
    const pki = new LacunaWebPKI();
    const toast = useToast();
    const { isAuthenticated, login } = useAuth()

    useEffect(() => {
        function getCertText(cert: CertificateModel) {
            return cert.subjectName + ' (issued by ' + cert.issuerName + ')';
        }

        function onReady() {
            pki.listCertificates().success(function (certs) {
                for (let i = 0; i < certs.length; i++) {
                    let cert = certs[i];
                    getCertText(cert);
                }
                setCertificates(certs);
            });
        }

        pki.init({ ready: onReady });
    }, []);

    function authenticationDataToString(data: string): string {
        return btoa(data);
    }

    function performLogin(certificate: string) {
        const data = authenticationDataToString("Autenticar");

        pki.signData({
            thumbprint: certificate,
            data,
            digestAlgorithm: 'SHA-256'
        }).success(() => {
            const user = certificates?.filter((u) => u.thumbprint === certificate);

            if (user) {
                const userData = {
                    cpf: user[0].pkiBrazil.cpf
                };
                handleLoginSuccess(userData);
            } else {
                handleLoginFailure();
            }
        }).fail(handleLoginFailure);
    }

    async function handleLoginSuccess(userData: { cpf: string }) {
        login(userData.cpf)
    }

    function handleLoginFailure() {
        toast({
            title: 'Erro!',
            description: "Não foi possível realizar o login.",
            status: 'error',
            duration: 9000,
            isClosable: true
        });
    }

    return (
        <>
            {
                isAuthenticated ? (
                    <Navigate to='/'/>
                ) : (

                    <Box
                        w='100vw'
                        h='100vh'
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Heading w='50%' textAlign='center'>Olá, seja bem vindo ao controle de caixa!</Heading>
                        <Text
                            fontSize='md'
                            mb='2rem'
                        >
                            Para entrar, selecione seu Certificado Digital.
                        </Text>

                        {certificates ? (
                            <>
                                <Select
                                    placeholder='Selecione seu certificado digital.'
                                    w='50%'
                                    mb='2rem'
                                    onChange={(e) => {
                                        setSelectedCertificate(e.currentTarget.value);
                                    }}
                                >
                                    {certificates.map((cert, index) => (
                                        <option
                                            key={index}
                                            value={cert.thumbprint}
                                        >
                                            {cert.subjectName}
                                        </option>
                                    ))}
                                </Select>

                                <Button
                                    colorScheme='blue'
                                    variant='outline'
                                    size='md'
                                    w='50%'
                                    onClick={() => {
                                        performLogin(selectedCertificate);
                                    }}
                                >
                                    Entrar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Select
                                    placeholder='Selecione seu certificado digital.'
                                    w='50%'
                                    disabled
                                    mb='2rem'
                                />

                                <Button
                                    colorScheme='blue'
                                    variant='outline'
                                    size='md'
                                    w='50%'
                                    isDisabled
                                >
                                    Entrar
                                </Button>
                            </>
                        )}
                    </Box>
                )
            }
        </>

    );
}

export default Login;
