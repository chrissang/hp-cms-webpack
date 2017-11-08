<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="seoLinks text-link-module background-color-off-white" data-module-type="TL_SEO">
        <template v-if="viewportSize === 'small'">
            <div class="row">
                <div class="small-12 small-centered columns container">
                    <div v-if="seo1.section.text" class="row">
                        <div class="small-12 text-center columns">
                            <h2>
                                <a class="a-secondary" v-html="seo1.section.text" v-bind:href="seo1.section.link" v-bind:data-description="seo1.section.description" v-bind:data-sectionDescription="seo1.section.description" data-type="Section"></a>
                            </h2>
                        </div>
                    </div>
                    <div class="row">
                        <template v-for="(item, index) in seo1Sections">
                            <div class="small-6 columns">
                                <div class="text-link-container">
                                    <div class="content">
                                        <h4><a class="a-secondary" v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item. cta.description" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="seo1.section.description" data-type="CTA"></a></h4>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <div class="seoLinks2 image-link-double-module background-color-off-white">
                <div class="row container">
                    <div class="small-12 small-centered columns">
                        <div v-if="seo2.section.text" class="row">
                            <div class="small-12 xlarge-10 text-center xlarge-centered columns">
                                <h2>
                                    <a class="a-secondary" v-html="seo2.section.text" v-bind:href="seo2.section.link" v-bind:data-description="seo2.section.description" v-bind:data-sectionDescription="seo2.section.description" data-type="Section"></a>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div class="small-11 small-centered columns">
                        <div class="row">
                            <template v-for="(item, index) in seo2Sections">
                                <div v-bind:class="classNameBlockGrid(seo2Sections,viewportSize) + ' productContainer text-center content'">
                                    <div class="responsively-lazy preventReflow">
                                        <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="seo2.section.description" data-type="Image">
                                            <img v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,640)" v-bind:alt="item.cta.text"/>
                                        </a>
                                    </div>
                                    <h4><a class="a-secondary" v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="seo2.section.description" data-type="CTA"></a></h4>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="viewportSize != 'small'">
            <div class="row fullwidth seo1LinksContainer">
                <div class="small-12 columns">
                    <div class="row topSpacer">
                        <div class="small-12 columns">
                            <div class="row collapse">
                                <div class="small-6 medium-10 large-8 small-centered columns" style="width: 372px;">
                                    <hr class="dottedSpacer">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="small-12 text-center columns">
                            <div>
                                <div class="topCatContent">
                                    <span v-html="seo1.section.text"></span>
                                    <div class="displayInline">
                                        <template v-for="(item, index) in seo1Sections">
                                            <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-sectionDescription="seo1.section.description" v-bind:data-cta="item.cta.text" data-type="CTA" class="body-small-crumbs"></a>
                                        </template>
                                    </div>
                                </div>

                                <div>
                                    <span v-html="seo2.section.text"></span>
                                    <div class="displayInline">
                                        <template v-for="(item, index) in seo2Sections">
                                            <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="seo2.section.description"  data-type="CTA" class="body-small-crumbs"></a>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row bottomSpacer">
                        <div class="small-12 columns">
                            <div class="row collapse">
                                <div class="small-6 medium-10 large-8 small-centered columns" style="width: 372px;">
                                    <hr class="dottedSpacer">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>

<script>
import { hpMixins } from '../HpMixins';

export default {
    mixins: [ hpMixins ],
    props: ['moduleData', 'viewportSize'],
    data: function() {
        return {
            seo1: this.moduleData.seo1,
            seo1Sections: this.moduleData.seo1.sections,
            seo2: this.moduleData.seo2,
            seo2Sections: this.moduleData.seo2.sections,
            displayGroupViewPortSize: 'small'
        }
    }
}
</script>

<style lang="scss">
</style>
