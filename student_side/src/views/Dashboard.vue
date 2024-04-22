<template>
    <main>
        <div class="left-container">
            <div class="top-left">
                <table class="table table-bordered">
                    <thead class="table-label">
                      <tr>
                        <th scope="col">To Do</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Clinic</td>
                        <td ></td>
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
                <h3><span class="material-icons"> campaign</span>Announcement</h3>
                    
                </div>
        </div>
        
        <div class="right-container">
            <div class="profile">
                <h3><span class="material-icons"> account_circle</span>Profile</h3>
            </div>

            <div class="content">
                <div class="left">
                    <h6>Student ID</h6>
                    <h5>202110043</h5> 

                    <h6>Name</h6>
                    <h5>Gericho Delos Reyes</h5>

                    <h6>Grade Level</h6>
                    <h5>Grade 10</h5>

                    <h6>Email Address</h6>
                    <h5>gerichodr@gmail.com</h5>
                </div>

                <div class="right">
                    <h6>Address</h6>
                    <h5>#7, Upper Building, Old Cabalan, Olongapo City</h5>

                    <h6>Gender</h6>
                    <h5>Male</h5>

                    <h6>Birthdate</h6>
                    <h5>1/1/2002</h5>

                </div>
            </div>

        </div>
    </main>
</template>

<script>
export default {

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
        border-radius: 10px;
        border: 1px solid;
        border-left: 5px solid;

        th{
            color: var(--dark);
            font-size: 25px;
            text-align: center;
            text-shadow: 0 0 1px;
        }

        td{
            color: var(--dark);
            font-weight: 600;
        }

    }
    .bottom-left{
        padding: 1.5rem;
        background-color: #f7f7f7;
        color: var(--dark);
        border-radius: 5px;
            
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

.right-container{
    display: flex;
    flex-direction: column;
    flex: 0.5;
    padding: 1rem;
    color: var(--dark);
    border-radius: 5px;
    border: 1px solid;
    border-left: 5px solid;
   

    .profile{
        color: var(--dark);
        margin-bottom: 1rem;
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
        flex: 1;

        .left{
            flex: 0.5;
            padding: 0.5rem;
            
            h6{
                color: var(--dark);
                text-shadow: 0 0 1px;
            }
            h5{
                color: var(--dark);
                text-shadow: 0px 1px, 1px 0px, 1px 1px;
            }
        }
        .right{
            flex: 0.5;
            padding: 0.5rem;

            h6{
                color: var(--dark);
                text-shadow: 0 0 1px;
            }
            h5{
                color: var(--dark);
                text-shadow: 0px 1px, 1px 0px, 1px 1px;
            }
        }
    }
}
</style>