import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class SqlService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async run(queryObj: any = null, data: any = null) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let result: any;
    const rows = await queryRunner.query(queryObj.query, data);

    await queryRunner.release();

    if (queryObj.type == 'SELECT_ONE') {
      result = !_.isEmpty(rows) ? rows[0] : null;
    } else {
      result = rows;
    }

    return result;
  }
}
