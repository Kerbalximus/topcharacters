import { Outlet, Link } from "react-router-dom";
import styles from './layout.css'

const Layout = () => {
  return (
    <>
      <div style={{
        marginTop: "10px",
        marginBottom: "10px"
      }}><nav className={styles}>
        <ul>
          <li id="inline" style={{ marginLeft: "2.5%", marginRight: "47%" }}>
            <Link to="/">TopCharacters</Link>
          </li>
          <li id="inline" style={{ marginRight: "5%" }}>
            <Link to="/info" >Info</Link>
          </li>
          <li id="inline" >
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

        <Outlet /></div>

    </>
  )
};

export default Layout;