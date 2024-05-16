<template>
    <main>
    <div class="left-container">
        <div class="top-left">
            <div class="total-student">
            <h2 class="info-text">
                <span class="material-icons">feed</span>
                SENIOR HIGH SCHOOL
            </h2>    
                <v-data-table-virtual
                :headers="headers"
                :items="virtualBoats"
                height="400"
                item-value="name"
                ></v-data-table-virtual>
            </div>
        </div>
    </div>

    <div class="lowerLeft-container">
        <div class="top-left">
            <div class="total-student">
            <h2 class="info-text">
                <span class="material-icons">feed</span>
                JUNIOR HIGH SCHOOL
            </h2>    
                <v-data-table-virtual
                :headers="headers"
                :items="virtualBoats"
                height="400"
                item-value="name"
                ></v-data-table-virtual>
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
      sidebarCollapsed: false,
      headers: [
                { title: 'Grade Level', text: 'Grade Level', value: 'grade_level' },
                { title: 'Total', text: 'Total', value: 'total' }
            ],
            virtualBoats: [
                { grade_level: 'Grade 7', total: '0000' },
                { grade_level: 'Grade 8', total: '0000' },
                { grade_level: 'Grade 9', total: '0000' },
                { grade_level: 'Grade 10', total: '0000' },
                { grade_level: 'Grade 11', total: '0000' },
                { grade_level: 'Grade 12', total: '0000' }
            ]
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

//   total student table sample


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
.table-heading thead {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #ccc;
}

main {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns */
    gap: 1rem; /* Space between columns */
}

.left-container {
    grid-column: 1 / 2; /* Place it in the first column */
    grid-row: 1; /* Place it in the first row */
    background-color: #f0f0f0;
    border-radius: 0.5rem;
    padding: 3rem; /* Adjust the padding as needed */
    margin-bottom: 1rem; /* Add margin for spacing */
}

.lowerLeft-container {
    grid-column: 1 / 2; /* Place it in the first column */
    grid-row: 2; /* Place it in the second row */
    background-color: #f0f0f0;
    border-radius: 0.5rem;
}

.right-container {
    grid-column: 2 / 3; /* Place it in the second column */
    grid-row: 1 / 3; /* Span two rows */
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #f0f0f0;
    height: 400px;
    border-radius: 0.5rem;
    @media (min-width: 768px) {
        width: 100%;
        transition: width 0.3s ease;
    }
}

.enrollment-table {
    width: 100%;
    border-collapse: collapse;
    opacity: 100%;
}

.enrollment-table th, .enrollment-table td {
    border: 2px solid #a09e9e90;
    text-align: left;
    padding: 8px;
    font-size: 14px;
}

.enrollment-table th {
    background-color: whitesmoke;
}

.grade {
    font-weight: bold;
    font-size: 17px;
}

.info-text {
    text-shadow: 0 0 1px;
    font-size: 25px;
    margin-bottom: 1rem;
    color: var(--dark);
    font-weight: bold;
}

.material-icons {
    position: relative;
    font-size: 38px;
    top: 8px;
}
main {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns */
    gap: 1rem; /* Space between columns */
}

.left-container {
    grid-column: 1 / 2; 
    grid-row: 1;
    background-color: #f0f0f0;
    border-radius: 0.5rem;
    padding: 1rem; 
    margin-bottom: 1rem; 
}

.left-container .top-left {
    background-color: white; /* Background color for the inner container */
    border-radius: 0.5rem; /* Rounded corners */
    padding: 1rem; /* Padding for inner spacing */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.lowerLeft-container {
    grid-column: 1 / 2; 
    grid-row: 2; 
    background-color: #f0f0f0;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem; 
}

.lowerLeft-container .top-left {
    background-color: white; 
    border-radius: 0.5rem;
    padding: 1rem; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.right-container {
    grid-column: 2 / 3; /* Place it in the second column */
    grid-row: 1 / 3; /* Span two rows */
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 0.5rem;
    @media (min-width: 768px) {
        width: 100%;
        transition: width 0.3s ease;
    }
}

.material-icons {
    position: relative;
    font-size: 38px;
    top: 8px;
}


</style>