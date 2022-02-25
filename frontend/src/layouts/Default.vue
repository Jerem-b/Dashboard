<template>
    <div>
        <NavBar />
        <slot />
        <v-footer app dark>
            <FooterBar />
        </v-footer>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar";

export default {
    components: {
        NavBar,
        FooterBar
    }
}
</script>