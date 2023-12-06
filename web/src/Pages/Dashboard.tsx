import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, Box, Text } from "@chakra-ui/react"
import { useAuth } from "../context/AuthContext"
import PrivateRoute from "./Template"
import CaixaAtual from "./CaixaAtual"
import CaixasAnteriores from "./CaixasAnteriores"

function Dashboard() {
    const { logout } = useAuth()

    return (
        <PrivateRoute>
            <Box
                w='100%'
                h='3rem'
                padding='1.5rem'
                display='flex'
                alignItems='center'
                justifyContent='flex-end'
            >
                <Button onClick={() => {
                    logout()
                }}>Sair</Button>
            </Box>

            <Tabs size='md' variant='enclosed'>
                <TabList>
                    <Tab>Caixa Atual</Tab>
                    <Tab>Caixas Anteriores</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <CaixaAtual />
                    </TabPanel>
                    <TabPanel>
                        <CaixasAnteriores/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </PrivateRoute>
    )
}

export default Dashboard