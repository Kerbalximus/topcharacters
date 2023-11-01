import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import ScoreCharacter from '../components/score';
import './character.css'
import Review from '../components/review';


const Character = () => {

  const { number } = useParams()
  const [characterData, setCharacterData] = useState({});
  const [reviewsCharacter, setReviewsCharacter] = useState([])
  const [review, setReview] = useState("")
  const navigate = useNavigate()

  const reviewEvent = (event) => {
    setReview(event.target.value);
  };

  useEffect(
    () => {
      console.log("Hii!!")
      fetch(`http://localhost:4000/character?id=${number}`, {
        // mode: 'no-cors'
      }).then(async (resposne) => {
        const data = await resposne.json()
        console.log(data)
        setCharacterData(data)

      })

      fetch(`http://localhost:4000/review?id=${number}`, {

      }).then(async (response) => {
        const data = await response.json()
        if (data['response'].length == 0) {
          setReviewsCharacter([{
            "author_name": "TopCharacters",
            "review": "Вот так будет выглядеть ваш отзыв",
            "id": -1
          }])
        } else {
          setReviewsCharacter(data['response'])
        }

        // console.log(reviewsCharacter)

      })




    }, []
  )

  // return <h1>Character, Character Id is {number}</h1>;
  return <div style={{
    marginTop: "1.5%"
  }}>

    <ul style={{
      flexDirection: "column",
      alignItems: "center"
    }}>
      <li style={{
        height: "40vw",
        maxHeight: "512px",
        width: "100%"
      }}>
        {Object.keys(characterData).length && <>

          <div
            style={{
              background: `linear-gradient(180deg, ${characterData['color']} 0%, rgba(0, 0, 0, 0.00) 100%), url(${characterData['bannerUrl']}) lightgray 50% / cover no-repeat`,
              width: "100%",
              height: "38vw",
              maxHeight: "512px",
              minHeight: "256px",
              objectFit: "cover",
              flexShrink: 0,
              position: "relative",
            }}>
            <div style={{
              position: "absolute",
              top: "15%",
              left: "10%"
            }}>
              <ul style={{ flexDirection: "row" }}>
                <li>
                  <ul style={{ flexDirection: "column", alignItems: "center" }}>
                    <li><img src={characterData['avatarUrl']}
                      style={{
                        width: "20vw",
                        height: "20vw",
                        maxHeight: "256px",
                        maxWidth: "256px",
                        objectFit: "cover",
                        borderRadius: "26px",
                        // aspectRatio: "1 / 1"
                      }}

                    /></li>
                    <li>
                      <div style={{
                        paddingRight: "10px"
                      }}>
                        <ScoreCharacter rating={characterData['rating']} character_id={characterData['id']} />
                      </div>

                    </li>
                  </ul>
                </li>
                <li style={{
                  width: "65%",
                }}>
                  <ul style={{
                    marginLeft: "4%",
                    flexDirection: "column",
                    display: "flex",
                  }}>
                    <li>
                      <div>
                        <h1 style={{ fontSize: "5vw" }}>
                          {characterData['characterName'].toUpperCase()}
                        </h1>
                      </div>
                      <li>
                        <div style={{
                          width: "70%",
                          fontSize: "1.4vw",
                          flexShrink: 0,
                          color: "white",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                          marginTop: "2.5%"
                        }}>
                          {characterData['aboutCharacter']}
                        </div>
                      </li>
                    </li>
                    <li>
                      <div style={{
                        marginTop: "3%",
                        fontSize: "1vw"
                      }}>{characterData['aboutCharacterOrigin']}</div></li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>

        </>}
      </li>
      <li>
        <div style={{
          // marginTop: "10%",
          color: characterData['color'],
          fontSize: "2vw"
        }}>

          <form>
            <textarea onChange={reviewEvent}
              rows="2"
              cols="50"
              style={{
                textAlign: "center",
                "textarea::placeholder": {
                  "color": characterData['color']
                }
              }}
              placeholder='Напиши свой отзыв'>

            </textarea>
          </form>
          <br></br>
          <button id="send" style={{
          }} onClick={async (e) => {
            var token = document.cookie.split("; ")[0].split("=")[1]
            var response = await fetch("http://localhost:4000/review", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              },
              "body": JSON.stringify(
                {
                  "reviewText": review,
                  "characterId": characterData['id']
                }
              ),

            })

            var data = await response.text()
            console.log("eeee")
            if (data === "true") {
              window.location.reload()
            } else if (data === "No authorization") {
              navigate(`/login`)
            }
          }}>Отправить</button>

        </div>


        <hr style={{
        }}></hr>

      </li>
      <li style={{
        width: "60%"
      }}>

        {console.log(reviewsCharacter)}
        {/* <Review author_name="Kerbal" review="“Как по мне, это хороший персонаж который способен показать что семья - самое главное. Ведь иногда стоит подумать: Кто вас воспитывал? Помните ли вы своих родителей? Уважаете ли их? У меня на этом все”"></Review> */}
        {
          reviewsCharacter.length && <>

            {reviewsCharacter.map(function (object, i) {
              return <Review author_name={object['author_name']} review={"“" + object['review'] + "”"} id={object['id']} />;
            })}
          </>}
      </li>
    </ul>


  </div >
};

export default Character;