import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider>
      <>
        <h1 className="text-9xl text-amber-300">Hello world</h1>

      </>
    </MantineProvider>
  )
}

export default App
