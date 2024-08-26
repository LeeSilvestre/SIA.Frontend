<template>
  <main>
    <div class="left-container">
      <h2 class="info-text fs-3">
        <span class="material-icons">group</span>
        ST. NICHOLAS ACADEMY TOTAL STUDENTS
      </h2>
      <v-row>
        <v-col cols="4">
          <v-card class="child-card" style="border-top: 6px solid green">
            <h1 class="fs-2 text-center">Grade 7</h1>
            <h2 class="fs-3 text-center">{{ grade7Count }}</h2>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="child-card" style="border-top: 6px solid orange">
            <h1 class="fs-2 text-center">Grade 8</h1>
            <h2 class="fs-3 text-center">{{ grade8Count }}</h2>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="child-card" style="border-top: 6px solid red">
            <h1 class="fs-2 text-center">Grade 9</h1>
            <h2 class="fs-3 text-center">{{ grade9Count }}</h2>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card class="child-card" style="border-bottom: 6px solid green">
            <h1 class="fs-2 text-center">Grade 10</h1>
            <h2 class="fs-3 text-center">{{ grade10Count }}</h2>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="child-card" style="border-bottom: 6px solid orange">
            <h1 class="fs-2 text-center">Grade 11</h1>
            <h2 class="fs-3 text-center">{{ grade11Count }}</h2>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="child-card" style="border-bottom: 6px solid red">
            <h1 class="fs-2 text-center">Grade 12</h1>
            <h2 class="fs-3 text-center">{{ grade12Count }}</h2>
          </v-card>
        </v-col>
      </v-row>

      <!-- <div class="top-left">
        <div class="total-student">
          <h2 class="info-text">
            <span class="material-icons">feed</span>
            SENIOR HIGH SCHOOL
          </h2>
          <v-data-table-virtual :headers="seniorStrand" :items="strand" height="400"
            item-value="name"></v-data-table-virtual>
        </div>
      </div> -->
      <!-- 
      <div class="bottom-left">
        <div class="total-student">
          <h2 class="info-text">
            <span class="material-icons">feed</span>
            JUNIOR HIGH SCHOOL
          </h2>
          <v-data-table-virtual :headers="junior" :items="juniorHigh" height="400"
            item-value="name"></v-data-table-virtual>
        </div>
      </div> -->

      <div class="right-container">
        <v-card class="total-enrolees">
          <div class="info-header">
            <h2 class="info-text mb-5 fs-3">
              <span class="material-icons">pie_chart</span>
              TOTAL STUDENTS
            </h2>
            <div class="chart-container">
              <canvas ref="chartCanvas"
              style="height: 400px; width: 100%"></canvas>
            </div>
          </div>
        </v-card>

        <v-card class="strand-enrolees">
          <h1 class="info-text mb-5 fs-3">
            <span class="material-icons">bar_chart</span>
            SENIOR HIGH STRANDS
          </h1>
          <div>
            <canvas
              ref="strandChartCanvas"
              style="height: 400px; width: 100%"
            ></canvas>
          </div>
        </v-card>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      grade7Count: 0,
      grade8Count: 0,
      grade9Count: 0,
      grade10Count: 0,
      grade11Count: 0,
      grade12Count: 0,
      heCount: 0,
      stemCount: 0,
      gasCount: 0,
      humssCount: 0,
      abmCount: 0,
      junior: [
        { title: "GRADE LEVEL", text: "Grade Level", value: "grade_level" },
        {
          title: "TOTAL STUDENTS",
          align: "center",
          text: "Total",
          value: "total_count",
        },
      ],
      juniorHigh: [],
      seniorStrand: [
        { title: "STRAND", text: "Strand", value: "strand" },
        {
          title: "TOTAL STUDENTS",
          align: "center",
          text: "Total",
          value: "total_count",
        },
      ],
      strand: [],
    };
  },

  mounted() {
    this.getCount();
    this.getStrandCount();
    this.renderChart();
    this.renderStrandChart();
  },

  methods: {
    async getCount() {
      let res = await axios.get("countGrade");
      let data = res.data.student;

      // Filter and get the counts for each grade
      this.grade7Count = this.getGradeCount(data, "Grade 7");
      this.grade8Count = this.getGradeCount(data, "Grade 8");
      this.grade9Count = this.getGradeCount(data, "Grade 9");
      this.grade10Count = this.getGradeCount(data, "Grade 10");
      this.grade11Count = this.getGradeCount(data, "Grade 11");
      this.grade12Count = this.getGradeCount(data, "Grade 12");

      // Filter and map data for junior high excluding grades 11 and 12
      this.juniorHigh = data
        .filter(
          (count) =>
            count.grade_level !== "Grade 11" && count.grade_level !== "Grade 12"
        )
        .map((count) => ({
          grade_level: count.grade_level,
          total_count: count.total_count.toString().padStart(1, "0"),
        }));
    },

    getGradeCount(data, grade) {
      let gradeData = data.find((count) => count.grade_level === grade);
      return gradeData ? gradeData.total_count : 0;
    },

    // async getStrandCount() {
    //   let res = await axios.get("countstrand");
    //   let data = res.data.student;

    //   this.strand = data.map((count) => ({
    //     strand: count.strand,
    //     total_count: count.total_count.toString().padStart(1, "0"),
    //   }));
    // },

    async getStrandCount() {
      try {
        let res = await axios.get("countstrand");
        let data = res.data.student;

        // Assuming the API returns data like this:
        // [{ strand: 'HE', total_count: 100 }, ...]

        this.heCount = this.getStrandCountByName(data, "HE");
        this.stemCount = this.getStrandCountByName(data, "STEM");
        this.gasCount = this.getStrandCountByName(data, "GAS");
        this.humssCount = this.getStrandCountByName(data, "HUMSS");
        this.abmCount = this.getStrandCountByName(data, "ABM");
      } catch (error) {
        console.error("Error fetching strand data:", error);
      }
    },

    getStrandCountByName(data, name) {
      let strandData = data.find((count) => count.strand === name);
      return strandData ? strandData.total_count : 0;
    },

    async renderChart() {
      let res = await axios.get("count");
      let data = res.data.student;

      this.chart = new Chart(this.$refs.chartCanvas.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Junior High School", "Senior High School"],
          datasets: [
            {
              label: "Student Enrolled",
              data: [data.jhs_count, data.shs_count], // Junior and Senior High total enrollees
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },

    async renderStrandChart() {
      let res = await axios.get("countstrand");
      let data = res.data.student;

      let sem = data.map((count) => ({
        strand: count.strand,
        total_count: count.total_count,
      }));

      this.strandChart = new Chart(
        this.$refs.strandChartCanvas.getContext("2d"),
        {
          type: "bar",
          data: {
            labels: ["HUMSS", "STEM", "GAS", "HE", "ABM"],
            datasets: [
              {
                label: "1st Semester",
                data: [
                  sem[1].total_count,
                  sem[0].total_count,
                  sem[4].total_count,
                  sem[3].total_count,
                  sem[2].total_count,
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                borderHeight: 2,
              },
              {
                label: "2nd Semester",
                data: [0, 0, 0, 0],
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
                borderHeight: 2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        }
      );
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
  box-sizing: border-box;
}

.child-card {
  flex: 1; 
  margin-top: 5px;
  padding: 1rem; 
  display: flex;
  flex-direction: column; 
  background-color: #f6f4f4;
}

.left-container {
  flex: 2 1 60%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
}

.right-container {
  display: flex;
  gap: 16px;
  flex-direction: row;
}

.total-enrolees,
.strand-enrolees {
  flex: 1;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.total-enrolees {
  width: 50vh !important;
  border-left: 4px solid var(--dark);
}

.strand-enrolees {
  width: 50%;
  border-right: 4px solid var(--dark);
}

.total-enrolees canvas,
.strand-enrolees canvas {
  width: 100% !important;
  height: 400px;
}

.info-header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.info-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--dark);
  text-shadow: 0 0 1px;
}

.material-icons {
  font-size: 2rem;
  vertical-align: middle;
}

@media screen and (max-width: 768px) {
  .total-enrolees canvas,
  .strand-enrolees canvas {
    height: 300px;
  }

  main {
    flex-direction: column;
    gap: 1rem;
  }

  .left-container,
  .right-container {
    flex: 1 1 100%;
  }
}

</style>
