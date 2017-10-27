<template>
    <li :id="uniqueId" data-type="small-feature-module">
        <div class="flexContainer">
            <div class="small-11 columns">
                <dl class="accordion" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a :href="'#accordion-'+uniqueId" :id="'accordion-heading-'+uniqueId" role="tab" class="handle">Small Feature Module</a>
                        <div :id="'accordion-'+uniqueId" :aria-labelledby="'accordion-heading-'+uniqueId" role="tabpanel" class="content">
                            <item-inputs></item-inputs>

                            <image-inputs></image-inputs>

                            <section-inputs></section-inputs>

                            <headline-inputs></headline-inputs>

                            <cta-inputs></cta-inputs>
                        </div>
                    </dd>
                </dl>
            </div>

            <div class="small-1 text-center columns removeModule">
                <span class="icon-close icon-lg" aria-hidden="true"></span>
            </div>
        </div>
    </li>
</template>

<script>
import { hpCmsMixins } from '../../hpCmsMixin';
import ItemIdInput from '../Inputs/ItemId.vue';
import ImageInput from '../Inputs/Image.vue';
import HeadlineInput from '../Inputs/Headline.vue';
import CtaInput from '../Inputs/Cta.vue';
import SectionInput from '../Inputs/Section.vue';

export default {
    mixins: [ hpCmsMixins ],
    props: ['componentData'],
    data: function()  {
        return {
            uniqueId: this.generateUniqueId(),
            itemId: null,
            itemUrl: null,
            smallImageUrl: null,
            largeImageUrl: null,
            imageDescription: null,
            section: null,
            sectionUrl: null,
            sectionDescription: null,
            headline: null,
            headlineUrl: null,
            headlineDescription: null,
            cta: null,
            ctaUrl: null,
            ctaDescription: null,
            selectedScreenSize: 'small'
        }
    },
    components: {
        'item-inputs': ItemIdInput,
        'image-inputs': ImageInput,
        'headline-inputs': HeadlineInput,
        'cta-inputs': CtaInput,
        'section-inputs': SectionInput
    },
    created: function() {
        if (this.componentData != null) {
            this.itemId = this.componentData['item'];
            this.itemUrl = this.componentData['image']['link'];
            this.smallImageUrl = this.componentData['image']['customImage']['small'];
            this.largeImageUrl = this.componentData['image']['customImage']['large'];
            this.imageDescription = this.componentData['image']['description'];
            this.section = this.componentData['section']['text'];
            this.sectionUrl = this.componentData['section']['link'];
            this.sectionDescription = this.componentData['section']['description'];
            this.headline = this.componentData['headline']['text'];
            this.headlineUrl = this.componentData['headline']['link'];
            this.headlineDescription = this.componentData['headline']['description'];
            this.cta = this.componentData['cta']['text'];
            this.ctaUrl = this.componentData['cta']['link'];
            this.ctaDescription = this.componentData['cta']['description'];
            this.selectedScreenSize = this.componentData['displayModuleOn'];
        }
    }
}
</script>

<style lang="scss">
</style>
