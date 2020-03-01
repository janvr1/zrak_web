<template>
  <div class="box" style="text-align:left">
    <h1 class="title">Plots</h1>
    <div v-if="variables.length > 0">
      <div class="checkboxes">
        <span>
          <span v-for="variable in variables" :key="variable">
            <label :for="variable">{{ variable }}</label>
            <input type="checkbox" :id="variable" :value="variable" v-model="plotVars" />
          </span>
        </span>
      </div>
      <div v-for="variable of variables" :key="variable">
        <LineChart
          v-if="plotVars.includes(variable)"
          :chartData="chartDataObj[variable]"
          :options="chartOptionsObj[variable]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  name: "PlotBox",
  components: {
    LineChart
  },
  data() {
    return {
      chartDataObj: Object(),
      chartOptionsObj: Object(),
      plotVars: Array(),
      variables: Array(),
      variableColors: [
        "#e6194B",
        "#3cb44b",
        "#ffe119",
        "#4363d8",
        "#f58231",
        "#911eb4",
        "#bfef45",
        "#469990",
        "#800000",
        "#000075"
      ]
    };
  },
  methods: {
    updateMeasurements: function(measurements, variables) {
      this.variables = variables;

      let chartDataObj = Object();
      let chartOptionsObj = Object();

      for (let variable of variables) {
        let chartdata = Object();
        chartdata.datasets = Array();
        let dataset = Object();
        let data = Array();

        for (let key of Object.keys(measurements)) {
          let measurement = measurements[key];
          let tmp_obj = {
            t: measurement.local_time,
            y: measurement[variable]
          };
          data.push(tmp_obj);
        }

        dataset.data = data;
        dataset.label = variable;
        dataset.fill = false;
        dataset.backgroundColor = this.variableColors[
          this.variables.indexOf(variable)
        ];

        chartdata.datasets.push(dataset);
        chartDataObj[variable] = chartdata;

        let chartoptions = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            labels: {
              boxWidth: 10,
              fontSize: 16,
              fontStyle: "bold",
              usePointStyle: true
            }
          },
          elements: {
            line: {
              borderWidth: 2
            }
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  displayFormats: {
                    minute: "H:mm",
                    hour: "H:mm",
                    second: "H:mm:ss",
                    millisecond: "H:mm:ss.SSS"
                  }
                },
                gridLines: {
                  zeroLineColor: "rgba(0, 0, 0, 0.1)",
                  tickMarkLength: 0
                },
                ticks: {
                  padding: 10
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  zeroLineColor: "rgba(0, 0, 0, 0.1)",
                  tickMarkLength: 0
                },
                ticks: {
                  padding: 10
                }
              }
            ]
          },

          tooltips: {
            callbacks: {
              title: function(tooltipItems, data) {
                let time = data.datasets[0].data[tooltipItems[0].index].t || "";
                return time.local().format("H:mm:ss, MMM Do YYYY");
              }
            }
          }
        };
        chartOptionsObj[variable] = chartoptions;
      }

      this.chartDataObj = chartDataObj;
      this.chartOptionsObj = chartOptionsObj;
    }
  }
};
</script>

<style scoped>
.checkboxes {
  text-align: center;
}

.checkboxes input {
  padding: 0px 0px 0px 0px;
}

.checkboxes label {
  margin: 0px 8px 0px 25px;
  font-size: 22px;
}
</style>