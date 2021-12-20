<template>
<div style="background-color:#F6F6F6" class="vh-100 text-center d-flex align-items-center">
    <div class="m-auto">
        <template v-if="error.statusCode==404">
            <img src="/images/logo/404.jpg" alt=" " class="w-75">
            <div class="text-dark" >
                <h2 class="mt-4">Page is not found</h2>
                <h2 class="mt-2">The page is doesnt exist or deleted</h2>
            </div>            
            <div class="mt-2 text-danger">
                <client-only><KTimer :endTime="10000" @ended="gENd" /></client-only>
                <span>later, will be redirected to homepage</span>
            </div>
        </template>
        <template v-else>
            <h1 class="text-center" style="font-size: 5rem">{{error.statusCode}}</h1>
            <h3 class="mt-2">{{error.message}}</h3>
        </template>
        <div class="mt-4">
            <b-button variant="primary" @click="goBack" size="lg" class="w-50">Back</b-button>
        </div>
    </div>
</div>
</template>

<script>
export default {  
    props: ['error'],
    data(){
        return{
            counter_end_time: +new Date() + 10000
        }
    },
    methods:{
        gENd(){
            // if(process.client && this.error.statusCode==404){
            //     this.goBack()
            // }
        }
    }
}
</script>