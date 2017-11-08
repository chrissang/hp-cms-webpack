export const hpCmsMixins = {
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
        },
        cleanImagePath(image) {
            if (image === null) {
                return '';
            } else {
                image = image.replace(/https:\/\/www.uncommongoods.com/g, "").replace(/\s+/g,"").replace(/é/g, "e").replace('/images/hp/B/', "").trim();
                if (image != '') {
                    return image;
                } else {
                    return '';
                }
            }
        },
        cleanUrl(url) {
            if (url === null) {
                return '';
            } else {
                return url.replace(/https:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,"")
            }
        },
        cleanSpecialChars(st) {
            if (st === null) {
                return '';
            } else {
                return st.replace(/é/g, "&#233;").replace(/-/g, "&#8211;").replace(/—/g, "&#8212;").replace(/'/g, "&#8217;");
            }
        },
        cleanTextarea(st) {
            if (st === null) {
                return '';
            } else {
                return st.replace(/\n/g, ',').split(',');
            }
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
          filter: ".removeEl",
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
          onFilter: function (evt) {
              var item = evt.item;
              var removeClick = evt.target;
              if (Sortable.utils.is(removeClick, ".removeEl")) {  // Click on remove button
                  var reordered = {};
                  item.parentNode.removeChild(item); // remove sortable item
                  delete self.mappingOrder[item.id];

                  self.$children.forEach((vueComponent,index) => {
                      if (vueComponent.uniqueId === item.id) {
                            self.$children.splice(index,1);
                      }
                  })

                  Object.keys(self.mappingOrder).forEach(function(key,index) {
                      reordered[key] = {};
                      reordered[key][index] = {}
                    Object.keys(self.mappingOrder[key]).forEach(function(module) {
                        reordered[key][index] = self.mappingOrder[key][module];
                    })
                  })
                  self.mappingOrder = reordered;
              }
          }
      });
  }
}
