<template>
    <li :id="uniqueId" data-type="seo-link-module">
        <div class="flexContainer">
            <div class="small-11 columns">
                <dl class="accordion" data-accordion="" role="tablist">
                    <dd class="accordion-navigation">
                        <a :href="'#accordion-'+uniqueId" :id="'accordion-heading-'+uniqueId" role="tab" class="handle">SEO Links Module</a>
                        <div :id="'accordion-'+uniqueId" :aria-labelledby="'accordion-heading-'+uniqueId" role="tabpanel" class="content">
                            <div class="row">
                                <div class="small-12 columns">
                                    <h3>Shop by Recipient</h3>
                                </div>
                            </div>

                            <section-inputs input-type="textarea" module-type="seo1"></section-inputs>

                            <cta-inputs input-type="textarea" module-type="seo1"></cta-inputs>

                            <div class="row">
                                <div class="small-12 columns">
                                    <h3>Top Categories</h3>
                                </div>
                            </div>

                            <item-inputs input-type="textarea" module-type="seo2"></item-inputs>

                            <image-inputs input-type="textarea"></image-inputs>

                            <section-inputs input-type="seo2" module-type="seo2"></section-inputs>

                            <cta-inputs input-type="textarea" module-type="seo2"></cta-inputs>
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
            seo1Section: null,
            seo1SectionUrl: null,
            seo1SectionDescription: null,
            seo1cta: null,
            seo1ctaUrl: null,
            seo1ctaDescription: null,
            seo2Section: null,
            seo2SectionUrl: null,
            seo2SectionDescription: null,
            seo2cta: null,
            seo2ctaUrl: null,
            seo2ctaDescription: 'small'
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
            var seo1_cta_text = [];
            var seo1_cta_link = [];
            var seo1_cta_description = [];
            var seo2_cta_text = [];
            var seo2_cta_link = [];
            var seo2_cta_description = [];
            var seo2_items = [];
            var seo2_items_urls = [];
            var seo2_small_images = [];
            var seo2_large_images = [];
            var seo2_image_descriptions = [];

            this.seo1Section = this.componentData['seo1']['section']['text'];
            this.seo1SectionUrl = this.componentData['seo1']['section']['link'];
            this.seo1SectionDescription = this.componentData['seo1']['section']['description'];

            if (this.componentData['seo2']['sections']) {
                this.componentData['seo1']['sections'].forEach((seo1Section,index) => {
                    seo1_cta_text.push(seo1Section.cta.text);
                    seo1_cta_link.push(seo1Section.cta.link);
                    seo1_cta_description.push(seo1Section.cta.description);
                });

                this.seo1cta = seo1_cta_text.join("\n");
                this.seo1ctaUrl = seo1_cta_link.join("\n");
                this.seo1ctaDescription = seo1_cta_description.join("\n");
            }

            this.seo2Section = this.componentData['seo2']['section']['text'];
            this.seo2SectionUrl = this.componentData['seo2']['section']['link'];
            this.seo2SectionDescription = this.componentData['seo2']['section']['description'];

            if (this.componentData['seo2']['sections']) {
                this.componentData['seo2']['sections'].forEach((seo2Section,index) => {
                    seo2_cta_text.push(seo2Section.cta.text);
                    seo2_cta_link.push(seo2Section.cta.link);
                    seo2_cta_description.push(seo2Section.cta.description);

                    seo2_items.push(seo2Section.item);
                    seo2_items_urls.push(seo2Section.image.link);
                    seo2_small_images.push(seo2Section.image.customImage.small);
                    seo2_large_images.push(seo2Section.image.customImage.large);
                    seo2_image_descriptions.push(seo2Section.image.description);
                });

                this.seo2cta = seo2_cta_text.join("\n");
                this.seo2ctaUrl = seo2_cta_link.join("\n");
                this.seo2ctaDescription = seo2_cta_description.join("\n");

                this.itemId = seo2_items.join("\n");
                this.itemUrl = seo2_items_urls.join("\n");

                this.smallImageUrl = seo2_small_images.join("\n");
                this.largeImageUrl = seo2_large_images.join("\n");
                this.imageDescription = seo2_image_descriptions.join("\n");
            }
        }
    }
}
</script>

<style lang="scss">
</style>
