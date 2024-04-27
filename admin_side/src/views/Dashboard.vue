<template>
    <main>
        <div class="left-container">
    <div class="top-left">
        <div class="total-student">
            <h2 class="info-text">
                <span class="material-icons">feed</span>
                STUDENT ENROLEES
            </h2>    
            <table class="enrollment-table">
                <thead>
                    <tr>
                        <th class="fs-5">Grade Level</th>
                        <th class="fs-5">Total Enrolees</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="grade">Junior High School</th>
                        <td class="grade">0000</td>
                    </tr>
                    <tr>
                        <td>Grade 7</td>
                        <td>0000</td>
                    </tr>
                    <tr>
                        <td>Grade 8</td>
                        <td>0000</td>
                    </tr>
                    <tr>
                        <td>Grade 9</td>
                        <td>0000</td>
                    </tr>
                    <tr>
                        <td>Grade 10</td>
                        <td>0000</td>
                    </tr>
                    <tr>
                        <th class="grade">Senior High School</th>
                        <td class="grade">0000</td>
                    </tr>
                    <tr>
                        <td>Grade 11</td>
                        <td>0000</td>
                    </tr>
                    <tr>
                        <td>Grade 12</td>
                        <td>0000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
        
        <div class="right-container" fluid>
            <h1 class="info-text">
                <span class="material-icons">group</span>
                Total Enrollees
            </h1>
            <div>
                <canvas ref="chartCanvas"></canvas>
            </div>
        </div>
    </main>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      sidebarCollapsed: false 
    };
  },
  mounted() {
    this.renderChart();
  },
  computed: {
    chartContainerWidth() {
      return this.sidebarCollapsed ? 'calc(100% - 80px)' : '100%'; 
    },
    chartContainerHeight() {
      return this.sidebarCollapsed ? '400px' : '400px'; 
    }
  },
  watch: {
    sidebarCollapsed(newValue) {
      if (this.chart) {
        this.chart.resize(); 
      }
    }
  },
  methods: {
    renderChart() {
      this.chart = new Chart(this.$refs.chartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
          labels: ['Junior High School', 'Senior High School'],
          datasets: [{
            label: 'Student Enrolled',
            data: [100, 500], //Junior and Senior High total enrollees
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
main {
    display: flex;
}
.left-container{
    flex: 0.5;
    margin-right: 1rem;
    .top-left{
        padding: 1rem;
        background-color: #f0f0f0;
        margin-bottom: 2rem;
        color: black;
        border-radius:5px;

        .total-student{
            display: flex;
            flex-direction: column;
            
            

            .info-text{
                text-shadow: 0 0 1px;
                font-size: 25px;
                margin-bottom: 1rem;
                font-weight: bold;
                
               

                .material-icons{
                    position: relative;
                    font-size: 38px;
                    top:8px;
                }
            }
            h2{
                align-self: left;
                margin-bottom: 1rem;
                font-weight: 900;
                
            }

            h3{
                font-weight: 600;
            }

            .student-count{
                display: flex;

                h4{
                    font-weight: 600;
                }
            
            .jhs{
                flex: 0.8;
                padding: 0.5rem;

                .jhs-total{
                    display: flex;
                    margin: 1rem;

                    h5{
                        margin-right: 1.5rem;
                        width: 3.5rem;
                    }

                    h3{
                        text-shadow: 0 0 1px;
                    }
                }


            }

            .shs{
                padding: 0.5rem;

                .shs-total{
                    display: flex;
                    margin: 1rem;

                    h5{
                        margin-right: 1.5rem;
                        width: 3.5rem;
                    }
                    h3{
                        text-shadow: 0 0 1px;
                    }
                }
            }

            }
        }
    }
    .bottom-left{
        padding: 1.5rem;
        background-color: #f0f0f0;
        color: var(--dark);
            
        h3 {
            text-shadow: 0 0 1px;
            font-size: 20px;
        }
        .material-icons{
            position:relative;
            font-size: 35px;
            top: 10px;
        }
    }
}

.right-container {
    flex: 0.5;
    padding: 1rem;
    background-color: #f0f0f0;
    height: 400px; 
    width: 100%; 
    @media (min-width: 768px) {
        width: calc(50% - 1rem); 
        transition: width 0.3s ease; 
    }
}
.enrollment-table {
    width: 100%;
    border-collapse: collapse;
}

.enrollment-table th, .enrollment-table td {
    border: 2px solid #a09e9e90;
    text-align: left;
    padding: 8px;
    font-size: 14px;
}

.enrollment-table th {
    background-color: #f2f2f2;
}
.grade{
    font-weight: bold;
    font-size: 17px;
}
.info-text{
    text-shadow: 0 0 1px;
    font-size: 25px;
    margin-bottom: 1rem;
    color: var(--dark);
    font-weight: bold;
}
.material-icons{
    position: relative;
    font-size: 38px;
    top:8px;
}

</style>