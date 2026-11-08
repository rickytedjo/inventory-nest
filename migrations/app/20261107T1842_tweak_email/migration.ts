#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5e075882d48f53366b8b35eef440597333910e4797f5d952c681b823e1cf67ed/contract';
import endContract from '../../snapshots/5e075882d48f53366b8b35eef440597333910e4797f5d952c681b823e1cf67ed/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a74cf908b7fd2dc333ad1d3e3c7e9bd87f914f946a38ddc67c1e84a51d687605/contract';
import startContract from '../../snapshots/a74cf908b7fd2dc333ad1d3e3c7e9bd87f914f946a38ddc67c1e84a51d687605/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'user',
        column: 'email',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
