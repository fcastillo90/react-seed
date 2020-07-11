import React from 'react'
import '@src/App.css'
import { ReactLogo } from '@components/icons'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ReactLogo className="App-logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
