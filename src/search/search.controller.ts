import { Controller, Get, Query, Req } from '@nestjs/common';
import { GoojaraService } from '../lib/goojara.to.service';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/search')
export class SearchController {

  constructor(
    private goojaraService: GoojaraService
  ) {}

  @Get()
  async all(@Query('q') q: string): Promise<string> {
    return await this.goojaraService.search(q);
  }

  @Get('meta')
  async meta(@Query('url') url: string): Promise<string> {
    return await this.goojaraService.meta(url);
  }

  @Get('providers')
  providers(): string[] {
    return ['goojara.to'];
  }
}
