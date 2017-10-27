<template>
    <div class="row">
        <div class="small-12 medium-4 columns">
            <label>CTA</label>
            <input v-if="inputType != 'textarea'" v-model="cta" placeholder="CTA" type="text"></input>
            <textarea v-if="inputType === 'textarea'" v-model="cta" placeholder="CTA" type="text" rows="6"></textarea>
        </div>
        <div class="small-12 medium-4 columns">
            <label>CTA URL</label>
            <input v-if="inputType != 'textarea'" v-model="ctaUrl" placeholder="CTA URL" type="text"></input>
            <textarea v-if="inputType === 'textarea'" v-model="ctaUrl" placeholder="CTA URL" type="text" rows="6"></textarea>
        </div>
        <div class="small-12 medium-4 columns">
            <label>CTA Description Tag</label>
            <input v-if="inputType != 'textarea' " v-model="ctaDescription" placeholder="CTA Description Tag" type="text"></input>
            <textarea v-if="inputType === 'textarea'" v-model="ctaDescription" placeholder="CTA Description Tag" type="text" rows="6"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    props: ['inputType', 'moduleType'],
    data: function()  {
        return {
            cta: null,
            ctaUrl: null,
            ctaDescription: null
        }
    },
    created: function() {
        if (this.moduleType === 'seo1') {
            this.cta = this.$parent.seo1cta;
            this.ctaUrl = this.$parent.seo1ctaUrl;
            this.ctaDescription = this.$parent.seo1ctaDescription;
        } else if (this.moduleType === 'seo2') {
            this.cta = this.$parent.seo2cta;
            this.ctaUrl = this.$parent.seo2ctaUrl;
            this.ctaDescription = this.$parent.seo2ctaDescription;
        } else {
            this.cta = this.$parent.cta;
            this.ctaUrl = this.$parent.ctaUrl;
            this.ctaDescription = this.$parent.ctaDescription;
        }
    },
    updated: function() {
        if (this.moduleType === 'seo1') {
            this.$parent.seo1cta = this.cta;
            this.$parent.seo1ctaUrl = this.ctaUrl;
            this.$parent.seo1ctaDescription = this.ctaDescription;
        } else if (this.moduleType === 'seo2') {
            this.$parent.seo2cta = this.cta;
            this.$parent.seo2ctaUrl = this.ctaUrl;
            this.$parent.seo2ctaDescription = this.ctaDescription;
        } else {
            this.$parent.cta = this.cta;
            this.$parent.ctaUrl = this.ctaUrl;
            this.$parent.ctaDescription = this.ctaDescription;
        }
    }
}
</script>

<style lang="scss">
</style>
