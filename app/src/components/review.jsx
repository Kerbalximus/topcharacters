import { useNavigate } from 'react-router';


const Review = (props) => {

    const navigate = useNavigate()

    return <div style={{
        // width: "60%",
        background: "#DADADA",
        paddingBottom: "5%",
        paddingTop: "1%",
        paddingLeft: "3%",
        paddingRight: "3%",
        borderRadius: "12px",
        marginBottom: "12px",
        position: "relative"
    }}>
        <ul style={{
            flexDirection: "column",
            // alignItems: "center",
        }}>
            <li style={{
                fontSize: "min(3vw, 32px)",
                marginBottom: "6px"
            }}>{props['author_name']}</li>
            <li style={{
                // fontFamily: "Secular One",
                fontSize: "min(1.5vw, 16px)",
                fontWeight: 400,
                color: "#565656"
            }}>{props['review']}</li>
            <li>
                <div style={{
                    position: "absolute",
                    left: "95%",
                }}>
                    <button style={{
                        background: 0,
                        outline: 0,
                        border: 0,
                        color: "#FF0000",
                        fontSize: "16px"
                    }}
                    onClick={async (e) => {
                        var token = document.cookie.split("; ")[0].split("=")[1]
                        var resposne = await fetch(`http://localhost:4000/review?id=${props.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": token
                              }
                        })
                        var data = await resposne.text()
                        if (data == "true") {
                            window.location.reload()
                        } else if (data == "No authorization") {
                            navigate("/login")
                        } else if (data == "Not author") {
                            alert("Только автор может удалить свой отзыв")
                        }
                    }}
                    
                    >X</button>
                    
                </div>
            </li>
        </ul>
    </div>
}

export default Review