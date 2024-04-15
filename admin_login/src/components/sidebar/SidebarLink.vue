<template>
    <router-link :to="to" :class="{ 'active': isActive }" class="link">
        <i class="icon" :class="icon"></i>
        <transition name="fade">
            <span v-if="!collapsed"><slot></slot></span>
        </transition>
    </router-link>
</template>

<script>
export default {
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    computed: {
        isActive: function() {
            return this.$route.path === this.to;
        }
    },
    data() {
        return {
            collapsed: false // Assuming this is defined in your component or elsewhere
        };
    }
};
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.1s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .link {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        font-weight: 400;
        user-select: none;
        margin: 0.1em 0;
        padding: 0.4em;
        border-radius: 0.25em;
        height: 1.5em;
        color: black;
        text-decoration: none;
    }
    .link:hover{
        background-color: var(--sidebar-item-hover);
    }
    .link.active{
        background-color: var(--sidebar-item-hover);
    }
    .link .icon {
        flex-shrink: 0;
        width: 25px;
        margin-right: 10px;
    }
</style>
