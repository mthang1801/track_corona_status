import React from "react";
import styles from "./StatisticCards.module.css";
import { Pie } from "react-chartjs-2";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CountUp from "react-countup";
const StatisticCards = ({
  corona: { histories, new_update },
  page: { home },
}) => {
  const [tgGraph1, setToggleGraph1] = React.useState(false);
  const [tgGraph2, setToggleGraph2] = React.useState(false);
  const refFrontActive = React.useRef(null);
  const refBackActive = React.useRef(null);
  const refFrontClosed = React.useRef(null);
  const refBackClosed = React.useRef(null);
  const historiesGlobal = [...histories];
  const closedCase = new_update.confirmed - new_update.totalActive;
  const recovered = new_update.recovered;
  const deaths = closedCase - recovered;

  historiesGlobal.reverse();

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
  };

  const pieChartActiveCase = (
    <React.Fragment>
      <Pie       
        options={option}
        data={{
          labels: ["Bình thường", "Nguy kịch"],
          datasets: [
            {
              data: [
                new_update.totalActive - new_update.totalCritical,
                new_update.totalCritical,
              ],
              backgroundColor: ["rgba(0,150,255, .9)", "rgba(255,0,0,.8)"],
              hoverBackgroundColor: ["rgba(0,200,255)", "rgba(255,0,0)"],
            },
          ],
        }}
      />
    </React.Fragment>
  );

  const pieChartClosedCase = (
    <React.Fragment>
      <Pie      
        options={option}
        data={{
          labels: ["Hồi phục", "Tử vong"],
          datasets: [
            {
              data: [new_update.recovered, new_update.deaths],
              backgroundColor: ["rgba(0,255,0, .8)", "rgba(100,100,100,.8)"],
              hoverBackgroundColor: ["rgba(0,255,0)", "rgba(95,95,95)"],
            },
          ],
        }}
      />
    </React.Fragment>
  );

  const toggleGraph1 = () => {
    setToggleGraph1(!tgGraph1);
    if (refFrontActive.current.style.transform === "rotateY(-180deg)") {
      refFrontActive.current.style.transform = "rotateY(0)";
      refBackActive.current.style.transform = "rotateY(180deg)";
      refBackActive.current.style.opacity = "0";
      refBackActive.current.style.transition = "all .7s";
      return;
    }
    refFrontActive.current.style.transform = "rotateY(-180deg)";
    refBackActive.current.style.opacity = "1";
    refBackActive.current.style.transition = "all .7s";
    refBackActive.current.style.transform = "rotateY(0deg)";
  };

  const toggleGraph2 = () => {
    setToggleGraph2(!tgGraph2);
    if (refFrontClosed.current.style.transform === "rotateY(-180deg)") {
      refFrontClosed.current.style.transform = "rotateY(0)";
      refBackClosed.current.style.transform = "rotateY(180deg)";
      refBackClosed.current.style.opacity = "0";
      refBackClosed.current.style.transition = "all .7s";
      return;
    }
    refFrontClosed.current.style.transform = "rotateY(-180deg)";
    refBackClosed.current.style.opacity = "1";
    refBackClosed.current.style.transition = "all .7s";
    refBackClosed.current.style.transform = "rotateY(0deg)";
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Biểu đồ diễn biến dịch coronavirus</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card_header}>Số ca dương tính</div>
            <div className={styles.card_content}>
              <div
                className={clsx(styles.side, styles.front)}
                ref={refFrontActive}>
                <div className={styles.general}>
                  <div className={styles.general_num}>
                    <CountUp
                      start={0}
                      end={new_update.totalActive}
                      duration={2.5}
                      separator=",">
                      {new_update.totalActive}
                    </CountUp>
                  </div>
                  <div className={styles.general_sub}>
                    Số bệnh nhân hiện tại
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.mild_condition}>
                    <div className={styles.detail_mild_num}>
                      <CountUp
                        start={0}
                        end={new_update.totalActive - new_update.totalCritical}
                        duration={2.5}
                        separator=",">
                        {new_update.totalActive}
                      </CountUp>{" "}
                      (
                      {(
                        ((new_update.totalActive - new_update.totalCritical) /
                          new_update.totalActive) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                    <div className={styles.detail_mild_sub}>
                      Tình trạng bình thường
                    </div>
                  </div>
                  <div className={styles.critical_condition}>
                    <div className={styles.detail_crit_num}>
                      <CountUp
                        start={0}
                        end={new_update.totalCritical}
                        duration={2.5}
                        separator=",">
                        {new_update.totalActive}
                      </CountUp>{" "}
                      (
                      {(
                        (new_update.totalCritical / new_update.totalActive) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                    <div className={styles.detail_crit_sub}>Nguy kịch</div>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.side,
                  styles.back,
                  styles.pieChartActiveCase
                )}
                ref={refBackActive}>
                {pieChartActiveCase}
              </div>
            </div>
            <div className={styles.card_action}>
              <a href="#!" className={styles.link} onClick={toggleGraph1}>
                {tgGraph1 ? "Xem số liệu" : "Xem biểu đồ"}
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card_header}>hồi phục/ tử vong</div>
            <div className={styles.card_content}>
              <div
                className={clsx(styles.side, styles.front)}
                ref={refFrontClosed}>
                <div className={styles.general}>
                  <div className={styles.general_num}>
                    <CountUp
                      start={0}
                      end={closedCase}
                      duration={2.5}
                      separator=",">
                      {closedCase}
                    </CountUp>
                  </div>
                  <div className={styles.general_sub}>
                    Tổng số ca hồi phục/ tử vong
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.mild_condition}>
                    <div className={styles.detail_recovered_num}>
                      <CountUp
                        start={0}
                        end={recovered}
                        duration={2.5}
                        separator=",">
                        {recovered}
                      </CountUp>{" "}
                      ({((recovered / closedCase) * 100).toFixed(0)}%)
                    </div>
                    <div className={styles.detail_recovered_sub}>
                      Số ca hồi phục
                    </div>
                  </div>
                  <div className={styles.critical_condition}>
                    <div className={styles.detail_deaths_num}>
                      <CountUp
                        start={0}
                        end={closedCase - recovered}
                        duration={2.5}
                        separator=",">
                        {closedCase - recovered}
                      </CountUp>{" "}
                      (
                      {(((closedCase - recovered) / closedCase) * 100).toFixed(
                        0
                      )}
                      %)
                    </div>
                    <div className={styles.detail_deaths_sub}>
                      Số ca tử vong
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={clsx(
                  styles.side,
                  styles.back,
                  styles.pieChartActiveCase
                )}
                ref={refBackClosed}>
                {pieChartClosedCase}
              </div>
            </div>
            <div className={styles.card_action}>
              <a href="#!" className={styles.link} onClick={toggleGraph2}>
                {tgGraph2 ? "Xem số liệu" : "Xem biểu đồ"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatisticCards.propTypes = {
  corona: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  corona: state.corona,
  page: state.page,
});

export default connect(mapStateToProps)(StatisticCards);
