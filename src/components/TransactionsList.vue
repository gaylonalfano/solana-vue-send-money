<template>
  <div class="transactions-container">
    <div class="transaction" v-for="t in transactions">
      {{ t }}
    </div>
  </div>
</template>


<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "TransactionsList",
  setup: () => {
    const transactions: string[] = ["trans1", "trans2", "trans3"];
    return { transactions };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
