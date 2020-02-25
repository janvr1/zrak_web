<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "LineChart",

  extends: Line,

  props: {
    options: Object
  },

  mixins: [mixins.reactiveProp],

  mounted() {
    this.renderChart(this.chartData, this.options);
    //console.log("LineChart mounted");
  }
};
</script>