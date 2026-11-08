#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3154400a93229bf134f109087ce6c22a73df93635593e1d8a67155d9f710acc1/contract';
import startContract from '../../snapshots/3154400a93229bf134f109087ce6c22a73df93635593e1d8a67155d9f710acc1/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a74cf908b7fd2dc333ad1d3e3c7e9bd87f914f946a38ddc67c1e84a51d687605/contract';
import endContract from '../../snapshots/a74cf908b7fd2dc333ad1d3e3c7e9bd87f914f946a38ddc67c1e84a51d687605/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'item',
        column: col('price', 'int4', { default: lit(0), codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.setDefault({
        schema: 'public',
        table: 'item',
        column: col('stock', 'int4', { default: lit(0), codecRef: { codecId: 'pg/int4@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
