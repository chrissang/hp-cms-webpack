<template>
    <main class="main-exact" style="min-height:100vh">
        <h1>Preview Home Page</h1>

        <div id="hp_modules" class="homePage-container">
            <hp-container></hp-container>
        </div>

        <div class="row">
            <div class="small-12 columns prefooterLine">
    		<div class="row collapse">
    			<div class="small-8 small-centered columns">
    				<hr class="dottedSpacer">
    			</div>
    		</div>
    	</div>
        </div>
    </main>
</template>

<script>
    import HpContainer from '../hpComponents/HpContainer.vue';

    export default {
        data: function()  {
            return {
            }
        },
        components: {
            'hp-container': HpContainer
        },
        created: function() {
            // console.log('router ',this.$route);
            console.log('router ',this.$route.query.payload);
        }
    }
</script>


<style>
    @import "../css/app.css";
</style>
