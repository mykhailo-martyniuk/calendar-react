import Calendar from '@/Components/Calendar/Calendar.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/Components/UI/Styles/Global';
import { theme } from '@/theme.ts';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <QueryClientProvider client={queryClient}>
          <Calendar />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
