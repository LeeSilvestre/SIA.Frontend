<template>
    <main>
        <div class="left-container">
            <div class="top-left" >
                <table class="table table-bordered ">
                    <thead class="table-label">
                      <tr>
                        <th scope="col" >To Do</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Clinic</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Finance</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Guidance</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Registrar</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
            </div>
                
            <div class="bottom-left">
                <h3><span class="material-icons"> campaign</span>Announcements</h3>
                    <Announcement/>
                </div>
        </div>
        
        <div class="right-container" > 
            <!-- v-for="(student, index) in this.student" :key="index"  loop to para i display lahat ng data sa database table -->
            <div class="profile">
                <h3><span class="material-icons"> account_circle</span>Profile</h3>
           
                <div class="content">
                <div class="left">
                    <h7>Student ID</h7>
                    <h6>{{ student.student_id}}</h6> 

                    <h7>Name</h7>
                    <h6>{{ student.first_name}} {{ student.middle_name}} {{ student.last_name}}</h6>

                    <h7>Grade Level</h7>
                    <h6>Grade 10</h6>

                    <h7>Email Address</h7>
                    <h6>{{ student.email}}</h6>
                </div>

                <div class="right">
                    <h7>Address</h7>
                    <h6 class="address">{{ student.street}}, {{ student.barangay}}, {{ student.city}}, {{ student.province}}</h6>

                    <h7>Gender</h7>
                    <h6>{{ student.sex_at_birth}}</h6>

                    <h7>Birthdate</h7>
                    <h6>{{ student.birth_date}}</h6>

                </div>
            </div>
        </div>
            <div class="bottom-right">
                <h4>TBA</h4>
            </div>

        </div>
    </main>
</template>

<script>
import axios from 'axios'
import Announcement from '../components/Announcement.vue';

export default {
    components: {
        Announcement
    },
    name: 'student',
    data (){
        return {
            student:[]
        }
    },
    mounted(){
        
        this.getStudentS();

    },
    methods: {
        getStudentS(){
            
            axios.get('http://127.0.0.1:8000/api/student/1').then(res =>{
                this.student = res.data.student
                // console.log(this.student)
            });
        }
    }
}
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
        margin-bottom: 2rem;
        color: var(--dark);
        border-radius: 5px;
        border: 1px solid var(--light);
        border-left: 5px solid var(--dark-alt);
        
        table{
            box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
            border: 0.5px solid rgb(228, 228, 228);
            width: 100%;
        }

        th{
            color: var(--dark);
            font-size: 20px;
            text-align: center;
            text-shadow: 0 0 1px;
        }

        td{
            color: var(--dark);
            font-weight: 600;
            vertical-align: middle;
            
        }

    }
    .bottom-left{
        padding: 1rem;
        color: var(--dark);
        border-radius: 5px;
        border: 1px solid var(--light);
        border-left: 5px solid var(--dark-alt);
        
        h3 {
            text-shadow: 0 0 1px;
            font-size: 20px;
            margin-bottom: 1rem;
        }
        .material-icons{
            position:relative;
            font-size: 35px;
            top: 10px;
        }
    }
}

.right-container{
    flex: 0.5;
    color: var(--dark);

    .profile{
        color: var(--dark);
        margin-bottom: 1rem;
        padding-left: 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--light);
        border-left: 5px solid var(--dark-alt);
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
    .content{
        display: flex;
        flex-direction: row;
        flex: 0.5;
        margin-left: 0.3rem;

        .left{
            flex: 0.6;
            padding: 0.5rem;
            
            h7{
                color: var(--dark);
                text-shadow: 0 0 1px;
                font-size: 12px;
            }
            h6{
                color: var(--dark);
                font-weight: 900;
            }
        }
        .right{
            flex: 0.5;
            padding: 0.5rem;

            h7{
                color: var(--dark);
                text-shadow: 0 0 1px;
                font-size: 12px;
            }
            h6{
                color: var(--dark);
                font-weight: 900;
            }
            .address{
                font-size: 15px;
            }
        }
    }
    .bottom-right{
        padding: 1rem;
        margin-top: 2rem;
        border-radius: 5px;
        background-color: #e6e6e6;
        min-height: 22rem;
    }
}
</style>