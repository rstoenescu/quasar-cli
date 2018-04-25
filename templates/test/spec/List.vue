<template>
  <div>
    <button @click="increment()"></button>
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        counter: 0
      }
    },
    props: [
      'items'
    ],
    methods: {
      increment () {
        this.counter++
      }
    }
  }
</script>
