import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <Home />
    </ThemeProvider>
  );
}

export default App;
