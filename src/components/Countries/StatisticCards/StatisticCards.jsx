import React from "react";
import styles from "./StatisticCards.module.css";
import { Pie } from "react-chartjs-2";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CountUp from "react-countup";
const StatisticCards = ({
  corona: { country : {name, code, population, updated_at, today, latest_data : {confirmed, deaths, recovered, critical, calculated : {death_rate, recovery_rate, cases_per_million_population, deaths_per_mllion_population}}}},
}) => {
  const [tgGraph1, setToggleGraph1] = React.useState(false);
  const [tgGraph2, setToggleGraph2] = React.useState(false);
  const [tgGraph3, setToggleGraph3] = React.useState(false);
  const [tgGraph4, setToggleGraph4] = React.useState(false);
  const refFrontActive = React.useRef(null);
  const refBackActive = React.useRef(null);
  const refFrontClosed = React.useRef(null);
  const refBackClosed = React.useRef(null);
  const refFrontCasesRate = React.useRef(null);
  const refBackCasesRate = React.useRef(null);
  const refFrontDeathsRate = React.useRef(null);
  const refBackDeathsRate = React.useRef(null);
  const totalActive = confirmed - deaths - recovered;

  const option = {
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
        option={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        options={option}
        data={{
          labels: ["Bình thường", "Nguy kịch"],
          datasets: [
            {
              data: [
                totalActive- critical,
                critical,
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
        option={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        options={option}
        data={{
          labels: ["Hồi phục", "Tử vong", "Đang điều trị"],
          datasets: [
            {
              data: [recovered, deaths, confirmed -recovered - deaths],
              backgroundColor: ["rgba(0,255,0, .8)", "rgba(100,100,100,.8)"],
              hoverBackgroundColor: ["rgba(0,255,0)", "rgba(95,95,95)"],
            },
          ],
        }}
      />
    </React.Fragment>
  );

  const pieChartCasesRate = (
    <React.Fragment>
      <Pie
        option={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        options={option}
        data={{
          labels: ["Bị nhiễm", "Bình thường"],
          datasets: [
            {
              data: [confirmed, population-confirmed],
              backgroundColor: ["rgba(255, 89, 0,.8)", "rgba(125, 242, 0,.8)"],
              hoverBackgroundColor: ["rgba(255, 89, 0,1)", "rgba(125, 242, 0,1)"],
            },
          ],
        }}
      />
    </React.Fragment>
  );
  const pieChartDeathsRate = (
    <React.Fragment>
      <Pie
        option={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        options={option}
        data={{
          labels: ["Tử vong", "Bình thường"],
          datasets: [
            {
              data: [deaths, population-deaths],
              backgroundColor: ["rgba(100,100,100,.8)", "rgba(125, 242, 0,.8)"],
              hoverBackgroundColor: ["rgba(100,100,100)", "rgba(125, 242, 0,1)"],
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
  const toggleGraph3 = () => {
    setToggleGraph3(!tgGraph3);
    if (refFrontCasesRate.current.style.transform === "rotateY(-180deg)") {
      refFrontCasesRate.current.style.transform = "rotateY(0)";
      refBackCasesRate.current.style.transform = "rotateY(180deg)";
      refBackCasesRate.current.style.opacity = "0";
      refBackCasesRate.current.style.transition = "all .7s";
      return;
    }
    refFrontCasesRate.current.style.transform = "rotateY(-180deg)";
    refBackCasesRate.current.style.opacity = "1";
    refBackCasesRate.current.style.transition = "all .7s";
    refBackCasesRate.current.style.transform = "rotateY(0deg)";
  };
  const toggleGraph4 = () => {
    setToggleGraph4(!tgGraph4);
    if (refFrontDeathsRate.current.style.transform === "rotateY(-180deg)") {
      refFrontDeathsRate.current.style.transform = "rotateY(0)";
      refBackDeathsRate.current.style.transform = "rotateY(180deg)";
      refBackDeathsRate.current.style.opacity = "0";
      refBackDeathsRate.current.style.transition = "all .7s";
      return;
    }
    refFrontDeathsRate.current.style.transform = "rotateY(-180deg)";
    refBackDeathsRate.current.style.opacity = "1";
    refBackDeathsRate.current.style.transition = "all .7s";
    refBackDeathsRate.current.style.transform = "rotateY(0deg)";
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Bảng thống kê diễn biến dịch coronavirus</h2>

        <div className={styles.cards}>
          {/* Card 1 */}
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
                      end={totalActive}
                      duration={2.5}
                      separator=",">
                      {totalActive}
                    </CountUp>
                  </div>
                  <div className={styles.general_sub}>
                    Số bệnh nhân hiện tại
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.first_detail}>
                    <div className={clsx(styles.first_detail_digit,styles.mild_status)}>
                      <CountUp
                        start={0}
                        end={totalActive - critical}
                        duration={2.5}
                        separator=",">
                        {totalActive}
                      </CountUp>{" "}
                      (
                      {(
                        ((totalActive - critical) /
                          totalActive) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                    <div className={styles.first_detail_status}>
                      Tình trạng bình thường
                    </div>
                  </div>
                  <div className={styles.second_detail}>
                    <div className={clsx(styles.second_detail_digit,styles.critical_status)}>
                      <CountUp
                        start={0}
                        end={critical}
                        duration={2.5}
                        separator=",">
                        {totalActive}
                      </CountUp>{" "}
                      (
                      {(
                        (critical / totalActive) *
                        100
                      ).toFixed(0)}
                      %)
                    </div>
                    <div className={styles.second_detail_status}>Nguy kịch</div>
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
          {/* Card 2 */}
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
                      end={confirmed}
                      duration={2.5}
                      separator=",">
                      {confirmed}
                    </CountUp>
                  </div>
                  <div className={styles.general_sub}>
                    Tổng số ca nhiễm
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.first_detail}>
                    <div className={clsx(styles.first_detail_digit,styles.recovered_status)}>
                      <CountUp
                        start={0}
                        end={recovered}
                        duration={2.5}
                        separator=",">
                        {recovered}
                      </CountUp>{" "}
                      ({((recovered / (confirmed)) * 100 ).toFixed(0)}%)
                    </div>
                    <div className={styles.first_detail_status}>
                      Hồi phục
                    </div>
                  </div>
                  <div className={styles.second_detail}>
                    <div className={clsx(styles.second_detail_digit,styles.deaths_status)}>
                      <CountUp
                        start={0}
                        end={deaths}
                        duration={2.5}
                        separator=",">
                        {deaths}
                      </CountUp>{" "}
                      ({((deaths / (confirmed)) *  100 ).toFixed(0)}%)
                    </div>
                    <div className={styles.second_detail_status}>Tử vong</div>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.side,
                  styles.back,
                  styles.pieChartClosedCase
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
      
        <div className={clsx(styles.cards,styles.hide_sm)}>
          {/* Card 3 */}
          <div className={styles.card}>
            <div className={styles.card_header}>{name === "World" ? "tỉ lệ lây nhiễm toàn cầu" : "tỉ lệ lây nhiễm toàn quốc"}</div>
            <div className={styles.card_content}>
              <div
                className={clsx(styles.side, styles.front)}
                ref={refFrontCasesRate}>
                <div className={styles.general}>
                  <div className={styles.general_num}>
                    <CountUp
                      start={0}
                      end={population}
                      duration={2.5}
                      separator=",">
                      {population}
                    </CountUp>
                  </div>
                  <div className={styles.general_sub}>
                    Tổng số dân
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.first_detail}>
                    <div className={clsx(styles.first_detail_digit,styles.cases_status)}>
                      <CountUp
                        start={0}
                        end={confirmed}
                        duration={2.5}
                        separator=",">
                        {confirmed}}
                      </CountUp>{" "}
                      ({Math.ceil(((confirmed) / population) * 100)}%)
                    </div>
                    <div className={styles.first_detail_status}>
                     Số người nhiễm
                    </div>
                  </div>
                  <div className={styles.second_detail}>
                    <div className={clsx(styles.second_detail_digit,styles.normal_status)}>
                      <CountUp
                        start={0}
                        end={population-confirmed}
                        duration={2.5}
                        separator=",">
                        {population-confirmed}
                      </CountUp>{" "}
                      ({Math.floor(((population-confirmed) / population) *  100).toFixed(0)}%)
                    </div>
                    <div className={styles.second_detail_status}>Số người khỏe mạnh</div>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.side,
                  styles.back,
                  styles.pieChartCasesRate
                )}
                ref={refBackCasesRate}>
                {pieChartCasesRate}
              </div>
            </div>
            <div className={styles.card_action}>
              <a href="#!" className={styles.link} onClick={toggleGraph3}>
                {tgGraph3 ? "Xem số liệu" : "Xem biểu đồ"}
              </a>
            </div>
          </div>
          {/* Card 4 */}
          <div className={styles.card}>
            <div className={styles.card_header}>{name === "World" ? "tỉ lệ tử vong toàn cầu" : "tỉ lệ tử vong toàn quốc"}</div>
            <div className={styles.card_content}>
              <div
                className={clsx(styles.side, styles.front)}
                ref={refFrontDeathsRate}>
                <div className={styles.general}>
                  <div className={styles.general_num}>
                    <CountUp
                      start={0}
                      end={population}
                      duration={2.5}
                      separator=",">
                      {population}
                    </CountUp>
                  </div>
                  <div className={styles.general_sub}>
                    Tổng số dân
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.first_detail}>
                    <div className={clsx(styles.first_detail_digit,styles.deaths_status)}>
                      <CountUp
                        start={0}
                        end={deaths}
                        duration={2.5}
                        separator=",">
                        {deaths}
                      </CountUp>{" "}
                      ({Math.ceil((deaths / population) * 100 )}%)
                    </div>
                    <div className={styles.first_detail_status}>
                      Tử vong
                    </div>
                  </div>
                  <div className={styles.second_detail}>
                    <div className={clsx(styles.second_detail_digit,styles.normal_status)}>
                      <CountUp
                        start={0}
                        end={population-deaths}
                        duration={2.5}
                        separator=",">
                        {population-deaths}
                      </CountUp>{" "}
                      ({Math.floor(((population-deaths) / population) *  100 )}%)
                    </div>
                    <div className={styles.second_detail_status}>Số người khỏe mạnh</div>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  styles.side,
                  styles.back,
                  styles.pieChartClosedCase
                )}
                ref={refBackDeathsRate}>
                {pieChartDeathsRate}
              </div>
            </div>
            <div className={styles.card_action}>
              <a href="#!" className={styles.link} onClick={toggleGraph4}>
                {tgGraph4 ? "Xem số liệu" : "Xem biểu đồ"}
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
