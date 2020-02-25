<template>
  <div class="box" style="text-align:left">
    <h1 class="title">Plots</h1>
    <div v-if="variables.length > 0">
      <div class="checkboxes">
        <span>
          <span v-for="variable in variables" :key="variable">
            <label :for="variable"><b>{{ variable }}</b></label>
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
      variableColors: ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#bfef45", "#469990", "#800000", "#000075"]
    };
  },
  methods: {
    updateMeasurements: function(measurements, variables) {
      //console.log("variables: " + variables);
      //console.log("measurements: " + Object.keys(measurements));
      this.variables = variables;
      let labels = Array();
      let obj_meas = Object();

      for (var variable of this.variables) {
        obj_meas[variable] = Array();
      }

      for (let key of Object.keys(measurements)) {
        let measurement = measurements[key];
        labels.push(measurement.local_time.local().format("HH:mm"));
        for (let variable of this.variables) {
          obj_meas[variable].push(measurement[variable]);
        }
      }

      labels = labels.reverse();

      let chartData_obj = Object();
      let chartOptions_obj = Object();

      for (let variable of this.variables) {
        let chartdata = Object();
        chartdata.labels = labels;
        chartdata.datasets = Array();
        let dataset = Object();
        dataset.data = obj_meas[variable].reverse();
        dataset.label = variable;
        dataset.fill = false;
        dataset.backgroundColor = this.variableColors[this.variables.indexOf(variable)]
        chartdata.datasets.push(dataset);

        chartData_obj[variable] = chartdata;

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
          }
        };
        chartOptions_obj[variable] = chartoptions;
      }

      this.chartDataObj = chartData_obj;
      this.chartOptionsObj = chartOptions_obj;
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