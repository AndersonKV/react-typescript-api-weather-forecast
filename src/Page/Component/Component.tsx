import { ResultWeatherForeacast } from "../../styles";
import { Props } from "../Home";

import { Grid, GridRightForecast, GridLeftForecast } from "../../styles";
import { WeekProps } from "../InterfaceProps";

export const ShowWeatherForecast = ({ weekLeft, weekRight }: any) => {
  return (
    <Grid>
      <h2>Capitais</h2>
      <div className="grid-template">
        <GridLeftForecast>
          <section className="min-max">
            <span>Min</span>
            <span>Max</span>
          </section>
          {weekLeft?.map((week: WeekProps, key: string) => {
            return (
              <section key={key}>
                <span>
                  {week.list[0].main.temp_min.toString().substring(0, 2)}º
                </span>
                <span>
                  {week.list[0].main.temp_max.toString().substring(0, 2)}º
                </span>
                <span>{week.city.name}</span>
              </section>
            );
          })}
        </GridLeftForecast>
        <GridRightForecast>
          <section className="min-max">
            <span>Min</span>
            <span>Max</span>
          </section>
          {weekRight?.map((week: WeekProps, key: string) => {
            return (
              <section key={key}>
                <span>
                  {week.list[0].main.temp_min.toString().substring(0, 2)}º
                </span>
                <span>
                  {week.list[0].main.temp_max.toString().substring(0, 2)}º
                </span>
                <span>{week.city.name}</span>
              </section>
            );
          })}
        </GridRightForecast>
      </div>
    </Grid>
  );
};

export const ComponentNotFoundWeatherForeacast = ({
  handleCloseBox,
}: Props) => {
  return (
    <ResultWeatherForeacast>
      <section className="section-top">
        <div>
          NADA FOI ENCONTRADO
          <span className="red" onClick={handleCloseBox}>
            x
          </span>
        </div>
      </section>
    </ResultWeatherForeacast>
  );
};
