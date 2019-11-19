<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 10,
      fontSize: 14,
      padding: 4,
    },
  },
  elements: {
    line: {
      tension: 0,
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        steps: 10,
        // stepValue: 100,
        max: 40000,
      },
    }],
  },
}

export default {
  name: 'simple-bar-chart',
  extends: Bar,
  mixins: [ reactiveProp ],
  props: [
    'type',
    'chartData',
    'chartOptions',
  ],
  // components: {},
  // data () {
  //   return {}
  // },
  // methods: {},
  // computed: {},
  mounted () {
    const options = this.chartOptions || defaultOptions
    this.renderChart(data, options)
  },
}
</script>


<style scoped lang="sass">
@import index

</style>
