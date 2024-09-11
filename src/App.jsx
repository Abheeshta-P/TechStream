

function App() {
  // always env better to put REACT_APP when cra is used this is must 
  // access env, when CRA is used
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <>
    <h1>Blog app</h1>
    </>
  )
}

export default App

// always env better to put REACT_APP when cra is used this is must 