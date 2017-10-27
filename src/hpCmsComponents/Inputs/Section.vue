<template>
    <div class="row">
        <div class="small-12 medium-4 columns">
            <label>Section</label>
            <input v-model="section" placeholder="Section" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Section URL</label>
            <input v-model="sectionUrl" placeholder="Section URL" type="text"></input>
        </div>
        <div class="small-12 medium-4 columns">
            <label>Section Description Tag</label>
            <input v-model="sectionDescription" placeholder="Section Description Tag" type="text"></input>
        </div>
    </div>
</template>

<script>
export default {
    props: ['moduleType'],
    data: function()  {
        return {
            section: null,
            sectionUrl: null,
            sectionDescription: null
        }
    },
    created: function() {
        if (this.textarea === 'seo1') {
            this.section = this.$parent.seo1Section;
            this.sectionUrl = this.$parent.seo1SectionUrl;
            this.sectionDescription = this.$parent.seo1SectionDescription;
        } else if (this.textarea === 'seo2') {
            this.section = this.$parent.seo2Section;
            this.sectionUrl = this.$parent.seo2SectionUrl;
            this.sectionDescription = this.$parent.seo2SectionDescription;
        } else {
            this.section = this.$parent.section;
            this.sectionUrl = this.$parent.sectionUrl;
            this.sectionDescription = this.$parent.sectionDescription;
        }
    },
    updated: function () {
        if (this.textarea === 'seo1') {
            this.$parent.seo1Section = this.section;
            this.$parent.seo1SectionUrl = this.sectionUrl;
            this.$parent.seo1SectionDescription = this.sectionDescription;
        } else if (this.textarea === 'seo2') {
            this.$parent.seo2Section = this.section;
            this.$parent.seo2SectionUrl = this.sectionUrl;
            this.$parent.seo2SectionDescription = this.sectionDescription;
        } else {
            this.$parent.section = this.section;
            this.$parent.sectionUrl = this.sectionUrl;
            this.$parent.sectionDescription = this.sectionDescription;
        }
    }
}
</script>

<style lang="scss">
</style>
