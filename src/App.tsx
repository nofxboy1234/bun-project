import "./index.css";
import { Tasks } from "./Todos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tasks />
    </QueryClientProvider>
  );
}

export default App;
