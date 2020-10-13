import React from "react";
import { IonContent, IonPage, IonSlides, IonSlide } from "@ionic/react";
import { SKIRHeader } from "../components/SKIRHeader";

const Facts = ({ history }) => {
  const info = [
    {
      title: "Rheasilvia (Vesta)",
      info: [
        "Highest Mountain in the solar system",
        "World: Vesta (one of the largest objects in the asteroid belt)",
        "Base to peak height: 22 km (14 mi)",
        "% of radius: 8.4",
        "Origin: Impact",
      ],
      moreInfo: [
        "Almost 200 km (120 mi) wide.",
        "https://en.wikipedia.org/wiki/Rheasilvia",
      ],
    },
    {
      title: "Olympus Mons (Mars)",
      info: [
        "Second Highest Mountain in the solar system",
        "Planet: Mars",
        "Base to peak height: 21.9 km (14 mi)",
        "% of radius: 0.65",
        "Origin: Volcanic",
        "https://en.wikipedia.org/wiki/Olympus_Mons",
      ],
      moreInfo: [
        "Rises 26 km above northern plains, 1000 km away.",
        "Summit calderas are 60 x 80 km wide, up to 3.2 km deep; scarp around margin is up to 8 km high.",
        "A shield volcano, the mean flank slope is a modest 5.2 degrees.",
      ],
    },
    {
      title: "Mount Everest (Earth)",
      info: [
        "Highest Mountain on planet Earth",
        "Planet: Earth",
        "Base to peak height: 3.6 to 4.6 km (2.2 to 2.9 mi)",
        "% of radius: 0.072",
        "Origin: Tectonic",
        "https://en.wikipedia.org/wiki/Mount_Everest",
      ],
      moreInfo: [
        "4.6 km on north face, 3.6 km on south face",
        "Highest elevation (8.8 km) above sea level (but not among the tallest from base to peak)",
      ],
    },
  ];
  const slideOpts = {
    scrollBar: true,
    // autoHeight: true,
    initialSlide: 0,
    speed: 400,
  };

  return (
    <IonPage>
      <SKIRHeader history={history} title={"Interesting Facts"} />
      <IonContent>
        <IonSlides
          pager={false}
          options={slideOpts}
          // style={{ height: "100%", width: "100%" }}
        >
          {info.map((i, index) => {
            return (
              <IonSlide key={index}>
                <div
                  key={index}
                  className="hasDisplayFlexRow "
                  style={{
                    padding: 16,
                    textAlign: "center",
                  }}
                  // style={{ width: "100%", height: "100%" }}
                >
                  <h1
                    className="hasFontSizeXLarge borderBottom"
                    style={{ fontWeight: "700", borderBottomWidth: "4px" }}
                  >
                    {i.title}
                  </h1>
                  <h4 style={{ borderBottomWidth: "4px" }}>Properties</h4>
                  <ul className="infoUL">
                    {i.info.map((s, index) => (
                      <li key={index}>{s}</li>
                    ))}
                  </ul>
                  <h4 style={{ borderBottomWidth: "4px" }}>More Info</h4>
                  <ul className="infoUL">
                    {i.moreInfo.map((a, index) => (
                      <li
                        key={index}
                        style={{ fontWeight: a === "Evacuate" ? 500 : 300 }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </IonSlide>
            );
          })}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Facts;
