/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import classes from "./Card.module.css";
import Utils, { dev } from "../../utilities/utils";
import useWindowDimensions from "../../utilities/useWindowDimensions";


const Card = (props) => {
  // const { json } = props
  const { json, full } = props;
  const cameras = json.cameras;
  const { height, width } = useWindowDimensions();
  const publicCnt = Math.trunc(width / 308) * 3;
  //4 x 2 is the l & r margin to add to 300px image width = 308
  const full1 = full ? 500 : publicCnt;
  console.log("full" + props.full);

  //console.log(Math.trunc(width / 300));
  return (
    <>
      <div className={classes.card_container}>
        {cameras &&
          cameras.slice(0, full1).map(
            
            // https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
            (img) => (
              <div>
                <>
                  <div className={classes.card} key={img.image_id}>
                    <a
                      aria-label="image"
                      // key={img.image_id}
                      href={
                        "https://netcams.io/" +
                        img.account_url_name +
                        "/" +
                        img.camera_url_name +
                        "/" +
                        img.trigger +
                        "/" +
                        img.dt +
                        "/" +
                        Utils.addDashesToTS(img.ts)
                      }
                    >
                      <img
                        className={classes.card_img}
                        src={Utils.imgUrlHome(img, "s", json)}
                      ></img>
                    </a>
                    <div className={classes.card_footer}>
                      <div className={classes.card_name}>
                        {img.account_display_name
                          ? img.account_display_name
                          : img.account_url_name + " - " + img.camera_name}
                        {/* TODO If acct display_name = text.text... we should uppercase each word and replace decimal with space. Need a helper funtion? */}
                      </div>
                      <div className={classes.card_location}>
                        {img.location}
                      </div>
                      {/* <div className={classes.card_name}>
                        <DaysSince
                          imgDt={img.dt}
                          imgTs={img.ts}
                          cameraTime={img.camera_time}
                        />
                      </div> */}
                    </div>
                  </div>
                </>
              </div>
            )
          )}
      </div>
    </>
  );
};
const loadedAt = new Date(2021, 6, 6, 6, 4, 0, 0);
export default Card;

// https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
function DaysSince({ imgDt, imgTs, cameraTime }) {
  //  console.log(imgDt);

  const calculateTimeLeft = () => {
    const difference =
      +new Date(cameraTime) -
      +Date.UTC(
        imgDt.substr(0, 4),
        parseInt(imgDt.substr(5, 2), 10) - 1,
        imgDt.substr(8, 2),
        imgTs.substr(0, 2),
        imgTs.substr(2, 2),
        imgTs.substr(4, 2)
      ) +
      (+new Date() - +loadedAt);

    let timeLeft = {};

    // if (difference > 0) {
    timeLeft = {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
    // }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <span>ago</span>
    </div>
  );
}
