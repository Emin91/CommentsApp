import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./app/views/LoginScreen";

const Stack = createStackNavigator();

function App(): React.JSX.Element {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerTransparent: true }} />
                <Stack.Screen name="Comments" component={LoginScreen} options={{}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
