<script setup>
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
    
</script>

<template>
    <div class="container mx-auto">
        <Breadcrumbs parentTitle="Medical Supplies"/>     
        <div class="grid grid-cols-12 gap-5">
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
            <div class="col-span-12">
                <BaseCard>
                    <template v-slot:cardHeader>
                        <div class="card-header">
                            <div class="card-title py-3">Medical Supplies
                                <!--Button-->
                                <BaseBtn 
                                class="mb-3 mr-3 bg-primary text-white float-right"
                              >
                                <i class="i-Add mr-1"></i>
                                Add Supplies    
                              </BaseBtn>
                            </div>
                        </div>     
                    </template>
                    <div
                        class="
                            block
                            w-full
                            overflow-x-auto
                            whitespace-nowrap
                            borderless
                            hover
                        "
                    >
                        <div
                            class="
                                dataTable-wrapper dataTable-loading
                                no-footer
                                fixed-columns
                            "
                        >
                            
                            <div
                                class="
                                    dataTable-container
                                    block
                                    w-full
                                    overflow-x-auto
                                    whitespace-nowrap
                                    borderless
                                    hover
                                "
                            >
                                <table
                                    class="
                                        table-3
                                        dataTable-table
                                        max-w-full
                                        w-full
                                    "
                                >
                                    <thead>
                                        <tr class="">
                                            <th
                                                class="
                                                    text-center
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Product ID
                                            </th>
                                            
                                            <th
                                                class="
                                                    text-center
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                    text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                class="
                                                    text-center
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                     text-gray-500
                                                    font-semibold
                                                "
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                class="
                                                    text-center
                                                    border-b
                                                    pb-3
                                                    mb-3
                                                     text-gray-500
                                                    font-semibold
                                                "
                                            >
                                               Date Procured
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            class="
                                                hover:bg-gray-100
                                                cursor-pointer
                                                
                                            "
                                            v-for="(n, index) in 8"
                                            :key="index"
                                            
                                        >
    
                                            <td class="text-xs py-5 px-4 text-center">{{index+1}}</td>
                                            
                                          
                                            <td class="py-5  text-center"> Paracetamol Tablet </td>

                                            <td class="py-5 text-center">100</td>
                                            <td class="py-5 text-center">12/25/20</td>
                                            <!-- 
                                            <td class="py-5  text-center">
                                                <span
                                                    class="
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-primary
                                                        border border-primary
                                                        mr-3
                                                        text-xs
                                                    "
                                                    >Ongoing</span
                                                >
                                            </td>
                                            
                                            <td class="py-5  text-center">
                                               
                                                <BaseBtn rounded class="border border-primary text-primary hover:bg-primary hover:text-white">
                                                   Details
                                                </BaseBtn>
                                            </td>
                                        -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="dataTable-bottom">
                                <div class="dataTable-info">
                                    Showing 1 to 8 of 8 entries
                                </div>
                                <nav class="dataTable-pagination">
                                    <ul class="dataTable-pagination-list"></ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </BaseCard>
            </div>
        </div>  
    </div>
</template>

<script>

</script>