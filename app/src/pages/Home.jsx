import { useEffect, useState } from "react";
import CharacterLabel from "../components/characterLabel";

const Home = () => {
    // var data = await fetch("http://localhost:4000/characters", {
    //     mode: 'no-cors'
    // })
    // console.log(data);
    console.log("Hi111111!")

    const [characters, setCharacters] = useState([]);

    useEffect(
        () => {
            console.log("Hii!!")
            fetch("http://localhost:4000/characters", {
                // mode: 'no-cors'
            }).then(async (resposne) => {
                const data = await resposne.json()
                console.log(data)
                setCharacters(data)
            })

        }, []
    )

    // return <h1>{characters[0]['characterName']}</h1>;
    return <div>
        <div style={{
            backgroundColor: "#DDF3F7",
            height: "70%",
            width: "94%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "8px",
            padding: "0",
            marginTop: "4%"
        }}>
            {characters.length && <>
                {/* <CharacterLabel characterData={characters[0]} />
                <CharacterLabel characterData={characters[1]} />
                <CharacterLabel characterData={characters[2]} />
                <CharacterLabel characterData={characters[3]} /> */}
                
                    {characters.map(function (object, i) {
                        return <CharacterLabel characterData={object} />;
                    })}
                {/* </tbody> */}
            </>}
        </div>
    </div>
};

export default Home;