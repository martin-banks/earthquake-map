# Simple Charts

Chart.js is the library used for simple charts; there is a great Vue.js component for it.

## Docs
Chart.js

http://www.chartjs.org/docs/latest/


vue-chartjs

http://vue-chartjs.org/#/home


## Sample Data

#### Chart data
```javascript

const data = {
  labels: ['January', 'February'],
  datasets: [
    {
      label: 'GitHub Commits',
      backgroundColor: ['#f00', '#0f0', '#00f'],
      data: [40, 20]
    }
  ]
}
```

#### Chart options
```javascript

const options = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: true
  }
}

```

## Sample usage
```
<template>
  <simple-bar-chart
    :chartData="chartData"
    :chartOptions="chartOptions
  />
</template>

<script>
import SimpleBarChart from '@/components/charts/SimpleBarChart'
import colors from '@/components/charts/colors/bright

export default {
  name: 'demo-chart',
  components: { SimpleBarChart },
  data () {
    return {
      chartData: {
        labels: ['First label', 'Second label'],
        datasets: [
          {
            label: 'Dataset label',
            backgroundColor: colors,
            data: [40, 20],
          }
        ]
      },
    }
  }
}
</script>
```

