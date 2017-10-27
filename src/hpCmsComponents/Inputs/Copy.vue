<template>
    <div class="row">
        <div class="small-12 medium-4 columns">
            <label>Copy</label>
            <textarea v-model="copy" placeholder="Copy" type="text" rows="6"></textarea>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Copy URL</label>
            <input v-model="copyUrl" placeholder="Copy URL" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Copy Description Tag</label>
            <input v-model="copyDescription" placeholder="Copy Description Tag" type="text"></input>
        </div>
    </div>
</template>

<script>
export default {
    data: function()  {
        return {
            copy: null,
            copyUrl: null,
            copyDescription: null
        }
    },
    created: function() {
        this.copy = this.$parent.copy;
        this.copyUrl = this.$parent.copyUrl;
        this.copyDescription = this.$parent.copyDescription;
    },
    updated: function() {
        this.$parent.copy = this.copy;
        this.$parent.copyUrl = this.copyUrl;
        this.$parent.copyDescription = this.copyDescription;
    }
}
</script>

<style lang="scss">
</style>
