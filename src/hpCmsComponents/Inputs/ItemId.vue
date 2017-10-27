<template>
    <div class="row">
        <div class="small-12 columns">
            <div class="row">
                <template v-if="typeof(this.selectedScreenSize) === 'object'">
                    <div class="small-4 columns end" v-for="(id,index) in ids">
                        <label>Screen size to show item #{{id}}</label>
                        <select v-model="selectedScreenSize[index]">
                            <option v-for="screenSize in screenSizeList" :value="screenSize" v-html="screenSize"></option>
                        </select>
                    </div>
                </template>

                <template v-if="typeof(this.selectedScreenSize) != 'object'">
                    <div class="small-4 columns end">
                        <label>Screen size to show module</label>
                        <select v-model="selectedScreenSize">
                            <option v-for="screenSize in screenSizeList" :value="screenSize" v-html="screenSize"></option>
                        </select>
                    </div>
                </template>
            </div>
        </div>

        <div v-bind:class="[inputType === 'textarea' ? 'small-12 medium-6 columns' : (inputType === 'seo2' ? 'small-12 medium-6 columns' : 'small-12 medium-6 columns')]">
            <label>ItemId</label>
            <template v-if="inputType === 'textarea' || inputType === 'seo2'">
                <textarea v-model="itemId" placeholder="12345" type="number" class="ignore-elements" rows="6"></textarea>
            </template>
            <template v-else>
                <input v-model="itemId" placeholder="12345" type="number" class="ignore-elements"></input>
            </template>
        </div>
        <div v-bind:class="[inputType === 'textarea' ? 'small-12 medium-6 columns' : (inputType === 'seo2' ? 'small-12 medium-6 columns' : 'small-12 medium-6 columns')]">
            <label>Item URL</label>
            <template v-if="inputType === 'textarea' || inputType === 'seo2'">
                <textarea v-model="itemUrl" placeholder="/this-just-in" type="text" rows="6"></textarea>
            </template>
            <template v-else>
                <input v-model="itemUrl" placeholder="/this-just-in" type="text"></input>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: ['inputType'],
    data: function()  {
        return {
            itemId: null,
            itemUrl: null,
            ids: [],
            screenSize: [],
            selectedScreenSize: [],
            screenSizeList: ['small', 'medium', 'large', 'xlarge']
        }
    },
    created: function() {
        this.itemId = this.$parent.itemId;
        this.itemUrl = this.$parent.itemUrl;
        this.selectedScreenSize = this.$parent.selectedScreenSize;

        if (typeof(this.selectedScreenSize) === 'object' && this.itemId != null) {
            var itemids = this.itemId.split(/\n/);
            this.selectedScreenSize.forEach((size,index) => {
                this.ids.push(itemids[index]);
            })
        }
    },
    updated: function() {
        this.$parent.selectedScreenSize = this.selectedScreenSize;
        this.$parent.itemId = this.itemId;
        this.$parent.itemUrl = this.itemUrl;

        if (typeof(this.selectedScreenSize) === 'object') {
            var items = this.itemId;
            var lines = 0;

            items = items.split(/\r|\r\n|\n/);
            items = items.filter(Boolean);
            lines = items.length;

            if (items.length > 0) {
                if (items.length === lines) {
                    items.forEach((item,index) => {
                        this.ids[index] = item;
                    })
                    if (items.length > this.selectedScreenSize.length) {
                        this.selectedScreenSize.push('small');
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
</style>
