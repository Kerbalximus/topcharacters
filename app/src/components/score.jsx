import { useNavigate } from "react-router-dom";

const ScoreCharacter = (props) => {

    const navigate = useNavigate()

    const characterRating = async (rating) => {


        var token = document.cookie.split("; ")[0].split("=")[1]
        var fetch_body = {}
        if (rating === true) {
            fetch_body = {
                "score": "good",
                "characterId": props.character_id
            }
        } else {
            fetch_body = {
                "score": "bad",
                "characterId": props.character_id
            }
        }


        var response = await fetch("http://localhost:4000/score",
            {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                "body": JSON.stringify(
                    fetch_body
                ),
            })

        var text_response = await response.text()

        console.log(text_response)

        if (text_response === "No authorization") {
            navigate(`/login`)
        } else if (text_response === "true") {
            // console.log('Все хорошо')
            window.location.reload();
            //  Обновление страницы почему-то не работает, поэтому я решил просто перекидывать человека на главную страницу
            // navigate(`/`)
        } else if (text_response === "Retry after 24h") {
            alert("Не получилось :( Возвращайтесь через 24 часа")
        }
    }



    return <ul style={{
        padding: 0,
        // height: "100%",
        width: "115%",
        // marginBottom: "50%",
        flexDirection: "row",
        // justifyItems: "center",
        // justifyContent: "center",
    }}>
        <li style={{
            display: "flex",
            alignItems: "center",
            marginRight: "5%"
        }}>
            <button
                onClick={(e) => characterRating(true)}

                style={{
                    // outline: 0,
                    border: 0,
                    height: "38px",
                    width: '38px',
                    borderRadius: "24px",
                    background: "#92FF90",
                    flexShrink: 0,

                }}
            ></button>
        </li>
        <li>
            <div style={{
                // marginLeft: "10%",
                // marginRight: "10%"
            }}>
                <h2 style={{
                    padding: 0,
                    margin: 0,
                    fontSize: "38px",
                    lineHeight: "normal",
                    textAlign: "center",
                }}>{props.rating}</h2> </div></li>
        <li style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "5%"
        }}><button style={{
            outline: 0,
            border: 0,
            height: "38px",
            width: '38px',
            borderRadius: "50%",
            background: "#FF9090",
            flexShrink: 0

        }}
        
        onClick={(e) => characterRating(false)}
        ></button>
        </li>
    </ul>
}

export default ScoreCharacter;