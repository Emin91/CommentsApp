import React from "react";
import { RealmProvider } from "@realm/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./app/views/LoginScreen";
import { CommentListScreen } from "./app/views/CommentsListScreen";
import { SCHEMAS } from "./app/db/db";

const Stack = createStackNavigator();

function App(): React.JSX.Element {

    return (
        <RealmProvider schema={SCHEMAS}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerTransparent: true }} />
                    <Stack.Screen name="CommentsList" component={CommentListScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </RealmProvider>
    );
}

export default App;
