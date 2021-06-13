<template>
  <h1>Wallet: {{ walletRef }}</h1>
  <SenderForm />
  <TransactionsList :transactions="transactionsRef" />
</template>

<script lang="ts">
import { Connection } from "@solana/web3.js";
import { defineComponent, watchEffect, ref } from "vue";
import SenderForm from "./components/SenderForm.vue";
import TransactionsList from "./components/TransactionsList.vue";
import { initWallet, WalletAdapter } from "./composables/useWallet";
import {
  getTransactions,
  TransactionWithSignature,
} from "./composables/getTransactions";

export default defineComponent({
  name: "App",
  components: {
    SenderForm,
    TransactionsList,
  },
  setup: () => {
    const transactionsRef = ref<TransactionWithSignature[]>();
    const connectionRef = ref<Connection>();
    const walletRef = ref<WalletAdapter>();

    watchEffect(() => {
      initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
        connectionRef.value = connection;
        walletRef.value = wallet;

        // Make sure wallet has publicKey
        if (walletRef.value.publicKey) {
          // Let's fetch recent confirmed transactions for this wallet
          getTransactions(connectionRef.value, walletRef.value.publicKey).then(
            (transactions: TransactionWithSignature[]) => {
              transactionsRef.value = transactions;
            }
          );
        }
      });
    });

    return { transactionsRef, walletRef };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
