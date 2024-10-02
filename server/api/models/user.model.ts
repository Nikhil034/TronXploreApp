import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  address: string;
  is_signed_message: boolean;
  balance_shasta: number;
  send_trx_address_shasta: string;
  send_trx_amount_shasta: number;
  send_trx_txhash_shasta: string;
  stake_trx_amount: number;
  stake_trx_txhash: string;
  trc20mint_contract_address: string;
  trc20mint_tokensymbol: string;
  trc20mint_txhash: string;
  trc20_send_txhash_nile: string;
  trc20_send_blockno_nile: number;
  trc20_send_bandwidth_nile: number;
  user_score: number;
  completed_at: Date;
  NFT_hash: string;
  tasks_status: {
    is_create_wallet_task1: boolean;
    is_connect_wallet_task2: boolean;
    is_sign_tx_task3: boolean;
    is_get_trx_task4: boolean;
    is_send_trx_task5: boolean;
    is_check_bandwidth_task6: boolean;
    is_get_energy_task7: boolean;
    is_trc20_mint_task8: boolean;
    is_trc20_send_task9: boolean;
    is_view_transaction_task10: boolean;
  };
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  address: { type: String, default: null },
  is_signed_message: { type: Boolean, default: false },
  balance_shasta: { type: Number, default: null },
  send_trx_address_shasta: { type: String, default: null },
  send_trx_amount_shasta: { type: Number, default: null },
  send_trx_txhash_shasta: { type: String, default: null },
  stake_trx_amount: { type: Number, default: null },
  stake_trx_txhash: { type: String, default: null },
  trc20mint_contract_address: { type: String, default: null },
  trc20mint_tokensymbol: { type: String, default: null },
  trc20mint_txhash: { type: String, default: null },
  trc20_send_txhash_nile: { type: String, default: null },
  trc20_send_blockno_nile: { type: Number, default: null },
  trc20_send_bandwidth_nile: { type: Number, default: null },
  user_score: { type: Number, default: 0 },
  completed_at: { type: Date, default: null },
  NFT_hash: { type: String, default: null },
  tasks_status: {
    is_create_wallet_task1: { type: Boolean, default: false },
    is_connect_wallet_task2: { type: Boolean, default: false },
    is_sign_tx_task3: { type: Boolean, default: false },
    is_get_trx_task4: { type: Boolean, default: false },
    is_send_trx_task5: { type: Boolean, default: false },
    is_check_bandwidth_task6: { type: Boolean, default: false },
    is_get_energy_task7: { type: Boolean, default: false },
    is_trc20_mint_task8: { type: Boolean, default: false },
    is_trc20_send_task9: { type: Boolean, default: false },
    is_view_transaction_task10: { type: Boolean, default: false }
  }
});

export default mongoose.model<IUser>('User', UserSchema);