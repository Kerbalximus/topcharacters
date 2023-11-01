import { useState, useEffect } from 'react';
import './login.css'
import { useNavigate  } from 'react-router-dom';

const Login = () => {

  function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonOn, setButtonOn] = useState(true);
  const navigate = useNavigate()

  console.log(document.cookie.split(";")[0].split("=")[1])

  useEffect(() => {
    // Проверка валидации после изменения email или password
    if (email.trim() !== "" && password.trim() !== "") {
      setButtonOn(false);
    } else {
      setButtonOn(true);
    }
  }, [email, password]);

  const emailCheckValidator = (event) => {
    setEmail(event.target.value);
  };

  const passwordCheckValidator = (event) => {
    setPassword(event.target.value);
  };

  const buttonLogin = async () => {
    console.log(email, password)
    var resposne = await fetch("http://localhost:4000/auth", {
      "method": "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      "body": JSON.stringify({
        "email": email,
        "password": await hash(password)
      })
    })

    var data = await resposne.text()

    if (data === "Password failed") {
      return alert("Неверный пароль")
    }

    navigate(-1)

    console.log(data)

    document.cookie = `token=${data};`
  }


  return <div style={{
    height: "100%"
  }}>
    <div style={{
      marginTop: "min(20%, 192px)",
      marginLeft: "10%",
    }}><ul style={{
      flexDirection: "row",
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center",
      // justifyContent: "center",
    }}>
        <li
          style={{
            width: "42%"
          }}
        ><div style={{
          fontSize: "min(4vw, 48px)"
        }}>

            <h2>to
              vote for a character
              need an account.</h2>

          </div></li>
        <li style={{
          marginRight: "15%"
        }}>
          <div>
            <ul style={{
              flexDirection: "column",
              display: "flex",
              // alignItems: "center",
            }}>
              <li>
                <input
                  class="login"
                  onChange={emailCheckValidator}
                  placeholder='Email' type='email' ></input>
              </li>
              <li>
                <input
                  class="login"
                  onChange={passwordCheckValidator} placeholder='Password' type="password" />
              </li>
              <li>

                <button
                  id="login"
                  onClick={buttonLogin}
                  disabled={buttonOn}>Login/SignIn</button>
              </li>
            </ul>
          </div>
        </li>
      </ul></div>


  </div>;
};

export default Login;