<template>
  <div class="mx-auto auth-layout-wrap flex justify-center min-h-screen flex-col bg-cover items-center" style="background-image: url(/images/SNA_bg.jpg)">
        <div class="container-session-v1 max-w-2xl">
            <BaseCard class="overflow-hidden">
                <div class="grid grid-cols-12">
                    <div class="col-span-12 object-fill h-80 w-50 bg-no-repeat bg-cover bg-center lg:col-span-6" style="background-image:">         
                    </div>
                    <div class="col-span-12 lg:col-span-6 bg-blue-200">
                        <div class="p-10">
                            <h1 class="mb-8 text-center text-lg">SNA Clinic Admin</h1>
                            <form action="">
                                <div class="mb-3">
                                    <label class="text-base text-gray-600" for="">Email Address</label>
                                    <input class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="email" placeholder="">
                                </div>
                                <div class="mb-3">
                                    <label class="text-base text-gray-600" for="">Password</label>
                                    <input class="w-full px-4 py-1 border border-gray focus:outline-none rounded-full" type="password" placeholder="">
                                </div>
                                <BaseBtn rounded block class="bg-purple-500 text-white mt-8">Sign In</BaseBtn>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </BaseCard>        
        </div>
    </div>
</template>
