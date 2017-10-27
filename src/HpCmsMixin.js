export const hpCmsMixins = {
    // props: ['componentIndex'],
    data () {
        return {
            alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            mappingOrder: {},
            hpJson: {}
        }
    },
    methods: {
        generateUniqueId: function() {
            return 'uniqueId-'+Math.random().toString(36).substr(2, 9);
        }
    },
    mounted: function() {
        $(document).foundation({
            accordion: {
                content_class: 'content', // specify the class used for active (or open) accordion panels
                active_class: 'active', // allow multiple accordion panels to be active at the same time
                multi_expand: false, // allow accordion panels to be closed by clicking on their headers
                toggleable: true
            }
        });
        var self = this;
        Sortable.create(sortableContainer, {
          sort: true,
          handle: '.handle',
          onUpdate: function (evt) {
              var liElements = evt.srcElement.querySelectorAll("li");
              var moduleOrderList = [];
              var uniqueIdOrderList = [];

              function reducerFilter(acc, xs) {
                xs.map((item, index) => {
                    if (xs[index] === xs[index+1]) {
                        if (xs[index] === 'collection-grid-module' || xs[index] === 'text-link-module' || xs[index] === 'image-link-double-module' || xs[index] === 'button-link-double-module' || xs[index] === 'seo-link-module') {
                            acc.push(item);
                        } else {
                            acc.push('concat');
                        }
                    } else {
                        acc.push(item);
                    }
                })
                return acc;
              }

              function sortMappingOrder(uniqueIdList) {
                  uniqueIdList.forEach((id,index) => {
                      if (Object.keys(self.mappingOrder[id])[0] != index) {
                          var jsonString = JSON.stringify(self.mappingOrder[id]);
                          var replaceVal = Object.keys(self.mappingOrder[id])[0];
                          jsonString = jsonString.replace(RegExp(replaceVal), index);
                          self.mappingOrder[id] = JSON.parse(jsonString);
                      }
                  });
              }
              liElements.forEach((el, index) => {
                  moduleOrderList.push(el.dataset.type);
                  uniqueIdOrderList.push(el.id);
              })
              sortMappingOrder(uniqueIdOrderList);
          },
          onRemove: function (evt) {
          }
      });
  }
}
