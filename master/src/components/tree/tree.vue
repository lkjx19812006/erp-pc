<template>
  <div class="treeview {{class}}">
    <div class="node-data" v-for="(index, node) in model">
      <div class="node" :class="{'active': isSelected(index)}"  @click.prevent="select(index, node[valuename])">
        <span class="icon node-parent-toggled" v-show="areValidNodes(node[children]) && isOpened(index)">
          <svg viewBox="0 0 35 35">
            <g transform="translate(0,-1017.3621)">
            <path class="back"
                  d="m 2.1411424,1026.4693 0,23.4146 27.0189286,0 0,-23.4146 -13.937805,0 0,-2.7898 -9.2657958,0 0,2.7898 z"/>
            <path class="front" d="m 1,1051.3621 7,-19 2,0 1,-2 6,0 -1,2 19,0 -4.472399,18.9369 z"/>
            <path class="light" d="m 29.696699,1047.0363 -0.820749,3.0631 -6,0 0.757614,-3"/>
            </g>
          </svg>
        </span>
        <span class="icon node-parent" v-show="areValidNodes(node[children]) && !isOpened(index)">
          <svg width="14" height="14" viewBox="0 0 35 35">
            <g transform="translate(0,-1017.3621)">
              <path class="fill" d="m 1,1026.1835 0,25.1786 33,0 0,-25.1786 -18.857143,0 0,-3 -10.017857,0 0,3 z"/>
              <path class="light" d="m 32,1046.1625 0,3 -6,0 0,-3 6,0"/>
            </g>
          </svg>
        </span>
        <span class="icon node" v-if="!areValidNodes(node[children])">
          <svg width="8" height="8" viewBox="0 0 35 35">
            <g transform="translate(0,-1017.3622)">
              <circle cx="17.488264" cy="1034.874" r="16.003242"/>
            </g>
          </svg>
        </span>
        <label>{{{node[labelname]}}}</label>
      </div>
      <div v-if="areValidNodes(node[children])" class="children" v-show="isOpened(index)">
        <div class="margin"></div>
        <div class="nodes">
          <treeview :id="id" :value.sync="value" :labelname="labelname" :valuename="valuename" :children="children"
                    :model="node[children]" :parent.once="index" class="inner"></treeview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default{

    data(){
      return {
        msg: 'hello vue'
      }
    },
    props: {
      /**
       * Unique identifier for treeview.
       * @since 1.0.0
       * @var string
       */
      id: {
        Type: String,
        default: 'tv_' + Math.ceil(Math.random() * 100000),
      },
      /**
       * Value of the selected node in the tree.
       * @since 1.0.0
       * @var mixed
       */
      value: [String, Number],
      /**
       * Initial tree composition.
       * @since 1.0.0
       * @since 1.0.2 Renamed to model.
       * @var array
       */
      model: {
        Type: Array,
        default: function () {
          return [];
        },
      },
      /**
       * Additional CSS class to apply to component.
       * @since 1.0.0
       * @var string
       */
      class: {
        Type: String,
        default: '',
      },
      /**
       * Name of the child nodes property.
       * @since 1.0.0
       * @var string
       */
      children: {
        Type: String,
        default: 'nodes',
      },
      /**
       * Name of the property holding the node name.
       * @since 1.0.0
       * @var string
       */
      labelname: {
        Type: String,
        default: 'label',
      },
      /**
       * Name of the property holding the node value.
       * @since 1.0.0
       * @var string
       */
      valuename: {
        Type: String,
        default: 'value',
      },
      /**
       * Parent node model index.
       * @since 1.0.2
       * @var int
       */
      parent: {
        Type: Number,
        default: undefined,
      },
    },
    methods: {
      /**
       * Selects a node from tree view.
       * @since 1.0.0
       * @since 1.0.1 Node is passed to event.
       *
       * @param int   index Tree index selected.
       * @param mixed value Value selected.
       */
      select: function (index, value) {
        // Unselect from current level, children and parents
        this.toggleOpen(index);
        this.$set('value', value);
        // Call to event.
        this.$dispatch('treeview_click', {
          label: this.model[index][this.labelname],
          value: this.model[index][this.valuename],
          children: this.model[index][this.children]
        });
      },
      /**
       * Toggles open / close node.
       * @since 1.0.0
       *
       * @param int index Index to open
       */
      toggleOpen: function (index) {
        // Return if no children
        if (!this.areValidNodes(this.model[index][this.children]))
          return;
        // Init
        if (this.model[index].isOpened == undefined)
          this.$set('model[' + index + '].isOpened', this.hasSelectedChild(index));
        // General
        this.$set('model[' + index + '].isOpened', !this.model[index].isOpened);
      },
      /**
       * Returns flag indicating if nodes are valid or not.
       * @since 1.0.0
       * @since 1.0.2 Renamed
       *
       * @param array nodes Nodes to validate.
       */
      areValidNodes: function (nodes) {
        return nodes != undefined
          && Object.prototype.toString.call(nodes) === '[object Array]'
          && nodes.length > 0;
      },
      /**
       * Returns flag indicating if tree view has a node selected.
       * @since 1.0.2
       *
       * @return bool
       */
      hasSelected: function () {
        // Check children
        for (var i in this.model) {
          if (this.isSelected(i) || this.hasSelectedChild(i))
            return true;
        }
        return false;
      },
      /**
       * Returns flag indicating if node at specified index has a child selcted or not.
       * @since 1.0.2
       *
       * @param int index Index to check
       *
       * @return bool
       */
      hasSelectedChild: function (index) {
        for (var i in this.$children) {
          if (this.$children[i].parent == index
            && this.$children[i].hasSelected()
          )
            return true;
        }
        return false;
      },
      /**
       * Returns flag indicating if node at specified index is selected or not.
       * @since 1.0.2
       *
       * @param int index Index to check
       *
       * @return bool
       */
      isSelected: function (index) {
        return this.value && this.model[index][this.valuename] == this.value;
      },

      /**
       * Returns flag indicating if node is opened or not.
       * @since 1.0.2
       *
       * @param int index Index to check
       *
       * @return bool
       */
      isOpened: function (index) {
        return (this.model[index].isOpened != undefined && this.model[index].isOpened)
          || this.hasSelectedChild(index);
      },
    }
  }
</script>

<style scoped>

  .icon.node-parent svg {
    width: 14px;
    height: 14px; }
  .icon.node-parent svg .fill {
    fill: #000;
    stroke: none; }
  .icon.node-parent svg .light {
    fill: #FFF;
    stroke: none; }

  .icon.node-parent-toggled svg {
    width: 14px;
    height: 14px; }
  .icon.node-parent-toggled svg .back {
    fill: #FFF;
    stroke: #000;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: miter;
    stroke-miterlimit: 4;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    stroke-opacity: 1; }
  .icon.node-parent-toggled svg .front {
    fill: #000;
    stroke: none; }
  .icon.node-parent-toggled svg .light {
    fill: #FFF;
    stroke: none; }

  .icon.node svg {
    width: 8px;
    height: 8px; }
  .icon.node svg circle {
    fill: none;
    stroke: #000;
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: miter;
    stroke-miterlimit: 4;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    stroke-opacity: 1; }

  .treeview {
    border: 1px solid #A9A9A9; }
  .treeview .node:hover {
    background-color: #1E90FF;
    color: #FFF; }
  .treeview .node.active {
    background-color: #1E90FF;
    color: #FFF; }

  .treeview {
    position: relative;
    overflow: auto;
    height: 140px; }
  .treeview.inner {
    border: none;
    height: auto;
    max-height: none; }
  .treeview .node {
    display: inline-block; }
  .treeview .children {
    overflow: hidden; }
  .treeview .children .margin {
    display: inline-block;
    width: 20px; }
  .treeview .children .nodes {
    display: inline-block; }
  .treeview span.icon {
    width: 20px;
    display: inline-block;
    text-align: center; }

</style>
