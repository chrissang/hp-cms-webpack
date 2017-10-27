<template>
    <div class="row">
        <div class="small-12 medium-4 columns">
            <label>Headline</label>
            <input v-model="headline" placeholder="Headline" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Headline URL</label>
            <input v-model="headlineUrl" placeholder="Headline URL" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Headline Description Tag</label>
            <input v-model="headlineDescription" placeholder="Headline Description Tag" type="text"></input>
        </div>
    </div>
</template>

<script>
export default {
    data: function()  {
        return {
            headline: null,
            headlineUrl: null,
            headlineDescription: null
        }
    },
    created: function() {
        this.headline = this.$parent.headline;
        this.headlineUrl = this.$parent.headlineUrl;
        this.headlineDescription = this.$parent.headlineDescription;
    },
    updated: function () {
        this.$parent.headline = this.headline;
        this.$parent.headlineUrl = this.headlineUrl;
        this.$parent.headlineDescription = this.headlineDescription;
    }
}
</script>

<style lang="scss">
</style>
