import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query } from '@nestjs/common';
import { delay, firstValueFrom } from 'rxjs';
import { GoojaraService } from '../lib/goojara.to.service';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

@Controller('/download')
export class DownloadController {

  constructor(
    private goojaraService: GoojaraService,
    private httpService: HttpService
  ) {}

  @Get('url')
  async url(@Query('url') url: string): Promise<string> {

    const browser = await puppeteer.launch({headless: false, slowMo: 250});
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    // page.on('request', request => {
    //   if (request.isNavigationRequest() && request.redirectChain().length !== 0) {
    //     console.log('block', request);
    //     request.abort();
    //   } else {
    //     request.continue();
    //   }
    // });


    await page.goto(url);
    
    await page.waitForSelector('iframe');
    const frames = await page.frames();
    const frame = frames.sort((a,b) => a.url().length < b.url().length ? 1 : -1)[0];
    
    // Not working
    await frame.click('.play-button')

    // const video = await frame.$('video');
    // const src = await video.getProperty('src');
    // const srcVal = await src.jsonValue();
    // console.log(srcVal);

    // const links = await page.evaluate(resultsSelector => {
    //   console.log(resultsSelector);
    // }, 'iframe');
    
    // const frame = frames.sort((a, b) => a.url().split('').length > b.url().split('').length ? -1 : 1)[0];

    // const src = frame.getProperty('src');
    // console.log(frames);

    // await browser.close();

    // await page.click(allResultsSelector);

   // this.goojaraService.meta(url);
    return new Promise((resolve) => resolve('https://google.com'));
  }

  @Get('size')
  size(): string[] {
    return ['goojara.to'];
  }
}
