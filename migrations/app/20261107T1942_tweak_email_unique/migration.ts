#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4d6b5bd0ae6aa7d5bede6776d711916ff2f2683dfe4d7d38ea7a4798f39bc277/contract';
import endContract from '../../snapshots/4d6b5bd0ae6aa7d5bede6776d711916ff2f2683dfe4d7d38ea7a4798f39bc277/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/5e075882d48f53366b8b35eef440597333910e4797f5d952c681b823e1cf67ed/contract';
import startContract from '../../snapshots/5e075882d48f53366b8b35eef440597333910e4797f5d952c681b823e1cf67ed/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
