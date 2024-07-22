<template>
  <main>
    <div class="left-container">
      <div class="top-left">
        <div class="total-student">
          <h2 class="info-text">
            <span class="material-icons">feed</span>
            Senior High School
          </h2>
          <v-data-table-virtual
            :headers="seniorStrand"
            :items="strand"
            height="400"
            item-value="name"
          ></v-data-table-virtual>
        </div>
      </div>

      <div class="bottom-left">
        <div class="total-student">
          <h2 class="info-text">
            <span class="material-icons">feed</span>
            Junior High School
          </h2>
          <v-data-table-virtual
            :headers="junior"
            :items="juniorHigh"
            height="400"
            item-value="name"
          ></v-data-table-virtual>
        </div>
      </div>
    </div>

    <div class="right-container">
      <div class="total-enrolees">
        <h1 class="info-text">
          <span class="material-icons">group</span>
          Total Enrollees
        </h1>
        <div>
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
      <div class="strand-enrolees">
        <h1 class="info-text">
          <span class="material-icons">bar_chart</span>
          Senior High Strands
        </h1>
        <div>
          <canvas ref="strandChartCanvas"></canvas>
        </div>
      </div>
      <div class="school-announcements">
        <h1 class="info-text">
          <span class="material-icons">announcement</span>
          Announcements
        </h1>
        <button @click="openAnnouncementModal" class="add-announcement-button">
          <span class="material-icons">add</span> Add Announcement
        </button>
        <div>
          <!-- Your announcements content goes here -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      strandChart: null,
      sidebarCollapsed: false,
      junior: [
        { title: 'GRADE LEVEL', text: 'Grade Level', value: 'grade_level' },
        { title: 'TOTAL STUDENTS', text: 'Total', value: 'total' }
      ],
      juniorHigh: [
        { grade_level: 'Grade 7', total: '0000' },
        { grade_level: 'Grade 8', total: '0000' },
        { grade_level: 'Grade 9', total: '0000' },
        { grade_level: 'Grade 10', total: '0000' },
        { grade_level: 'Grade 11', total: '0000' },
        { grade_level: 'Grade 12', total: '0000' }
      ],

      seniorStrand: [
        { title: 'STRAND', text: 'Strand', value: 'strand' },
        { title: 'TOTAL STUDENTS', text: 'Total', value: 'total' }
      ],
      strand: [
        { strand: 'HUMSS', total: '0000' },
        { strand: 'STEM', total: '0000' },
        { strand: 'GAS', total: '0000' },
        { strand: 'HE', total: '0000' },
      ],
    };
  },

  mounted() {
    this.renderChart();
    this.renderStrandChart();
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
      if (this.strandChart) {
        this.strandChart.resize();
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
            data: [100, 500], // Junior and Senior High total enrollees
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
    },
    renderStrandChart() {
      this.strandChart = new Chart(this.$refs.strandChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['HUMSS', 'STEM', 'GAS', 'HE'],
          datasets: [
            {
              label: '1st Semester',
              data: [100, 200, 150, 50], // Example data
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              borderHeight: 2
            },
            {
              label: '2nd Semester',
              data: [80, 180, 120, 40], // Example data
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              borderHeight: 2
            }
          ]
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
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.left-container {
  flex: 1 1 48%;
  display: flex;
  flex-direction: column;
}

.top-left, .bottom-left {
  flex: 1 1 48%;
  padding: 1rem;
  margin-bottom: 2rem;
  color: var(--dark);
  border-radius: 5px;
  border: 1px solid var(--light);
  border-left: 6px solid var(--dark-alt);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
}

.right-container {
  flex: 1 1 48%;
  max-width: calc(50% - 0.5rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.total-enrolees {
  flex: 0 0 30%; 
  padding: 1rem;
  color: var(--dark);
  border-radius: 5px;
  border: 1px solid var(--light);
  border-left: 6px solid var(--dark-alt);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
}

.strand-enrolees { 
  flex: 1 1 30%; 
  padding: 1rem;
  color: var(--dark);
  border-radius: 5px;
  border: 1px solid var(--light);
  border-left: 6px solid var(--dark-alt);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
}

.school-announcements { 
  flex: 1 1 40%; 
  padding: 1rem;
  color: var(--dark);
  border-radius: 5px;
  border: 1px solid var(--light);
  border-left: 6px solid var(--dark-alt);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
}

table {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
  border: 0.5px solid rgb(228, 228, 228);
  width: 100%;
}

th {
  color: var(--dark);
  font-size: 20px;
  text-align: center;
  text-shadow: 0 0 1px;
}

td {
  color: var(--dark);
  font-weight: 600;
  vertical-align: middle;
}

.info-text {
  color: var(--dark);
  font-size: 20px;
  text-shadow: 0 0 1px;
  margin-bottom: 1rem;
}

.material-icons {
  position: relative;
  font-size: 35px;
  top: 10px;
}

.profile {
  padding: 1rem;
  margin-bottom: 2rem;
  color: var(--dark);
  border-radius: 5px;
  border: 1px solid var(--light);
  border-left: 3px solid var(--dark-alt);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
}

.content {
  display: flex;
  flex-direction: row;
  margin-left: 0.3rem;
}

h7 {
  color: var(--dark);
  text-shadow: 0 0 1px;
  font-size: 12px;
}

h6 {
  color: var(--dark);
  font-weight: 900;
}

.address {
  font-size: 15px;
}

.add-announcement-button {}
</style>
