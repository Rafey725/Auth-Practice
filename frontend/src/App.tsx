import AllUsernames from "./components/AllUsernames";
import AuthPage from "./components/AuthPage";

export default function App() {

    return (
        <>
            <main className="mx-auto w-full h-full px-4 space-y-10">
                <AuthPage />
                <AllUsernames />
            </main>
        </>
    )
}

