import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchController } from './search/search.controller';
import { GoojaraService } from './lib/goojara.to.service';
import { DownloadController } from './download/download.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    SearchController,
    DownloadController
  ],
  providers: [GoojaraService],
})
export class AppModule {}
