<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

// ? Available chart types below
// ? Details on Chart.js website here: https://www.chartjs.org/docs/latest/charts/
// * Bar
// * HorizontalBar
// * Doughnut
// * Line
// * Pie
// * PolarArea
// * Radar
// * Bubble
// * Scatter

const defaultOptions = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 14,
      fontSize: 14,
      padding: 4,
    },
  },
  elements: {
    line: {
      tension: 0.2,
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        steps: 1,
        stepValue: 10,
        // max: 150,
      },
    }],
  },
}

export default {
  name: 'simple-line-chart',
  extends: Line,
  mixins: [ reactiveProp ],
  props: [
    'type',
    'chartData',
    'chartOptions',
    'height',
  ],
  // components: {},
  // data () {
  //   return {
  //   }
  // },
  // methods: {},
  // computed: {},
  watch: {
    chartData () {
      this.renderChart(this.chartData, this.chartOptions || defaultOptions)
    },
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions || defaultOptions)

  },
}
</script>


<style scoped lang="sass">
@import index

</style>
