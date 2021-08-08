import { Button, HStack, Text, useToast } from "@chakra-ui/react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ActionType } from "../../stores/auth/AuthActions"
import { useAuthDispatch, useAuthState } from "../../stores/auth/AuthProvider"

const Profile = () => {
    const toast = useToast();
    const authState = useAuthState();
    const authDispatch = useAuthDispatch()
    const history = useHistory();

    useEffect(() => {
        return () => {
            toast({
                title: "Logged out.",
                description: "You have successfuly logged out",
                status: "warning",
                duration: 9000,
                isClosable: true,
            })
            history.push("/")
        }
    }, [])
    return (
        <HStack>
            <Text mr={4}>Hello {authState.user?.name}</Text>
            <Button size="sm" colorScheme="whiteAlpha" onClick={() => {
                authDispatch({
                    type: ActionType.Loggout
                })
            }}>Loggout</Button>
        </HStack>
    )
}

export default Profile
