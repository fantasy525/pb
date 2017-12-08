<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>
  import Dialog from '@/components/dialog'
  export default {
    name: 'app'
  }
</script>

<style>
  html, body {
    min-height: 100%;
    font-family: MicrosoftYaHei, sans-serif, Helvetica, Arial;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  input, button
  video {
    margin: 0;
    padding: 0;
    border: 0;

    vertical-align: baseline;
    outline: none;

  }

  /* HTML5 display-role reset for older browsers */

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .flex {
    display: flex;
    display: -webkit-flex;
  }

  .justify-center {
    justify-content: center;
    -webkit-justify-content: center;
  }

  .align-center {
    align-items: center;
    -webkit-align-items: center;
  }

  .direction-column {
    flex-direction: column;
    -webkit-flex-direction: column;
  }

  .space-between {
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }

  .space-around {
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }

  input, button {
    -webkit-appearance: none;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
  }
  #app {

    /*height:100%;*/
    font-family:Helvetica;
  }
</style>
