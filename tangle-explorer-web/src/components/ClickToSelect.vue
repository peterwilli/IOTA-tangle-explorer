<template lang="html">
  <span ref="selectable" @click='selectText()'>{{ text }}</span>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    selectText() {
      var range, selection;
      if (window.getSelection && document.createRange) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(this.$refs.selectable);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (document.selection && document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(this.$refs.selectable);
        range.select();
      }
    }
  }
}
</script>
