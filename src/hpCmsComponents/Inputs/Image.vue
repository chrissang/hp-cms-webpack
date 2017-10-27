<template>
    <div class="row">
        <div class="small-12 medium-4 columns">
            <label>Small Image URL</label>
            <textarea v-if="inputType === 'textarea'" v-model="smallImageUrl" placeholder="/images/items/21900/21996_1_180px.jpg" type="text" rows="6"></textarea>
            <input v-if="inputType != 'textarea'" v-model="smallImageUrl" placeholder="/images/items/21900/21996_1_180px.jpg" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Large Image URL</label>
            <textarea v-if="inputType === 'textarea'" v-model="largeImageUrl" placeholder="/images/items/21900/21996_1_640px.jpg" type="text" rows="6"></textarea>
            <input v-if="inputType != 'textarea'" v-model="largeImageUrl" placeholder="/images/items/21900/21996_1_640px.jpg" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Image Description Tag</label>
            <textarea v-if="inputType === 'textarea'" v-model="imageDescription" placeholder="Image Description Tag" type="text" rows="6"></textarea>
            <input v-if="inputType != 'textarea'" v-model="imageDescription" placeholder="Image Description Tag" type="text"></input>
        </div>
    </div>
</template>

<script>
export default {
    data: function()  {
        return {
            smallImageUrl: null,
            largeImageUrl: null,
            imageDescription: null
        }
    },
    props: ['inputType'],
    created: function() {
        this.smallImageUrl = this.$parent.smallImageUrl;
        this.largeImageUrl = this.$parent.largeImageUrl;
        this.imageDescription = this.$parent.imageDescription;
    },
    updated: function () {
        this.$parent.smallImageUrl = this.smallImageUrl;
        this.$parent.largeImageUrl = this.largeImageUrl;
        this.$parent.imageDescription = this.imageDescription;
    }
}
</script>

<style lang="scss">
</style>
