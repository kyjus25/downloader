import { Controller, Get } from '@nestjs/common';
import { GoojaraService } from '../lib/goojara.to.service';

@Controller('/download')
export class DownloadController {

  constructor(
    private goojaraService: GoojaraService
  ) {}

  @Get('url')
  async all(): Promise<string> {
    const url = 'https://ww1.goojara.to/mAKLVo';
    this.goojaraService.meta(url);
    return new Promise((resolve) => resolve('https://google.com'));
  }

  @Get('size')
  providers(): string[] {
    return ['goojara.to'];
  }
}
