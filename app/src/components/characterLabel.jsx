import './characterLabel.css'
import { useNavigate } from "react-router-dom";
import ScoreCharacter from './score';

const CharacterLabel = (props) => {

    const navigate = useNavigate()

    console.log(props.characterData);

    function goCharacter() {
        navigate(`/character/${props.characterData['id']}`)
    }



    return <div style={{ "padding": 0, height: "20%" }}>
        <ul style={{ "padding": 12, flexDirection: "row", justifyContent: "space-between" }}>
            <li style={{ display: "inline" }} onClick={goCharacter}>
                <ul>
                    <li> <div>
                        <img src={props.characterData['avatarUrl']}
                            style={{
                                width: "128px",
                                height: "128px",
                                objectFit: "cover",
                                borderRadius: "26px",
                                border: "1px solid #7D675F",
                                boxShadow: "0px 0px 10px 8px rgba(202, 250, 225, 0.71)"
                            }}

                        />
                    </div></li>
                    <li style={{ display: "inline", margin: 0, padding: 0 }}>
                        <ul style={{ flexDirection: "column", display: "flex", justifyContent: "center", height: "100%", margin: 0, padding: 0, marginLeft: "10px" }}>
                            <li ><h1 style={{
                                margin: 0,
                                padding: 0,
                                fontSize: "3.7vw"
                            }}>{props.characterData['characterName'].toUpperCase()}</h1></li>
                            <li><h7>{props.characterData['fandomName']}</h7></li>
                        </ul>
                    </li>
                </ul>

            </li>

            <li style={{
                margin: 0,
                padding: 0,
                marginRight: "5%"
                // height: "100%"
                // marginTop: "25%"
            }}>
                <div style={{
                    marginTop: "50%",
                }}><ScoreCharacter rating={props.characterData['rating'] } character_id={props.characterData['id']}></ScoreCharacter></div>
            </li>
        </ul></div>
}

export default CharacterLabel;