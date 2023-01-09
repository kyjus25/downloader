import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';
import * as cheerio from 'cheerio';


@Injectable()
export class GoojaraService {
  public base = 'https://www.goojara.to';
  public searchEndpoint = '/xhrr.php';

  constructor(
    private httpService: HttpService
  ){}

  async search(q: string): Promise<any> {
    const formData = new FormData();
    formData.append('q', q);

    const { data } = await firstValueFrom(
      this.httpService.post(`${this.base}${this.searchEndpoint}`, formData, {headers: {
        cookie: 'aGooz=123' // Random cookie which seems to trick it
      }})
    );

    const c = cheerio.load(data);
    const items = c('li').map((index, el) => {
      const a = c(el).children('a');
      const href = a[0].attribs.href;
      return {
        label: a.text().trim(),
        value: href,
        id: href.split('/')[href.split('/').length - 1],
      };
    });

    // Only movies are supported - denoted with "m" at the beginning of ID
    return Array.from(items).filter(i => i.id[0] == 'm');
  }

  async meta(url: string): Promise<any> {
    // Given a url, return additional info
    const { data } = await firstValueFrom(
      this.httpService.get(url, {headers: {
        "Accept-Encoding": "gzip,deflate,compress"
      }})
    );

    const c = cheerio.load(data);
    const poster = c('#poster img')[0].attribs.src.replace('//', 'https://');
    const description = c(c('.fimm p')[0]).text();

    return {
      poster,
      description
    }
  }
}
