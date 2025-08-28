import './App.css'
import Grid from './components/Grid'

function App() {
  return (
    <div style={{ background: "#222", minHeight: "100vh", color: "#f2f2f2" }}>
      <header style={{ padding: "32px 48px", fontSize: 56, fontWeight: 800 }}>
        WhereYouStart 🚀
      </header>
      <div style={{ padding: "0 48px 48px" }}>
        <Grid />
      </div>
    </div>
  )
}

export default App
