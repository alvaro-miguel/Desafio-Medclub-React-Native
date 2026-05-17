import { Stack } from "expo-router";
import { ConsultasProvider } from "./consultasContext";


export default function Layout(){
    return(
        <ConsultasProvider>
            <Stack screenOptions={{headerShown: false}}/>
        </ConsultasProvider>
    );
}