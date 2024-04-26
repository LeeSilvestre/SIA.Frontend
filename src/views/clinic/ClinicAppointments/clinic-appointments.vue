<script setup>
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
      //Button CSS

</script>

<template>

    <div class="container mx-auto">
        <Breadcrumbs parentTitle="Clinic Appointments"/>   
        <div class="grid grid-row-12 gap-5">
            <div
                class="
                    col-span-12
                    xl:col-span-3
                    lg:col-span-6
                    md:col-span-6
                    sm:col-span-6  
                "
            >
        </div>
        <!--Dental Appointments-->
            <div class="row-span-12">
                <BaseCard>
                    <template v-slot:cardHeader>
                        <div class="card-header">
                            <div class="card-title py-3 ">Dental Appointments
                                <BaseBtn 
                                class="mb-3 mr-3 bg-info text-white float-right"
                              >
                                <i class="i-Add mr-1"></i>
                                Add Appointment
                              </BaseBtn>
                            </div>
                        </div>     
                    </template>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img
                        class="avatar-md mr-2 rounded w-20 h-20"
                        src="/images/user_icon.jpg"
                        alt="Student Picture"
                    />
                        <div class="flex-grow text-center md:text-left">
                            <h4>
                                    Student Number: 20210031
                            </h4>
                            <h6> 
                                    Name: Shane Godson
                            </h6>
                            <h6> 
                                    Schedule: April 27,2024
                            </h6>
                        </div>
                        <BaseBtn
                            sm
                            class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            "
                            >View Details</BaseBtn
                        >
                    </div>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img
                        class="avatar-md mr-2 rounded w-20 h-20"
                        src="/images/user_icon.jpg"
                        alt="Student Picture"
                    />
                        <div class="flex-grow text-center md:text-left">
                            <h4>
                                    Student Number: 20210031
                            </h4>
                            <h6> 
                                    Name: Shane Godson
                            </h6>
                            <h6> 
                                    Schedule: April 27,2024
                            </h6>
                        </div>
                        <BaseBtn
                            sm
                            class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            "
                            >View Details</BaseBtn
                        >
                    </div>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img
                            class="avatar-md mr-2 rounded w-20 h-20"
                            src="/images/user_icon.jpg"
                            alt="Student Picture"
                        />
                        <div class="flex-grow text-center md:text-left">
                            <div class="flex-grow text-center md:text-left">
                                <h4>
                                        Student Number: 20210031
                                </h4>
                                <h6> 
                                        Name: Shane Godson
                                </h6>
                                <h6> 
                                        Schedule: April 27,2024
                                </h6>
                            </div>
                        </div>
                        <BaseBtn
                            sm
                            class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            "
                            >View Details</BaseBtn
                        >
                    </div>
               
                </BaseCard>
             </div> 
             <v-spacer></v-spacer>
             <!--Physical Appointments-->
             <div class="row-span-12">
                <BaseCard>
                    <template v-slot:cardHeader>
                        <div class="card-header">
                            <div class="card-title py-3">Physical Appointments
                                <BaseBtn 
                                class="mb-3 mr-3 bg-info text-white float-right"
                              >
                                <i class="i-Add mr-1"></i>
                                Add Appointment
                              </BaseBtn>
                            </div>
                        </div>     
                    </template>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img
                        class="avatar-md mr-2 rounded w-20 h-20"
                        src="/images/user_icon.jpg"
                        alt="Student Picture"
                    />
                        <div class="flex-grow text-center md:text-left">
                            <h4>
                                    Student Number: 20210031
                            </h4>
                            <h6> 
                                    Name: Shane Godson
                            </h6>
                            <h6> 
                                    Schedule: April 27,2024
                            </h6>
                        </div>
                        <BaseBtn
                            sm
                            class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            "
                            >View Details</BaseBtn
                        >
                    </div>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img
                        class="avatar-md mr-2 rounded w-20 h-20"
                        src="/images/user_icon.jpg"
                        alt="Student Picture"
                    />
                        <div class="flex-grow text-center md:text-left">
                            <h4>
                                    Student Number: 20210031
                            </h4>
                            <h6> 
                                    Name: Shane Godson
                            </h6>
                            <h6> 
                                    Schedule: April 27,2024
                            </h6>
                        </div>
                        <BaseBtn
                            sm
                            class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            "
                            >View Details</BaseBtn
                        >
                    </div>
                    <div class="flex flex-col items-center mb-4 md:flex-row">
                        <img
                            class="avatar-md mr-2 rounded w-20 h-20"
                            src="/images/user_icon.jpg"
                            alt="Student Picture"
                        />
                        <div class="flex-grow text-center md:text-left">
                            <div class="flex-grow text-center md:text-left">
                                <h4>
                                        Student Number: 20210031
                                </h4>
                                <h6> 
                                        Name: Shane Godson
                                </h6>
                                <h6> 
                                        Schedule: April 27,2024
                                </h6>
                            </div>
                        </div>
                        <BaseBtn
                            sm
                            class="
                                border border-primary
                                text-primary
                                rounded-full
                                hover:bg-primary hover:text-white
                            "
                            >View Details</BaseBtn
                        >
                    </div>
                </BaseCard>
             </div>  
        </div>
    </div>
</template>
