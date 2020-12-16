import React, { FormEvent } from "react";

import { WeatherForecast, WeekProps } from "./InterfaceProps";
import { verifyCountryAndWeather } from "../utils";
import {
  Container,
  ResultWeatherForeacast,
  StyledLoading,
  Title,
  FormInput,
} from "../styles";

import {
  ComponentNotFoundWeatherForeacast,
  ShowWeatherForecast,
} from "./Component/Component";

export interface Props {
  weekLeft?: React.ReactNode;
  weekRight?: any;
  handleCloseBox?: () => void;
}

const Home: React.FC<Props> = () => {
  const [searchCity, setSearchCity] = React.useState("");
  const [foundWeather, setFoundWeather] = React.useState<WeatherForecast>();
  const [notFoundWeather, setNotFoundWeather] = React.useState(false);
  const [weekLeft, setWeekLeft] = React.useState<WeekProps[]>();
  const [weekRight, setWeekRight] = React.useState<WeekProps[]>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function init() {
      try {
        const arrLeft: Array<WeekProps> = [];
        const arrRight: Array<WeekProps> = [];

        //req dos estados
        let rj =
          "http://api.openweathermap.org/data/2.5/forecast?q=rio de janeiro&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let sp =
          "http://api.openweathermap.org/data/2.5/forecast?q=são paulo&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let bh =
          "http://api.openweathermap.org/data/2.5/forecast?q=belo horizonte&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let br =
          "http://api.openweathermap.org/data/2.5/forecast?q=brasília&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let be =
          "http://api.openweathermap.org/data/2.5/forecast?q=belém&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let sa =
          "http://api.openweathermap.org/data/2.5/forecast?q=Salvador&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let cu =
          "http://api.openweathermap.org/data/2.5/forecast?q=Curitiba&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let fo =
          "http://api.openweathermap.org/data/2.5/forecast?q=Fortaleza&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let ma =
          "http://api.openweathermap.org/data/2.5/forecast?q=Manaus&APPID=c9e521ce9d19eaee59d2bac74f6410a9";
        let jo =
          "http://api.openweathermap.org/data/2.5/forecast?q=João Pessoa&APPID=c9e521ce9d19eaee59d2bac74f6410a9";

        Promise.all([
          fetch(rj).then((rj) => rj.json()),
          fetch(sp).then((sp) => sp.json()),
          fetch(bh).then((bh) => bh.json()),
          fetch(br).then((br) => br.json()),
          fetch(be).then((be) => be.json()),
          fetch(sa).then((sa) => sa.json()),
          fetch(cu).then((cu) => cu.json()),
          fetch(fo).then((fo) => fo.json()),
          fetch(ma).then((ma) => ma.json()),
          fetch(jo).then((jo) => jo.json()),
        ])
          .then((weather) => {
            for (let i = 0; i < weather.length; i++) {
              if (i <= 4) {
                arrLeft.push(weather[i]);
              } else {
                arrRight.push(weather[i]);
              }
            }
          })
          .then(() => {
            setWeekLeft(arrLeft);
            setWeekRight(arrRight);
            setLoading(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let url1 = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=c9e521ce9d19eaee59d2bac74f6410a9`;
    let url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&APPID=c9e521ce9d19eaee59d2bac74f6410a9`;

    Promise.all([
      fetch(url1).then((city) => city.json()),
      fetch(url2).then((week) => week.json()),
    ])
      .then((weatherForecast) => {
        if (weatherForecast[0].cod && weatherForecast[1].cod === "404") {
          setNotFoundWeather(true);
          setFoundWeather(undefined);
        }

        if (weatherForecast[0].cod && weatherForecast[1].cod === "200") {
          setFoundWeather(weatherForecast);
          setNotFoundWeather(false);
        }

        return null;
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function handleCloseBox() {
    setNotFoundWeather(false);
  }

  const ComponentResultWeatherForeacast = () => {
    return (
      <ResultWeatherForeacast>
        <section className="section-top">
          <div>
            <span>
              {foundWeather?.[0].name}, {foundWeather?.[0].sys.country}
            </span>
          </div>
          <div>
            <h1>
              {verifyCountryAndWeather(
                String(foundWeather?.[0].weather[0].description)
              )}
            </h1>
          </div>
          <div>
            <span>
              <i className="fas fa-arrow-down"></i>
              {foundWeather?.[0].main.temp_min.toString().substring(0, 2)}
            </span>
            <span>
              <i className="fas fa-arrow-up"></i>
              {foundWeather?.[0].main.temp_max.toString().substring(0, 2)}
            </span>
            <span className="last-span1">
              <span className="grey">Sensação</span>
              {foundWeather?.[0].main.temp.toString().substring(0, 2)}ºC
            </span>
          </div>
          <div>
            <span>
              <span className="grey">Vento</span>
              {foundWeather?.[0].wind.speed.toString().substring(0, 1)}km/h
            </span>
            <span className="last-span2">
              <span className="grey">Humildade</span>
              {foundWeather?.[0].main.humidity}%
            </span>
          </div>
        </section>

        <hr />
        <section className="weekday">
          <div>
            <div>
              <span>Terça</span>
            </div>
            <div>
              <span>
                {foundWeather?.[1].list[0].main.temp_min
                  .toString()
                  .substring(0, 2)}
                º
              </span>
              <span>
                {foundWeather?.[1].list[0].main.temp_max
                  .toString()
                  .substring(0, 2)}
                º
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>Quarta</span>
            </div>
            <div>
              <span>
                {foundWeather?.[1].list[1].main.temp_min
                  .toString()
                  .substring(0, 2)}
                º
              </span>
              <span>
                {foundWeather?.[1].list[1].main.temp_max
                  .toString()
                  .substring(0, 2)}
                º
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>Quinta</span>
            </div>
            <div>
              <span>
                {foundWeather?.[1].list[2].main.temp_min
                  .toString()
                  .substring(0, 2)}
                º
              </span>
              <span>
                {foundWeather?.[1].list[2].main.temp_max
                  .toString()
                  .substring(0, 2)}
                º
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>Sexta</span>
            </div>
            <div>
              <span>
                {foundWeather?.[1].list[3].main.temp_min
                  .toString()
                  .substring(0, 2)}
                º
              </span>
              <span>
                {foundWeather?.[1].list[3].main.temp_max
                  .toString()
                  .substring(0, 2)}
                º
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>Sabado</span>
            </div>
            <div>
              <span>
                {foundWeather?.[1].list[4].main.temp_min
                  .toString()
                  .substring(0, 2)}
                º
              </span>
              <span>
                {foundWeather?.[1].list[4].main.temp_max
                  .toString()
                  .substring(0, 2)}
                º
              </span>
            </div>
          </div>
        </section>
      </ResultWeatherForeacast>
    );
  };

  return (
    <Container>
      {loading !== false ? (
        <>
          <Title>Previsão do tempo</Title>

          {foundWeather ? <ComponentResultWeatherForeacast /> : null}

          {notFoundWeather ? (
            <ComponentNotFoundWeatherForeacast
              handleCloseBox={handleCloseBox}
            />
          ) : null}

          <FormInput onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="insira aqui o nome da cidade"
                onChange={(event) => setSearchCity(event.target.value)}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </FormInput>
          <hr />
          <ShowWeatherForecast weekLeft={weekLeft} weekRight={weekRight} />
        </>
      ) : (
        <StyledLoading />
      )}
    </Container>
  );
};

export default Home;
