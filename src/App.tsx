import { useState } from 'react'
import Login from './components/Login'
import Layout from './components/Layout'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('session') === 'active'
  })

  function handleLogin() {
    sessionStorage.setItem('session', 'active')
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return <Layout />
}

export default App