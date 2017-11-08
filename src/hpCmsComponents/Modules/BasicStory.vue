<template>
    <li :id="uniqueId" data-type="basic-story-module">
        <div class="flexContainer">
            <div class="small-11 columns">
                <dl class="accordion" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a :href="'#accordion-'+uniqueId" :id="'accordion-heading-'+uniqueId" role="tab" class="handle">Basic Story Module</a>
                        <div :id="'accordion-'+uniqueId" :aria-labelledby="'accordion-heading-'+uniqueId" role="tabpanel" class="content">
                            <item-inputs></item-inputs>

                            <image-inputs></image-inputs>

                            <section-inputs></section-inputs>

                            <headline-inputs></headline-inputs>

                            <copy-inputs></copy-inputs>

                            <cta-inputs></cta-inputs>
                        </div>
                    </dd>
                </dl>
            </div>

            <div class="small-1 text-center columns removeModule">
                <span class="icon-close icon-lg removeEl" aria-hidden="true"></span>
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
import CopyInput from '../Inputs/Copy.vue';

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
            copy: null,
            copyUrl: null,
            copyDescription: null,
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
        'section-inputs': SectionInput,
        'copy-inputs': CopyInput
    },
    created: function() {
        if (this.componentData != null) {
            this.itemId = this.componentData['item'];
            this.itemUrl = this.cleanUrl(this.componentData['image']['link']);
            this.smallImageUrl = this.cleanImagePath(this.componentData['image']['customImage']['small']);
            this.largeImageUrl = this.cleanImagePath(this.componentData['image']['customImage']['large']);
            this.imageDescription = this.cleanSpecialChars(this.componentData['image']['description']);
            this.section = this.cleanSpecialChars(this.componentData['section']['text']);
            this.sectionUrl = this.cleanUrl(this.componentData['section']['link']);
            this.sectionDescription = this.cleanSpecialChars(this.componentData['section']['description']);
            this.headline = this.cleanSpecialChars(this.componentData['headline']['text']);
            this.headlineUrl = this.cleanUrl(this.componentData['headline']['link']);
            this.headlineDescription = this.cleanSpecialChars(this.componentData['headline']['description']);
            this.copy = this.cleanSpecialChars(this.componentData['copy']['text']);
            this.copyUrl = this.cleanUrl(this.componentData['copy']['link']);
            this.copyDescription = this.cleanSpecialChars(this.componentData['copy']['description']);
            this.cta = this.cleanSpecialChars(this.componentData['cta']['text']);
            this.ctaUrl = this.cleanUrl(this.componentData['cta']['link']);
            this.ctaDescription = this.cleanSpecialChars(this.componentData['cta']['description']);
            this.selectedScreenSize = this.componentData['displayModuleOn'];
        }
    }
}
</script>

<style lang="scss">
</style>
