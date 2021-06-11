import { Connection, PublicKey, ConfirmedTransaction } from "@solana/web3.js";

// Create a custom type using interace (my attempt)
// 1. We want to display the transaction number and we want
// to retrieve data from the confirmed transaction itself
export interface TransactionWithSignature {
  signature: string;
  confirmedTransaction: ConfirmedTransaction;
}

// Create a custom type using a class (like the tutorial)
// export class TransactionWithSignatureClass {
//   constructor(
//     public signature: string,
//     public confirmedTransaction: ConfirmedTransaction
//   ) {}
// }

// 2. Create function once
export async function getTransactions(
  connection: Connection,
  address: PublicKey
): Promise<Array<TransactionWithSignature>> {
  // Get list of confirmed signatures for the address argument
  // NOTE Original method is deprecated so need to use ...Address2()
  const confirmedSignatures = await connection.getConfirmedSignaturesForAddress2(
    address
  );
  // Initialize an array of transactions with type TransactionWithSignature
  const transactionsWithSignatures: TransactionWithSignature[] = [];
  // Loop through confirmed signatures
  for (let i = 0; i < confirmedSignatures.length; i++) {
    // Grab the confirmed signature
    const signature = confirmedSignatures[i].signature;
    // Grab confirmed transaction connection.getConfirmedTransaction
    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );
    // Check that we have a confirmed transaction
    if (confirmedTransaction) {
      // Update/push this transaction to our array of TransactionWithSignature
      const transactionWithSignature = {
        signature,
        confirmedTransaction,
      };
      transactionsWithSignatures.push(transactionWithSignature);
    }
  }

  // Return our completed array
  return transactionsWithSignatures;
}
