<template>
    <li :id="uniqueId" data-type="button-link-double-module">
        <div class="flexContainer">
            <div class="small-11 columns">
                <dl class="accordion" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a :href="'#accordion-'+uniqueId" :id="'accordion-heading-'+uniqueId" role="tab" class="handle">Button Link Double Module</a>
                        <div :id="'accordion-'+uniqueId" :aria-labelledby="'accordion-heading-'+uniqueId" role="tabpanel" class="content">
                            <item-inputs input-type="textarea"></item-inputs>

                            <image-inputs input-type="textarea"></image-inputs>

                            <section-inputs></section-inputs>

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
            cta: null,
            ctaUrl: null,
            ctaDescription: null,
            selectedScreenSize: 'small'
        }
    },
    components: {
        'item-inputs': ItemIdInput,
        'image-inputs': ImageInput,
        'cta-inputs': CtaInput,
        'section-inputs': SectionInput
    },
    created: function() {
        if (this.componentData != null) {
            var itemIds = [];
            var itemUrls = [];
            var small_images = [];
            var large_images = [];
            var image_descriptions = [];
            var cta = [];
            var ctaUrls = [];
            var ctaDescription = [];
            var displayModuleOn = [];

            if (this.componentData['sections']) {
                this.componentData['sections'].forEach((section,index) => {
                    itemIds.push(section.item);
                    itemUrls.push(section.image.link);
                    small_images.push(section.image.customImage.small);
                    large_images.push(section.image.customImage.large);
                    image_descriptions.push(section.image.description);
                    cta.push(section.cta.text);
                    ctaUrls.push(section.cta.link);
                    ctaDescription.push(section.cta.description);
                    displayModuleOn.push(section.displayModuleOn);
                })
                this.itemId = itemIds.join("\n");
                this.itemUrl = itemUrls.join("\n");
                this.smallImageUrl = small_images.join("\n");
                this.largeImageUrl = large_images.join("\n");
                this.imageDescription = image_descriptions.join("\n");
                this.cta = cta.join("\n");
                this.ctaUrl = ctaUrls.join("\n");
                this.ctaDescription = ctaDescription.join("\n");
                this.section = this.componentData.section.text;
                this.sectionUrl = this.componentData.section.link;
                this.sectionDescription = this.componentData.section.description;
                this.selectedScreenSize = displayModuleOn;
            }
        }
    }
}
</script>

<style lang="scss">
</style>
