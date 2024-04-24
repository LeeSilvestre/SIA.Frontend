<template>
    <header class="header sticky-lg-top">
        <h2 class="sna-label fs-3">REGISTRAR PANEL</h2>


        
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    background: #374974;
    height: var(--header-height);
    width: 100%;
    
    .sna-label{
        flex: 1;
        color: #e2e2e2;
        align-self: center;
        margin-left: 1rem;
    }
 
}

</style>